/* Native React port of the Framer FloatingParticlesBackground component.
   Canvas-based particle system with mouse gravity + glow.
   Original: https://framer.com/m/FloatingParticlesBackground-wpRj.js */

import { useCallback, useEffect, useRef, useState } from 'react'

export default function FloatingParticlesBackground({
  particleCount = 50,
  particleSize = 2,
  particleOpacity = 0.6,
  glowIntensity = 10,
  movementSpeed = 0.5,
  mouseInfluence = 100,
  backgroundColor = '#000000',
  particleColor = '#FFFFFF',
  mouseGravity = 'none',
  gravityStrength = 50,
  glowAnimation = 'ease',
  particleInteraction = false,
  interactionType = 'bounce',
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef([])
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })

  const initializeParticles = useCallback(
    (width, height) =>
      Array.from({ length: particleCount }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * movementSpeed,
        vy: (Math.random() - 0.5) * movementSpeed,
        size: Math.random() * particleSize + 1,
        opacity: particleOpacity,
        baseOpacity: particleOpacity,
        mass: Math.random() * 0.5 + 0.5,
        id: index,
      })),
    [particleCount, particleSize, particleOpacity, movementSpeed],
  )

  const redistributeParticles = useCallback((width, height) => {
    particlesRef.current.forEach((p) => {
      p.x = Math.random() * width
      p.y = Math.random() * height
    })
  }, [])

  const updateParticles = useCallback(
    (canvas) => {
      const rect = canvas.getBoundingClientRect()
      const mouse = mouseRef.current
      const particles = particlesRef.current

      particles.forEach((particle, index) => {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseInfluence && distance > 0) {
          const force = (mouseInfluence - distance) / mouseInfluence
          const nx = dx / distance
          const ny = dy / distance
          const gForce = force * (gravityStrength * 0.001)
          if (mouseGravity === 'attract') {
            particle.vx += nx * gForce
            particle.vy += ny * gForce
          } else if (mouseGravity === 'repel') {
            particle.vx -= nx * gForce
            particle.vy -= ny * gForce
          }
          particle.opacity = Math.min(1, particle.baseOpacity + force * 0.4)

          const targetGlow = 1 + force * 2
          const currentGlow = particle.glowMultiplier || 1
          if (glowAnimation === 'instant') {
            particle.glowMultiplier = targetGlow
          } else if (glowAnimation === 'ease') {
            particle.glowMultiplier = currentGlow + (targetGlow - currentGlow) * 0.15
          } else if (glowAnimation === 'spring') {
            const springForce = (targetGlow - currentGlow) * 0.2
            particle.glowVelocity = (particle.glowVelocity || 0) * 0.85 + springForce
            particle.glowMultiplier = currentGlow + particle.glowVelocity
          }
        } else {
          particle.opacity = Math.max(particle.baseOpacity * 0.3, particle.opacity - 0.02)
          const targetGlow = 1
          const currentGlow = particle.glowMultiplier || 1
          if (glowAnimation === 'instant') {
            particle.glowMultiplier = targetGlow
          } else if (glowAnimation === 'ease') {
            particle.glowMultiplier = Math.max(
              1,
              currentGlow + (targetGlow - currentGlow) * 0.08,
            )
          } else if (glowAnimation === 'spring') {
            const springForce = (targetGlow - currentGlow) * 0.15
            particle.glowVelocity = (particle.glowVelocity || 0) * 0.9 + springForce
            particle.glowMultiplier = Math.max(1, currentGlow + particle.glowVelocity)
          }
        }

        if (particleInteraction) {
          for (let j = index + 1; j < particles.length; j++) {
            const other = particles[j]
            const odx = other.x - particle.x
            const ody = other.y - particle.y
            const odist = Math.sqrt(odx * odx + ody * ody)
            const minDist = particle.size + other.size + 5
            if (odist < minDist && odist > 0) {
              if (interactionType === 'bounce') {
                const nx = odx / odist
                const ny = ody / odist
                const rvx = particle.vx - other.vx
                const rvy = particle.vy - other.vy
                const speed = rvx * nx + rvy * ny
                if (speed < 0) continue
                const impulse = (2 * speed) / (particle.mass + other.mass)
                particle.vx -= impulse * other.mass * nx
                particle.vy -= impulse * other.mass * ny
                other.vx += impulse * particle.mass * nx
                other.vy += impulse * particle.mass * ny
                const overlap = minDist - odist
                const sx = nx * overlap * 0.5
                const sy = ny * overlap * 0.5
                particle.x -= sx
                particle.y -= sy
                other.x += sx
                other.y += sy
              } else if (interactionType === 'merge') {
                const merge = (minDist - odist) / minDist
                particle.glowMultiplier = (particle.glowMultiplier || 1) + merge * 0.5
                other.glowMultiplier = (other.glowMultiplier || 1) + merge * 0.5
                const aForce = merge * 0.01
                particle.vx += odx * aForce
                particle.vy += ody * aForce
                other.vx -= odx * aForce
                other.vy -= ody * aForce
              }
            }
          }
        }

        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx += (Math.random() - 0.5) * 0.001
        particle.vy += (Math.random() - 0.5) * 0.001
        particle.vx *= 0.999
        particle.vy *= 0.999

        if (particle.x < 0) particle.x = rect.width
        if (particle.x > rect.width) particle.x = 0
        if (particle.y < 0) particle.y = rect.height
        if (particle.y > rect.height) particle.y = 0
      })
    },
    [
      mouseInfluence,
      mouseGravity,
      gravityStrength,
      glowAnimation,
      particleInteraction,
      interactionType,
    ],
  )

  const drawParticles = useCallback(
    (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      particlesRef.current.forEach((p) => {
        ctx.save()
        const glowMult = p.glowMultiplier || 1
        ctx.shadowColor = particleColor
        ctx.shadowBlur = glowIntensity * glowMult * 2
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    },
    [particleColor, glowIntensity],
  )

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    updateParticles(canvas)
    drawParticles(ctx)
    animationRef.current = requestAnimationFrame(animate)
  }, [updateParticles, drawParticles])

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const rect = container.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    setCanvasSize({ width: rect.width, height: rect.height })
    if (particlesRef.current.length > 0) {
      redistributeParticles(rect.width, rect.height)
    }
  }, [redistributeParticles])

  /* Re-init particles when count or canvas size changes */
  useEffect(() => {
    particlesRef.current = initializeParticles(canvasSize.width, canvasSize.height)
  }, [particleCount, initializeParticles, canvasSize])

  /* Refresh per-particle props when opacity / speed change */
  useEffect(() => {
    particlesRef.current.forEach((p) => {
      p.baseOpacity = particleOpacity
      p.opacity = particleOpacity
      const cur = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      if (cur > 0) {
        const ratio = movementSpeed / cur
        p.vx *= ratio
        p.vy *= ratio
      }
    })
  }, [particleOpacity, movementSpeed])

  /* Mount: size canvas, attach listeners, observe container size */
  useEffect(() => {
    if (typeof window === 'undefined') return
    resizeCanvas()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', resizeCanvas)

    let ro
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => resizeCanvas())
      ro.observe(containerRef.current)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      ro?.disconnect()
    }
  }, [handleMouseMove, resizeCanvas])

  /* Animation loop, paused when tab is hidden */
  useEffect(() => {
    let visible = true
    const onVis = () => {
      visible = !document.hidden
      if (visible && !animationRef.current) animate()
    }
    document.addEventListener('visibilitychange', onVis)
    animate()
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [animate])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
