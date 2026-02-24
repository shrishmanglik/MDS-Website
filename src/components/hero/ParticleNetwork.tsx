'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/lib/useReducedMotion'

const PARTICLE_COUNT = 150
const CONNECTION_DISTANCE = 2.5
const MOUSE_INFLUENCE = 3

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mousePos = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  const particles = useMemo(() => {
    const positions: number[][] = []
    const velocities: number[][] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
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
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), [])
  const lineColors = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return

    const { positions, velocities } = particles
    const mx = mousePos.current.x * viewport.width * 0.5
    const my = mousePos.current.y * viewport.height * 0.5

    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
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
      const scale = 0.03 + Math.random() * 0.01
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    // Update connections
    let lineIndex = 0
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positions[i][0] - positions[j][0]
        const dy = positions[i][1] - positions[j][1]
        const dz = positions[i][2] - positions[j][2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE

          linePositions[lineIndex * 6 + 0] = positions[i][0]
          linePositions[lineIndex * 6 + 1] = positions[i][1]
          linePositions[lineIndex * 6 + 2] = positions[i][2]
          linePositions[lineIndex * 6 + 3] = positions[j][0]
          linePositions[lineIndex * 6 + 4] = positions[j][1]
          linePositions[lineIndex * 6 + 5] = positions[j][2]

          // Blue tint for connections
          lineColors[lineIndex * 6 + 0] = 0.36 * alpha
          lineColors[lineIndex * 6 + 1] = 0.5 * alpha
          lineColors[lineIndex * 6 + 2] = 1.0 * alpha
          lineColors[lineIndex * 6 + 3] = 0.36 * alpha
          lineColors[lineIndex * 6 + 4] = 0.5 * alpha
          lineColors[lineIndex * 6 + 5] = 1.0 * alpha

          lineIndex++
        }
      }
    }

    const lineGeom = linesRef.current.geometry
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIndex * 6), 3))
    lineGeom.setAttribute('color', new THREE.BufferAttribute(lineColors.slice(0, lineIndex * 6), 3))
    lineGeom.attributes.position.needsUpdate = true
    lineGeom.attributes.color.needsUpdate = true
    lineGeom.setDrawRange(0, lineIndex * 2)
  })

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#5B7FFF" transparent opacity={0.6} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.15} />
      </lineSegments>
    </>
  )
}

export function ParticleNetwork() {
  const { prefersReducedMotion } = useReducedMotion()
  const [visible, setVisible] = useState(false)

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
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <Particles />
    </Canvas>
  )
}
