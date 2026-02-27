'use client'

import { useRef, useMemo, useEffect, useState, Component, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/lib/useReducedMotion'

const CONNECTION_DISTANCE = 2.5
const MOUSE_INFLUENCE = 3
const MAX_CONNECTIONS = 300

function getParticleCount() {
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4) {
    return 75
  }
  return 150
}

function generateParticleData(count: number) {
  const positions: number[][] = []
  const velocities: number[][] = []
  for (let i = 0; i < count; i++) {
    positions.push([
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4,
    ])
    velocities.push([
      (Math.random() - 0.5) * 0.003,
      (Math.random() - 0.5) * 0.003,
      (Math.random() - 0.5) * 0.002,
    ])
  }
  return { positions, velocities }
}

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mousePos = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  // Store mutable particle data in a ref — not subject to hook purity rules
  const particleData = useRef<ReturnType<typeof generateParticleData> | null>(null)
  if (particleData.current === null) {
    particleData.current = generateParticleData(count)
  }

  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Pre-allocate typed arrays and BufferAttributes for connections (capped, not O(n²))
  const lineBuffers = useRef<{
    positions: Float32Array
    colors: Float32Array
    posAttr: THREE.BufferAttribute
    colAttr: THREE.BufferAttribute
  } | null>(null)
  if (lineBuffers.current === null) {
    const positions = new Float32Array(MAX_CONNECTIONS * 6)
    const colors = new Float32Array(MAX_CONNECTIONS * 6)
    lineBuffers.current = {
      positions,
      colors,
      posAttr: new THREE.BufferAttribute(positions, 3),
      colAttr: new THREE.BufferAttribute(colors, 3),
    }
  }

  useEffect(() => {
    if (!linesRef.current || !lineBuffers.current) return
    const geom = linesRef.current.geometry
    geom.setAttribute('position', lineBuffers.current.posAttr)
    geom.setAttribute('color', lineBuffers.current.colAttr)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (!meshRef.current || !linesRef.current || !particleData.current || !lineBuffers.current) return

    const { positions, velocities } = particleData.current
    const mx = mousePos.current.x * viewport.width * 0.5
    const my = mousePos.current.y * viewport.height * 0.5
    const lp = lineBuffers.current.positions
    const lc = lineBuffers.current.colors

    // Update particle positions
    for (let i = 0; i < count; i++) {
      positions[i][0] += velocities[i][0]
      positions[i][1] += velocities[i][1]
      positions[i][2] += velocities[i][2]

      // Bounce at boundaries
      for (let d = 0; d < 3; d++) {
        const bound = d === 0 ? 5 : d === 1 ? 3 : 2
        if (Math.abs(positions[i][d]) > bound) {
          velocities[i][d] *= -1
        }
      }

      // Mouse attraction
      const dx = mx - positions[i][0]
      const dy = my - positions[i][1]
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_INFLUENCE && dist > 0.1) {
        const force = 0.0003 * (1 - dist / MOUSE_INFLUENCE)
        velocities[i][0] += dx * force
        velocities[i][1] += dy * force
      }

      // Damping
      velocities[i][0] *= 0.999
      velocities[i][1] *= 0.999
      velocities[i][2] *= 0.999

      dummy.position.set(positions[i][0], positions[i][1], positions[i][2])
      const scale = 0.03 + (i % 10) * 0.001 // deterministic variation
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    // Update connections — capped at MAX_CONNECTIONS
    let lineIndex = 0
    for (let i = 0; i < count && lineIndex < MAX_CONNECTIONS; i++) {
      for (let j = i + 1; j < count && lineIndex < MAX_CONNECTIONS; j++) {
        const dx = positions[i][0] - positions[j][0]
        const dy = positions[i][1] - positions[j][1]
        const dz = positions[i][2] - positions[j][2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE
          const idx = lineIndex * 6

          lp[idx + 0] = positions[i][0]
          lp[idx + 1] = positions[i][1]
          lp[idx + 2] = positions[i][2]
          lp[idx + 3] = positions[j][0]
          lp[idx + 4] = positions[j][1]
          lp[idx + 5] = positions[j][2]

          // Blue tint for connections (#2962FF)
          lc[idx + 0] = 0.16 * alpha
          lc[idx + 1] = 0.38 * alpha
          lc[idx + 2] = 1.0 * alpha
          lc[idx + 3] = 0.16 * alpha
          lc[idx + 4] = 0.38 * alpha
          lc[idx + 5] = 1.0 * alpha

          lineIndex++
        }
      }
    }

    // Zero out remaining buffer slots
    for (let i = lineIndex * 6; i < lp.length; i++) {
      lp[i] = 0
      lc[i] = 0
    }

    lineBuffers.current.posAttr.needsUpdate = true
    lineBuffers.current.colAttr.needsUpdate = true
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2)
  })

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#2962FF" transparent opacity={0.6} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.15} />
      </lineSegments>
    </>
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

export function ParticleNetwork() {
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
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Particles count={particleCount} />
      </Canvas>
    </ParticleErrorBoundary>
  )
}
