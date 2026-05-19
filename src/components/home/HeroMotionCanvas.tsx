"use client"

import { useEffect, useRef } from "react"

type Particle = {
  lane: number
  offset: number
  speed: number
  size: number
  hue: number
}

type OrbitalSignal = {
  label: string
  color: string
  phase: number
  speed: number
  radiusOffset: number
  rotation: number
}

const orbitalSignals: OrbitalSignal[] = [
  { label: "compass", color: "125, 211, 252", phase: -0.35, speed: 0.34, radiusOffset: 0, rotation: -0.18 },
  { label: "lens", color: "153, 246, 228", phase: 1.16, speed: 0.3, radiusOffset: 1, rotation: 0.06 },
  { label: "foresight", color: "246, 195, 91", phase: 2.78, speed: 0.27, radiusOffset: 2, rotation: -0.08 },
  { label: "sentinel", color: "52, 211, 153", phase: 4.34, speed: 0.32, radiusOffset: 3, rotation: 0.14 },
]

const lanes = [
  { y: 0.34, tilt: -0.18, color: "125, 211, 252" },
  { y: 0.43, tilt: 0.1, color: "216, 246, 234" },
  { y: 0.55, tilt: -0.28, color: "52, 211, 153" },
  { y: 0.68, tilt: 0.2, color: "246, 195, 91" },
]

export type HeroMotionLineMode = "all" | "no-dotted" | "no-solid"

function makeParticles(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    lane: index % lanes.length,
    offset: (index * 0.137) % 1,
    speed: 0.045 + ((index * 17) % 23) / 520,
    size: 1 + ((index * 11) % 4),
    hue: index % 4,
  }))
}

type HeroMotionCanvasProps = {
  lineMode?: HeroMotionLineMode
}

