'use client'

import { useRef, useMemo, useEffect, useState, Component, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { generateAllMorphTargets } from '@/lib/particleMorphTargets'
import { heroParticleVertex, heroParticleFragment } from '@/shaders/heroParticle'

const MORPH_CYCLE_DURATION = 8 // seconds per shape
const MORPH_TRANSITION_DURATION = 2 // seconds for morph transition

function getParticleCount() {
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4) {
    return 100
  }
  return 180
}

/**
 * MorphingParticles — GPU-based particle system with morph targets.
 * Particles morph between 3 shapes: neural network → data stream → crystal.
 * All interpolation on GPU via custom ShaderMaterial.
 */
function MorphingParticles({
  count,
  scrollProgress,
}: {
  count: number
  scrollProgress: number
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const mousePos = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  // Generate morph targets once
  const morphTargets = useMemo(() => generateAllMorphTargets(count), [count])

  // Pre-compute random seeds per particle
  const randomSeeds = useMemo(() => {
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      seeds[i] = Math.random()
    }
    return seeds
  }, [count])

  // Shape order: neural → stream → crystal → neural (cycling)
  const shapeOrder = useMemo(() => [
    morphTargets.neural,
    morphTargets.stream,
    morphTargets.crystal,
  ], [morphTargets])

  // Create BufferGeometry with morph attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()

    // Start with neural network positions
    geo.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array(morphTargets.neural), 3
    ))

    // Morph target A (current shape)
    geo.setAttribute('positionA', new THREE.BufferAttribute(
      new Float32Array(morphTargets.neural), 3
    ))

    // Morph target B (next shape)
    geo.setAttribute('positionB', new THREE.BufferAttribute(
      new Float32Array(morphTargets.stream), 3
    ))

    // Random seeds
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randomSeeds, 1))

    return geo
  }, [morphTargets, randomSeeds])

  // Shader material
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMorphProgress: { value: 0 },
    uScrollProgress: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1 },
  }), [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Morph cycle state
  const morphState = useRef({
    currentShape: 0,
    cycleTime: 0,
  })

  useFrame((state, delta) => {
    if (!materialRef.current || !pointsRef.current) return

    const ms = morphState.current
    ms.cycleTime += delta

    const totalCycleDuration = MORPH_CYCLE_DURATION + MORPH_TRANSITION_DURATION
    const timeInCycle = ms.cycleTime % totalCycleDuration

    // Calculate morph progress
    let morphProgress: number
    if (timeInCycle < MORPH_CYCLE_DURATION) {
      // Holding current shape
      morphProgress = 0
    } else {
      // Transitioning to next shape
      const transitionTime = timeInCycle - MORPH_CYCLE_DURATION
      morphProgress = transitionTime / MORPH_TRANSITION_DURATION
      // Smooth easing
      morphProgress = morphProgress * morphProgress * (3 - 2 * morphProgress) // smoothstep
    }

    // When transition completes, advance to next shape
    if (ms.cycleTime >= totalCycleDuration) {
      ms.cycleTime -= totalCycleDuration
      ms.currentShape = (ms.currentShape + 1) % shapeOrder.length

      // Update buffer attributes for new morph pair
      const nextShape = (ms.currentShape + 1) % shapeOrder.length
      const posAAttr = geometry.getAttribute('positionA') as THREE.BufferAttribute
      const posBAttr = geometry.getAttribute('positionB') as THREE.BufferAttribute

      posAAttr.array = new Float32Array(shapeOrder[ms.currentShape])
      posBAttr.array = new Float32Array(shapeOrder[nextShape])
      posAAttr.needsUpdate = true
      posBAttr.needsUpdate = true
    }

    // Update uniforms
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    materialRef.current.uniforms.uMorphProgress.value = morphProgress
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress
    materialRef.current.uniforms.uMouse.value.set(
      mousePos.current.x * viewport.width * 0.5,
      mousePos.current.y * viewport.height * 0.5
    )

    // Subtle camera-follow-mouse rotation
    const targetRotY = mousePos.current.x * 0.05
    const targetRotX = mousePos.current.y * 0.03
    pointsRef.current.rotation.y += (targetRotY - pointsRef.current.rotation.y) * 0.02
    pointsRef.current.rotation.x += (targetRotX - pointsRef.current.rotation.x) * 0.02
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={heroParticleVertex}
        fragmentShader={heroParticleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * Connection lines between nearby particles.
 * Uses a simplified static approach instead of O(n²) per-frame.
 */
function ConnectionLines({ count }: { count: number }) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const mousePos = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  const MAX_CONNECTIONS = 200

  const morphTargets = useMemo(() => generateAllMorphTargets(count), [count])

  // Pre-allocate line buffers
  const lineBuffers = useMemo(() => {
    const positions = new Float32Array(MAX_CONNECTIONS * 6)
    const colors = new Float32Array(MAX_CONNECTIONS * 6)
    return { positions, colors }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!linesRef.current) return

    const time = state.clock.elapsedTime
    const positions = morphTargets.neural // Use neural positions as base
    const lp = lineBuffers.positions
    const lc = lineBuffers.colors

    const CONNECTION_DISTANCE = 2.2
    let lineIndex = 0

    // Simple O(n²) but capped at MAX_CONNECTIONS
    for (let i = 0; i < count && lineIndex < MAX_CONNECTIONS; i++) {
      for (let j = i + 1; j < count && lineIndex < MAX_CONNECTIONS; j++) {
        const ix = i * 3, jx = j * 3
        const dx = positions[ix] - positions[jx]
        const dy = positions[ix + 1] - positions[jx + 1]
        const dz = positions[ix + 2] - positions[jx + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < CONNECTION_DISTANCE) {
          const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15
          const idx = lineIndex * 6

          // Add subtle floating motion to match particles
          const noiseI = Math.sin(time * 0.5 + i * 0.1) * 0.15
          const noiseJ = Math.sin(time * 0.5 + j * 0.1) * 0.15

          lp[idx] = positions[ix] + noiseI
          lp[idx + 1] = positions[ix + 1]
          lp[idx + 2] = positions[ix + 2]
          lp[idx + 3] = positions[jx] + noiseJ
          lp[idx + 4] = positions[jx + 1]
          lp[idx + 5] = positions[jx + 2]

          // Blue-purple gradient
          lc[idx] = 0.16 * alpha * 3
          lc[idx + 1] = 0.38 * alpha * 3
          lc[idx + 2] = 1.0 * alpha * 3
          lc[idx + 3] = 0.49 * alpha * 3
          lc[idx + 4] = 0.23 * alpha * 3
          lc[idx + 5] = 0.93 * alpha * 3

          lineIndex++
        }
      }
    }

    // Zero remaining
    for (let i = lineIndex * 6; i < lp.length; i++) {
      lp[i] = 0
      lc[i] = 0
    }

    const geom = linesRef.current.geometry
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute
    const colAttr = geom.getAttribute('color') as THREE.BufferAttribute
    if (posAttr && colAttr) {
      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
      geom.setDrawRange(0, lineIndex * 2)
    }
  })

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[lineBuffers.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[lineBuffers.colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.3} />
    </lineSegments>
  )
}

// Error boundary for WebGL failures
class ParticleErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// Fallback gradient when WebGL fails
function ParticleFallback() {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent"
      aria-hidden="true"
    />
  )
}

export interface ParticleNetworkProps {
  /** Scroll progress from 0 to 1, driven by GSAP ScrollTrigger in the Hero */
  scrollProgress?: number
}

export function ParticleNetwork({ scrollProgress = 0 }: ParticleNetworkProps) {
  const { prefersReducedMotion } = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const particleCount = useMemo(() => getParticleCount(), [])

  useEffect(() => {
    if (prefersReducedMotion) return
    // Delay loading to avoid blocking FCP
    if ('requestIdleCallback' in window) {
      (window as Window).requestIdleCallback(() => setVisible(true))
    } else {
      setTimeout(() => setVisible(true), 100)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion || !visible) return null

  return (
    <ParticleErrorBoundary fallback={<ParticleFallback />}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <MorphingParticles count={particleCount} scrollProgress={scrollProgress} />
        <ConnectionLines count={particleCount} />
      </Canvas>
    </ParticleErrorBoundary>
  )
}
