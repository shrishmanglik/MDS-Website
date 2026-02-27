'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { backgroundVertex, backgroundFragment } from '@/shaders/background'

/**
 * Fullscreen noise field shader mesh.
 * Renders behind all content as a living background.
 */
function NoiseField() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const mousePos = useRef(new THREE.Vector2(0, 0))
  const scrollY = useRef(0)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollY: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleScroll = () => {
      scrollY.current = window.scrollY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Throttle to ~30fps for performance
  const lastUpdate = useRef(0)

  useFrame((state) => {
    if (!materialRef.current) return

    const now = state.clock.elapsedTime
    if (now - lastUpdate.current < 1 / 30) return // 30fps cap
    lastUpdate.current = now

    materialRef.current.uniforms.uTime.value = now
    materialRef.current.uniforms.uScrollY.value = scrollY.current
    materialRef.current.uniforms.uMouse.value.lerp(mousePos.current, 0.05)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={backgroundVertex}
        fragmentShader={backgroundFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

/**
 * BackgroundShader — fullscreen WebGL canvas behind all content.
 * Layered simplex noise that responds to scroll and mouse.
 *
 * Performance: capped DPR 1.5, throttled to 30fps, pauses when tab hidden.
 * Mobile: Falls back to CSS gradient (no WebGL).
 */
export function BackgroundShader() {
  const { prefersReducedMotion } = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Only render on desktop
    setIsMobile(window.innerWidth < 768)

    if (prefersReducedMotion || window.innerWidth < 768) return

    // Delay to avoid blocking FCP
    const timer = setTimeout(() => setVisible(true), 500)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  // Mobile fallback: CSS gradient with scroll-linked color shift
  if (isMobile || prefersReducedMotion || !visible) {
    return (
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(41, 98, 255, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(124, 58, 237, 0.02) 0%, transparent 40%)',
        }}
      />
    )
  }

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'low-power',
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <NoiseField />
      </Canvas>
    </div>
  )
}