export function HeroMotionCanvas({ lineMode = "all" }: HeroMotionCanvasProps) {
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

    const orbitGeometry = (signal: OrbitalSignal) => {
      const mobile = width < 700
      const baseX = mobile ? 98 : width < 1100 ? 176 : 242
      const baseY = mobile ? 42 : width < 1100 ? 76 : 108
      const stepX = mobile ? 16 : width < 1100 ? 21 : 27
      const stepY = mobile ? 7 : width < 1100 ? 9 : 12

      return {
        rx: baseX + signal.radiusOffset * stepX,
        ry: baseY + signal.radiusOffset * stepY,
      }
    }

    const signalPosition = (signal: OrbitalSignal, time: number) => {
      const { rx, ry } = orbitGeometry(signal)
      const angle = time * signal.speed + signal.phase
      const localX = Math.cos(angle) * rx
      const localY = Math.sin(angle) * ry
      const cos = Math.cos(signal.rotation)
      const sin = Math.sin(signal.rotation)

      return {
        angle,
        x: coreCenter.x + localX * cos - localY * sin,
        y: coreCenter.y + localX * sin + localY * cos,
        rx,
        ry,
      }
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

    const drawPlatformOrbits = (time: number, center: { x: number; y: number }) => {
      const { x, y } = center

      orbitalSignals.forEach((signal, index) => {
        const { rx, ry } = orbitGeometry(signal)

        context.save()
        context.translate(x, y)
        context.rotate(signal.rotation)
        context.setLineDash([2, 18])
        context.lineDashOffset = -time * (18 + index * 3)
        context.beginPath()
        context.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
        context.strokeStyle = `rgba(${signal.color}, ${0.1 + index * 0.018})`
        context.lineWidth = 1
        context.stroke()
        context.restore()
      })
    }

    const drawSignalExchange = (
      time: number,
      signal: OrbitalSignal,
      index: number,
      position: ReturnType<typeof signalPosition>,
    ) => {
      const { x, y } = position
      const dx = x - coreCenter.x
      const dy = y - coreCenter.y
      const distance = Math.max(1, Math.hypot(dx, dy))
      const unitX = dx / distance
      const unitY = dy / distance
      const lineStartX = coreCenter.x + unitX * (width < 700 ? 42 : 64)
      const lineStartY = coreCenter.y + unitY * (width < 700 ? 18 : 28)
      const lineEndX = x - unitX * 10
      const lineEndY = y - unitY * 10
      const pulse = 0.42 + Math.sin(time * 1.4 + signal.phase) * 0.16

      context.save()
      context.globalCompositeOperation = "screen"
      const gradient = context.createLinearGradient(lineStartX, lineStartY, lineEndX, lineEndY)
      gradient.addColorStop(0, `rgba(216, 246, 234, ${0.06 * pulse})`)
      gradient.addColorStop(0.55, `rgba(${signal.color}, ${0.22 * pulse})`)
      gradient.addColorStop(1, `rgba(${signal.color}, 0)`)
      context.strokeStyle = gradient
      context.lineWidth = width < 700 ? 1 : 1.25
      context.beginPath()
      context.moveTo(lineStartX, lineStartY)
      context.lineTo(lineEndX, lineEndY)
      context.stroke()

      const transfer = (time * (0.22 + index * 0.018) + index * 0.21) % 1
      const packetX = lineStartX + (lineEndX - lineStartX) * transfer
      const packetY = lineStartY + (lineEndY - lineStartY) * transfer
      context.translate(packetX, packetY)
      context.rotate(Math.atan2(dy, dx))
      const packetGradient = context.createLinearGradient(-18, 0, 16, 0)
      packetGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      packetGradient.addColorStop(0.58, `rgba(${signal.color}, ${0.62 * Math.sin(transfer * Math.PI)})`)
      packetGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      context.strokeStyle = packetGradient
      context.lineWidth = width < 700 ? 1.6 : 2
      context.beginPath()
      context.moveTo(-18, 0)
      context.lineTo(16, 0)
      context.stroke()
      context.restore()
    }

    const drawOrbitalSignal = (time: number, signal: OrbitalSignal, index: number) => {
      const position = signalPosition(signal, time)
      const { x, y, angle, rx, ry } = position
      const shimmer = 0.62 + Math.sin(time * 1.8 + signal.phase) * 0.18

      context.save()
      context.translate(coreCenter.x, coreCenter.y)
      context.rotate(signal.rotation)
      context.beginPath()
      context.ellipse(0, 0, rx, ry, 0, angle - 0.62, angle - 0.06)
      context.strokeStyle = `rgba(${signal.color}, ${0.26 * shimmer})`
      context.lineWidth = width < 700 ? 2 : 2.8
      context.stroke()
      context.restore()

      drawSignalExchange(time, signal, index, position)

      context.save()
      context.globalCompositeOperation = "screen"
      const glowRadius = width < 700 ? 22 : 31
      const glow = context.createRadialGradient(x, y, 0, x, y, glowRadius)
      glow.addColorStop(0, `rgba(${signal.color}, ${0.78 * shimmer})`)
      glow.addColorStop(0.28, `rgba(${signal.color}, ${0.24 * shimmer})`)
      glow.addColorStop(1, `rgba(${signal.color}, 0)`)
      context.fillStyle = glow
      context.beginPath()
      context.arc(x, y, glowRadius, 0, Math.PI * 2)
      context.fill()

      context.strokeStyle = `rgba(${signal.color}, ${0.34 * shimmer})`
      context.lineWidth = 1
      context.beginPath()
      context.arc(x, y, width < 700 ? 7 : 9, 0, Math.PI * 2)
      context.stroke()

      context.fillStyle = `rgba(${signal.color}, ${0.92 * shimmer})`
      context.beginPath()
      context.arc(x, y, width < 700 ? 2.4 : 3.1, 0, Math.PI * 2)
      context.fill()
      context.restore()

      drawSignalLabel(time, signal, index, position)
    }

    const drawSignalLabel = (
      time: number,
      signal: OrbitalSignal,
      index: number,
      position: ReturnType<typeof signalPosition>,
    ) => {
      const showActiveOnly = width < 980
      const activeIndex = Math.floor((time * 0.42) % orbitalSignals.length)

      if (width < 720 || (showActiveOnly && index !== activeIndex)) {
        return
      }

      const { x, y } = position
      const dx = x - coreCenter.x
      const dy = y - coreCenter.y
      const distance = Math.max(1, Math.hypot(dx, dy))
      const unitX = dx / distance
      const unitY = dy / distance
      const gap = showActiveOnly ? 15 : 22
      const labelX = x + unitX * gap
      const labelY = y + unitY * (gap * 0.62)
      const alignRight = unitX < -0.2
      const clampedX = Math.min(width - 46, Math.max(width * 0.42, labelX))
      const alpha = showActiveOnly ? 0.5 : 0.42

      context.save()
      context.globalCompositeOperation = "source-over"
      context.font = `${showActiveOnly ? 10 : 11}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
      context.textAlign = alignRight ? "right" : "left"
      context.textBaseline = "middle"
      context.strokeStyle = `rgba(${signal.color}, 0.12)`
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(x + unitX * 7, y + unitY * 7)
      context.lineTo(clampedX + (alignRight ? 5 : -5), labelY)
      context.stroke()
      context.fillStyle = `rgba(216, 246, 234, ${alpha})`
      context.fillText(signal.label, clampedX, labelY)
      context.restore()
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
      const motionScale = reducedMotion.matches ? 0 : 1
      const time = (now / 1000) * motionScale
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = "lighter"

      if (lineMode !== "no-solid") {
        drawSweep(time)
        drawSignalCurtain(time)
      }
      if (lineMode !== "no-dotted") {
        for (let index = 0; index < lanes.length; index += 1) {
          drawSignalLane(time, index)
        }
      }
      drawCorePulse(time, coreCenter)
      drawRotatingArcs(time, coreCenter)
      drawPlatformOrbits(time, coreCenter)
      orbitalSignals.forEach((signal, index) => {
        drawOrbitalSignal(time, signal, index)
      })
      if (lineMode !== "no-solid") {
        for (let index = 0; index < 5; index += 1) {
          drawComet(time, index)
        }
        for (const particle of particles) {
          drawParticle(particle, time)
        }
      }
      applyCopyQuietZone()

      if (!reducedMotion.matches) {
        frame = window.requestAnimationFrame(render)
      }
    }

    const restart = () => {
      window.cancelAnimationFrame(frame)
      resize()
      frame = window.requestAnimationFrame(render)
    }

    resize()
    window.requestAnimationFrame(() => {
      coreCenter = readCoreCenter()
    })
    window.addEventListener("resize", restart)
    const removeReducedMotionListener = (() => {
      if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener("change", restart)

        return () => reducedMotion.removeEventListener("change", restart)
      }

      reducedMotion.addListener(restart)

      return () => reducedMotion.removeListener(restart)
    })()
    frame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", restart)
      removeReducedMotionListener()
    }
  }, [lineMode])

  return <canvas ref={canvasRef} className="homepage-motion-canvas" data-line-mode={lineMode} aria-hidden="true" />
}
