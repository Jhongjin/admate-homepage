"use client"

import { useEffect, useRef } from "react"

type Particle = {
  lane: number
  offset: number
  speed: number
  size: number
  hue: number
}

const lanes = [
  { y: 0.34, tilt: -0.18, color: "125, 211, 252" },
  { y: 0.43, tilt: 0.1, color: "216, 246, 234" },
  { y: 0.55, tilt: -0.28, color: "52, 211, 153" },
  { y: 0.68, tilt: 0.2, color: "246, 195, 91" },
]

function makeParticles(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    lane: index % lanes.length,
    offset: (index * 0.137) % 1,
    speed: 0.045 + ((index * 17) % 23) / 520,
    size: 1 + ((index * 11) % 4),
    hue: index % 4,
  }))
}

export function HeroMotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d", { alpha: true })

    if (!canvas || !context) {
      return
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    let frame = 0
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let coreCenter = { x: 0, y: 0 }

    const readCoreCenter = () => {
      const core = document.querySelector<HTMLElement>(".homepage-art-core")

      if (!core) {
        return {
          x: width * (width < 700 ? 0.72 : 0.82),
          y: height * (width < 700 ? 0.68 : 0.52),
        }
      }

      const canvasRect = canvas.getBoundingClientRect()
      const coreRect = core.getBoundingClientRect()

      return {
        x: coreRect.left - canvasRect.left + coreRect.width / 2,
        y: coreRect.top - canvasRect.top + coreRect.height / 2,
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const density = reducedMotion.matches ? 0.55 : 1
      particles = makeParticles(Math.floor((width < 700 ? 76 : 168) * density))
      coreCenter = readCoreCenter()
    }

    const drawSignalLane = (time: number, laneIndex: number) => {
      const lane = lanes[laneIndex]
      const startX = width * -0.1
      const endX = width * 1.12
      const baseY = height * lane.y
      const amplitude = height * (0.05 + laneIndex * 0.012)
      const offset = Math.sin(time * 0.65 + laneIndex) * height * 0.025

      context.save()
      context.setLineDash([18, 28])
      context.lineDashOffset = -time * (58 + laneIndex * 12)
      context.lineWidth = laneIndex === 1 ? 2.2 : 1.6
      context.strokeStyle = `rgba(${lane.color}, ${laneIndex === 1 ? 0.46 : 0.34})`
      context.beginPath()
      context.moveTo(startX, baseY + offset)
      context.bezierCurveTo(
        width * 0.28,
        baseY + amplitude + offset,
        width * 0.62,
        baseY - amplitude + lane.tilt * height + offset,
        endX,
        baseY + lane.tilt * height + offset,
      )
      context.stroke()
      context.restore()
    }

    const drawParticle = (particle: Particle, time: number) => {
      const lane = lanes[particle.lane]
      const progress = (particle.offset + time * particle.speed) % 1
      const x = width * (-0.08 + progress * 1.2)
      const wave = Math.sin(progress * Math.PI * 2 + particle.lane * 1.6 + time)
      const y = height * lane.y + wave * height * 0.055 + lane.tilt * height * progress
      const angle = Math.atan2(lane.tilt * height + wave * 30, width)
      const alpha = Math.sin(progress * Math.PI)
      const length = 34 + particle.size * 14

      context.save()
      context.translate(x, y)
      context.rotate(angle)
      const gradient = context.createLinearGradient(-length, 0, length, 0)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      gradient.addColorStop(0.45, `rgba(${lane.color}, ${0.68 * alpha})`)
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      context.strokeStyle = gradient
      context.lineWidth = particle.size + 0.9
      context.beginPath()
      context.moveTo(-length, 0)
      context.lineTo(length, 0)
      context.stroke()
      context.restore()
    }

    const drawCorePulse = (time: number, center: { x: number; y: number }) => {
      const { x, y } = center

      for (let index = 0; index < 4; index += 1) {
        const progress = (time * 0.34 + index * 0.25) % 1
        const radius = 42 + progress * (width < 700 ? 128 : 230)
        const alpha = (1 - progress) * 0.54
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.strokeStyle = `rgba(${index % 2 === 0 ? "216, 246, 234" : "125, 211, 252"}, ${alpha})`
        context.lineWidth = index === 0 ? 2.4 : 1.4
        context.stroke()
      }
    }

    const drawRotatingArcs = (time: number, center: { x: number; y: number }) => {
      const { x, y } = center
      const baseRadius = width < 700 ? 94 : 156

      for (let index = 0; index < 5; index += 1) {
        const radius = baseRadius + index * (width < 700 ? 22 : 34)
        const start = time * (0.46 + index * 0.08) + index * 1.18
        const end = start + 0.72 + index * 0.08
        context.beginPath()
        context.arc(x, y, radius, start, end)
        context.strokeStyle = `rgba(${index % 3 === 0 ? "216, 246, 234" : index % 3 === 1 ? "125, 211, 252" : "52, 211, 153"}, ${0.34 - index * 0.035})`
        context.lineWidth = Math.max(1.3, 4.2 - index * 0.48)
        context.stroke()
      }
    }

    const drawComet = (time: number, index: number) => {
      const progress = (time * (0.13 + index * 0.018) + index * 0.21) % 1
      const startX = width * (0.08 + progress * 1.04)
      const startY = height * (0.2 + index * 0.16)
      const wave = Math.sin(progress * Math.PI * 2 + index) * height * 0.06
      const angle = -0.28 + index * 0.13
      const color = index % 3 === 0 ? "216, 246, 234" : index % 3 === 1 ? "125, 211, 252" : "52, 211, 153"
      const alpha = Math.sin(progress * Math.PI)
      const length = width < 700 ? 104 : 196

      context.save()
      context.translate(startX, startY + wave)
      context.rotate(angle)
      const gradient = context.createLinearGradient(-length, 0, length * 0.24, 0)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      gradient.addColorStop(0.62, `rgba(${color}, ${0.22 * alpha})`)
      gradient.addColorStop(1, `rgba(${color}, ${0.56 * alpha})`)
      context.strokeStyle = gradient
      context.lineWidth = width < 700 ? 2.4 : 3.4
      context.beginPath()
      context.moveTo(-length, 0)
      context.lineTo(length * 0.24, 0)
      context.stroke()
      context.restore()
    }

    const drawSweep = (time: number) => {
      const sweepX = ((time * 0.18) % 1) * width * 1.8 - width * 0.45
      const gradient = context.createLinearGradient(sweepX - 150, 0, sweepX + 260, height)
      gradient.addColorStop(0, "rgba(216, 246, 234, 0)")
      gradient.addColorStop(0.48, "rgba(216, 246, 234, 0.26)")
      gradient.addColorStop(1, "rgba(216, 246, 234, 0)")

      context.save()
      context.globalCompositeOperation = "screen"
      context.fillStyle = gradient
      context.translate(sweepX, height * 0.5)
      context.rotate(-0.22)
      context.fillRect(-150, -height, 300, height * 2)
      context.restore()
    }

    const drawSignalCurtain = (time: number) => {
      const x = ((time * 0.22) % 1) * width * 1.6 - width * 0.25
      const gradient = context.createLinearGradient(x - 18, 0, x + 18, height)
      gradient.addColorStop(0, "rgba(125, 211, 252, 0)")
      gradient.addColorStop(0.5, "rgba(125, 211, 252, 0.3)")
      gradient.addColorStop(1, "rgba(125, 211, 252, 0)")

      context.save()
      context.globalCompositeOperation = "screen"
      context.translate(x, height * 0.5)
      context.rotate(-0.34)
      context.fillStyle = gradient
      context.fillRect(-18, -height * 1.2, 36, height * 2.4)
      context.restore()
    }

    const drawOrbitBeacons = (time: number, center: { x: number; y: number }) => {
      const { x: cx, y: cy } = center
      const radii = width < 700 ? [88, 132, 176] : [128, 198, 278]

      radii.forEach((radius, index) => {
        const speed = 0.62 + index * 0.18
        const angle = time * speed + index * 2.1
        const x = cx + Math.cos(angle) * radius * 1.35
        const y = cy + Math.sin(angle) * radius * 0.48
        const color = index === 0 ? "216, 246, 234" : index === 1 ? "125, 211, 252" : "52, 211, 153"

        context.save()
        context.globalCompositeOperation = "screen"
        const glow = context.createRadialGradient(x, y, 0, x, y, 34)
        glow.addColorStop(0, `rgba(${color}, 0.92)`)
        glow.addColorStop(0.3, `rgba(${color}, 0.34)`)
        glow.addColorStop(1, `rgba(${color}, 0)`)
        context.fillStyle = glow
        context.beginPath()
        context.arc(x, y, 34, 0, Math.PI * 2)
        context.fill()
        context.fillStyle = `rgba(${color}, 0.98)`
        context.beginPath()
        context.arc(x, y, 3.5, 0, Math.PI * 2)
        context.fill()
        context.restore()
      })
    }

    const applyCopyQuietZone = () => {
      const featherEnd = width < 700 ? width * 0.86 : width * 0.58
      const quietEnd = width < 700 ? width * 0.58 : width * 0.42
      const quietStop = Math.min(0.86, quietEnd / featherEnd)

      context.save()
      context.globalCompositeOperation = "destination-out"
      const gradient = context.createLinearGradient(0, 0, featherEnd, 0)
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.94)")
      gradient.addColorStop(quietStop, "rgba(0, 0, 0, 0.84)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      context.fillStyle = gradient
      context.fillRect(0, 0, featherEnd, height)
      context.restore()
    }

    const render = (now: number) => {
      const motionScale = reducedMotion.matches ? 0.42 : 1
      const time = (now / 1000) * motionScale
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = "lighter"

      drawSweep(time)
      drawSignalCurtain(time)
      for (let index = 0; index < lanes.length; index += 1) {
        drawSignalLane(time, index)
      }
      drawCorePulse(time, coreCenter)
      drawRotatingArcs(time, coreCenter)
      drawOrbitBeacons(time, coreCenter)
      for (let index = 0; index < 5; index += 1) {
        drawComet(time, index)
      }
      for (const particle of particles) {
        drawParticle(particle, time)
      }
      applyCopyQuietZone()

      frame = window.requestAnimationFrame(render)
    }

    resize()
    window.requestAnimationFrame(() => {
      coreCenter = readCoreCenter()
    })
    window.addEventListener("resize", resize)
    frame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="homepage-motion-canvas" aria-hidden="true" />
}
