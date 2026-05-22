"use client"

import { useEffect, useRef } from "react"

import { accessRequestEmployeeNames } from "./access-request-name-pool"

const INITIAL_CHARGE_DELAY_MS = 720
const INITIAL_FUSE_MS = 640
const POINTER_FUSE_MS = 160
const BLAST_WAVE_MS = 620
const BURST_MS = 860
const RETURN_MS = 820
const GRAVITY = 175
const DRAG_PER_FRAME = 0.965

type TokenState = "rest" | "burst" | "returning"

type NameToken = {
  accent: string
  burstAt: number
  fromRotation: number
  fromX: number
  fromY: number
  height: number
  homeX: number
  homeY: number
  label: string
  returnAt: number
  returnDuration: number
  rotation: number
  seed: number
  spin: number
  state: TokenState
  textWidth: number
  vx: number
  vy: number
  width: number
  x: number
  y: number
}

type Charge = {
  blastRadius: number
  detonatedAt: number | null
  doneAt: number
  fuseMs: number
  maxWaveRadius: number
  plantedAt: number
  x: number
  y: number
}

type Spark = {
  color: string
  life: number
  maxLife: number
  size: number
  vx: number
  vy: number
  x: number
  y: number
}

type AmbientField = {
  canvasHeight: number
  canvasWidth: number
  charges: Charge[]
  columnCount: number
  font: string
  fontSize: number
  initialChargeAt: number
  initialPlayed: boolean
  layoutSeed: number
  padX: number
  padY: number
  rowHeight: number
  shakePower: number
  shakeUntil: number
  sparks: Spark[]
  tokens: NameToken[]
}

type PointerState = {
  active: boolean
  lastSeen: number
  x: number
  y: number
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function easeOutCubic(value: number) {
  const next = 1 - clamp(value)
  return 1 - next * next * next
}

function mix(start: number, end: number, progress: number) {
  return start + (end - start) * progress
}

function hashNumber(value: number) {
  const next = Math.sin(value * 127.1) * 43758.5453123

  return next - Math.floor(next)
}

function seededRandom(seed: number) {
  let state = seed >>> 0

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0

    return state / 4294967296
  }
}

function shuffle<T>(items: readonly T[], seed: number) {
  const random = seededRandom(seed)
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const value = next[index] as T

    next[index] = next[swapIndex] as T
    next[swapIndex] = value
  }

  return next
}

function drawRoundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2)

  context.beginPath()
  context.moveTo(x + r, y)
  context.arcTo(x + width, y, x + width, y + height, r)
  context.arcTo(x + width, y + height, x, y + height, r)
  context.arcTo(x, y + height, x, y, r)
  context.arcTo(x, y, x + width, y, r)
  context.closePath()
}

function getTokenAccent(index: number) {
  const colors = ["#0F766E", "#177D4E", "#536171", "#9E5700", "#B9533D"]

  return colors[index % colors.length] ?? "#0F766E"
}

function createLayoutMetrics(width: number, height: number) {
  const fontSize = clamp(Math.min(width / 52, height / 32), 11, 13.5)
  const rowHeight = clamp(fontSize * 2.28, 28, 34)
  const padX = clamp(width * 0.05, 18, 28)
  const padY = clamp(height * 0.08, 22, 34)
  const cellWidth = clamp(width / 8.4, 68, 88)
  const columnCount = Math.max(3, Math.floor((width - padX * 2) / cellWidth))
  const font = `600 ${fontSize.toFixed(1)}px "Geist", "Noto Sans KR", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`

  return {
    columnCount,
    font,
    fontSize,
    padX,
    padY,
    rowHeight,
  }
}

function getCellHome(field: AmbientField, cellIndex: number, token: NameToken, seed: number) {
  const row = Math.floor(cellIndex / field.columnCount)
  const column = cellIndex % field.columnCount
  const cellWidth = (field.canvasWidth - field.padX * 2) / field.columnCount
  const randomA = hashNumber(seed * 11 + cellIndex * 23 + token.seed * 17)
  const randomB = hashNumber(seed * 29 + cellIndex * 7 + token.seed * 31)
  const baseX = field.padX + column * cellWidth + cellWidth / 2
  const baseY = field.padY + row * field.rowHeight + field.rowHeight / 2
  const jitterX = (randomA - 0.5) * Math.min(18, cellWidth * 0.22)
  const jitterY = (randomB - 0.5) * Math.min(8, field.rowHeight * 0.24)

  return {
    x: clamp(baseX + jitterX, field.padX + token.width / 2, field.canvasWidth - field.padX - token.width / 2),
    y: clamp(baseY + jitterY, field.padY + token.height / 2, field.canvasHeight - field.padY - token.height / 2),
  }
}

function assignRandomHomes(field: AmbientField, seed: number) {
  const tokens = shuffle(field.tokens, seed)

  tokens.forEach((token, index) => {
    const home = getCellHome(field, index, token, seed)

    token.homeX = home.x
    token.homeY = home.y
  })
}

function buildField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  now: number,
): AmbientField {
  const metrics = createLayoutMetrics(width, height)
  const rowCount = Math.max(4, Math.floor((height - metrics.padY * 2) / metrics.rowHeight))
  const visibleCount = Math.min(accessRequestEmployeeNames.length, rowCount * metrics.columnCount)
  const selectedNames = shuffle(accessRequestEmployeeNames, 20260523).slice(0, visibleCount)
  const field: AmbientField = {
    canvasHeight: height,
    canvasWidth: width,
    charges: [],
    columnCount: metrics.columnCount,
    font: metrics.font,
    fontSize: metrics.fontSize,
    initialChargeAt: now + INITIAL_CHARGE_DELAY_MS,
    initialPlayed: false,
    layoutSeed: 20260523,
    padX: metrics.padX,
    padY: metrics.padY,
    rowHeight: metrics.rowHeight,
    shakePower: 0,
    shakeUntil: 0,
    sparks: [],
    tokens: [],
  }

  context.font = metrics.font
  context.textBaseline = "middle"
  context.textAlign = "center"

  selectedNames.forEach((name, index) => {
    const textWidth = context.measureText(name).width
    const seed = hashNumber((index + 3) * 41 + name.length * 19)
    const widthMeasure = Math.max(textWidth + 19, metrics.fontSize * 3.8)
    const token: NameToken = {
      accent: getTokenAccent(index),
      burstAt: 0,
      fromRotation: 0,
      fromX: 0,
      fromY: 0,
      height: metrics.fontSize + 12,
      homeX: 0,
      homeY: 0,
      label: name,
      returnAt: 0,
      returnDuration: RETURN_MS,
      rotation: 0,
      seed,
      spin: 0,
      state: "rest",
      textWidth,
      vx: 0,
      vy: 0,
      width: widthMeasure,
      x: 0,
      y: 0,
    }
    const home = getCellHome(field, index, token, field.layoutSeed)

    token.homeX = home.x
    token.homeY = home.y
    token.x = home.x
    token.y = home.y
    field.tokens.push(token)
  })

  return field
}

function plantCharge(
  field: AmbientField,
  x: number,
  y: number,
  now: number,
  fuseMs: number,
  blastRadius = Math.min(field.canvasWidth, field.canvasHeight) * 0.82,
) {
  if (field.charges.length >= 3) return

  field.charges.push({
    blastRadius,
    detonatedAt: null,
    doneAt: 0,
    fuseMs,
    maxWaveRadius: blastRadius * 1.2,
    plantedAt: now,
    x: clamp(x, 18, field.canvasWidth - 18),
    y: clamp(y, 18, field.canvasHeight - 18),
  })
}

function spawnSparks(field: AmbientField, x: number, y: number) {
  const colors = ["#D99A20", "#B9533D", "#0F766E", "#9FE5C1", "#FFF7E8"]

  for (let index = 0; index < 30; index += 1) {
    const seed = hashNumber(field.sparks.length * 19 + index * 29 + x + y)
    const angle = seed * Math.PI * 2
    const speed = 68 + hashNumber(index * 43 + y) * 190
    const life = 300 + hashNumber(index * 37 + x) * 430

    field.sparks.push({
      color: colors[index % colors.length] ?? "#D99A20",
      life,
      maxLife: life,
      size: 1.2 + hashNumber(index * 13 + x) * 2.8,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      x,
      y,
    })
  }
}

function detonate(field: AmbientField, charge: Charge, now: number) {
  charge.detonatedAt = now
  charge.doneAt = now + BLAST_WAVE_MS
  field.layoutSeed += 97
  field.shakePower = Math.min(7, charge.blastRadius / 62)
  field.shakeUntil = now + 260
  assignRandomHomes(field, field.layoutSeed)
  spawnSparks(field, charge.x, charge.y)

  field.tokens.forEach((token) => {
    const dx = token.x - charge.x
    const dy = token.y - charge.y
    const distance = Math.max(1, Math.hypot(dx, dy))
    const pressure = Math.max(0.14, 1 - distance / charge.blastRadius)
    const angle = Math.atan2(dy, dx) + (token.seed - 0.5) * 0.58
    const speed = (185 + pressure * 480) * (0.68 + token.seed * 0.62)

    token.burstAt = now
    token.fromRotation = token.rotation
    token.fromX = token.x
    token.fromY = token.y
    token.returnAt = now + BURST_MS + token.seed * 270
    token.returnDuration = RETURN_MS + pressure * 210
    token.spin = (token.seed - 0.5) * 5.2
    token.state = "burst"
    token.vx = Math.cos(angle) * speed + (token.seed - 0.5) * 72
    token.vy = Math.sin(angle) * speed - pressure * 96
  })
}

function updateCharge(field: AmbientField, charge: Charge, now: number) {
  if (charge.detonatedAt === null && now - charge.plantedAt >= charge.fuseMs) {
    detonate(field, charge, now)
  }
}

function updateSparks(field: AmbientField, deltaSeconds: number) {
  field.sparks.forEach((spark) => {
    spark.x += spark.vx * deltaSeconds
    spark.y += spark.vy * deltaSeconds
    spark.vx *= 0.975
    spark.vy = spark.vy * 0.975 + 42 * deltaSeconds
    spark.life -= deltaSeconds * 1000
  })

  field.sparks = field.sparks.filter((spark) => spark.life > 0)
}

function startTokenReturn(token: NameToken, now: number, duration = RETURN_MS) {
  token.fromX = token.x
  token.fromY = token.y
  token.fromRotation = token.rotation
  token.returnAt = now
  token.returnDuration = duration
  token.state = "returning"
}

function updateTokens(field: AmbientField, deltaSeconds: number, now: number) {
  field.tokens.forEach((token) => {
    if (token.state === "burst") {
      token.x += token.vx * deltaSeconds
      token.y += token.vy * deltaSeconds
      token.vy += GRAVITY * deltaSeconds
      token.vx *= DRAG_PER_FRAME
      token.vy *= DRAG_PER_FRAME
      token.rotation += token.spin * deltaSeconds

      const minX = token.width / 2 + 6
      const maxX = field.canvasWidth - token.width / 2 - 6
      const minY = token.height / 2 + 6
      const maxY = field.canvasHeight - token.height / 2 - 6

      if (token.x < minX || token.x > maxX) {
        token.x = clamp(token.x, minX, maxX)
        token.vx *= -0.42
      }

      if (token.y < minY || token.y > maxY) {
        token.y = clamp(token.y, minY, maxY)
        token.vy *= -0.38
      }

      if (now >= token.returnAt) {
        startTokenReturn(token, now, token.returnDuration)
      }

      return
    }

    if (token.state === "returning") {
      const progress = easeOutCubic((now - token.returnAt) / token.returnDuration)

      token.x = mix(token.fromX, token.homeX, progress)
      token.y = mix(token.fromY, token.homeY, progress)
      token.rotation = mix(token.fromRotation, 0, progress)

      if (progress >= 1) {
        token.x = token.homeX
        token.y = token.homeY
        token.rotation = 0
        token.spin = 0
        token.state = "rest"
      }

      return
    }

    token.x = mix(token.x, token.homeX, 0.07)
    token.y = mix(token.y, token.homeY, 0.07)
    token.rotation = mix(token.rotation, 0, 0.08)
  })
}

function applyPointerRepel(field: AmbientField, pointer: PointerState, now: number) {
  if (!pointer.active || now - pointer.lastSeen > 2200) return

  const radius = Math.min(105, Math.max(72, field.canvasWidth * 0.15))

  field.tokens.forEach((token) => {
    if (token.state !== "rest") return

    const dx = token.x - pointer.x
    const dy = token.y - pointer.y
    const distance = Math.hypot(dx, dy)

    if (distance > radius) return

    const angle = distance < 1 ? token.seed * Math.PI * 2 : Math.atan2(dy, dx)
    const pressure = (1 - distance / radius) ** 2
    const push = pressure * 18

    token.x += Math.cos(angle) * push
    token.y += Math.sin(angle) * push
    token.rotation += (token.seed - 0.5) * pressure * 0.1
  })
}

function drawBackground(context: CanvasRenderingContext2D, field: AmbientField) {
  const { canvasHeight, canvasWidth } = field
  const gradient = context.createRadialGradient(
    canvasWidth * 0.48,
    canvasHeight * 0.36,
    canvasWidth * 0.04,
    canvasWidth * 0.5,
    canvasHeight * 0.46,
    Math.max(canvasWidth, canvasHeight) * 0.8,
  )

  gradient.addColorStop(0, "#FFFDF8")
  gradient.addColorStop(0.48, "#FCFAF5")
  gradient.addColorStop(1, "#F1F5F7")
  context.fillStyle = gradient
  context.fillRect(0, 0, canvasWidth, canvasHeight)

  context.save()
  context.strokeStyle = "rgba(16, 24, 32, 0.045)"
  context.lineWidth = 1

  for (let x = 0; x <= canvasWidth; x += 32) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, canvasHeight)
    context.stroke()
  }

  for (let y = 0; y <= canvasHeight; y += 32) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(canvasWidth, y)
    context.stroke()
  }

  context.strokeStyle = "rgba(15, 118, 110, 0.08)"
  context.lineWidth = 1.4
  context.beginPath()
  context.ellipse(canvasWidth * 0.76, canvasHeight * 0.24, canvasWidth * 0.36, canvasHeight * 0.22, -0.14, 0, Math.PI * 2)
  context.stroke()
  context.restore()
}

function drawCharge(context: CanvasRenderingContext2D, charge: Charge, now: number) {
  if (charge.detonatedAt === null) {
    const progress = clamp((now - charge.plantedAt) / charge.fuseMs)
    const pulse = 1 + Math.sin(progress * Math.PI * 8) * 0.12

    context.save()
    context.translate(charge.x, charge.y)
    context.fillStyle = "rgba(16, 24, 32, 0.72)"
    context.beginPath()
    context.arc(0, 0, 8.5 * pulse, 0, Math.PI * 2)
    context.fill()
    context.strokeStyle = "rgba(185, 83, 61, 0.78)"
    context.lineWidth = 2
    context.beginPath()
    context.arc(0, 0, 15 + progress * 10, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2)
    context.stroke()
    context.restore()

    return
  }

  const waveProgress = clamp((now - charge.detonatedAt) / BLAST_WAVE_MS)
  const radius = charge.maxWaveRadius * easeOutCubic(waveProgress)

  context.save()
  context.strokeStyle = `rgba(185, 83, 61, ${0.44 * (1 - waveProgress)})`
  context.lineWidth = 2.4
  context.beginPath()
  context.arc(charge.x, charge.y, radius, 0, Math.PI * 2)
  context.stroke()
  context.fillStyle = `rgba(217, 154, 32, ${0.12 * (1 - waveProgress)})`
  context.beginPath()
  context.arc(charge.x, charge.y, radius * 0.54, 0, Math.PI * 2)
  context.fill()
  context.restore()
}

function drawSparks(context: CanvasRenderingContext2D, field: AmbientField) {
  field.sparks.forEach((spark) => {
    const opacity = clamp(spark.life / spark.maxLife)

    context.save()
    context.globalAlpha = opacity
    context.fillStyle = spark.color
    context.beginPath()
    context.arc(spark.x, spark.y, spark.size * (0.65 + opacity * 0.65), 0, Math.PI * 2)
    context.fill()
    context.restore()
  })
}

function drawTokens(context: CanvasRenderingContext2D, field: AmbientField) {
  context.save()
  context.font = field.font
  context.textAlign = "center"
  context.textBaseline = "middle"

  field.tokens.forEach((token) => {
    context.save()
    context.translate(token.x, token.y)
    context.rotate(token.rotation)

    const alpha = token.state === "burst" ? 0.92 : 0.98
    const left = -token.width / 2
    const top = -token.height / 2

    context.globalAlpha = alpha
    context.fillStyle = "rgba(255, 255, 255, 0.86)"
    drawRoundRect(context, left, top, token.width, token.height, 999)
    context.fill()
    context.strokeStyle = token.state === "burst" ? "rgba(185, 83, 61, 0.38)" : "rgba(16, 24, 32, 0.13)"
    context.lineWidth = 1
    context.stroke()
    context.fillStyle = token.accent
    context.fillRect(left + 7, top + 6, 2.4, token.height - 12)
    context.fillStyle = "#26323B"
    context.fillText(token.label, 0, 0.8)
    context.restore()
  })

  context.restore()
}

function drawStatic(context: CanvasRenderingContext2D, width: number, height: number) {
  const field = buildField(context, width, height, performance.now())

  drawBackground(context, field)
  drawTokens(context, field)
}

function getLocalPoint(canvas: HTMLCanvasElement, event: PointerEvent) {
  const rect = canvas.getBoundingClientRect()

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

export function AccessRequestNameBurstPanel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const pointer: PointerState = {
      active: false,
      lastSeen: 0,
      x: 0,
      y: 0,
    }
    let field: AmbientField | null = null
    let animationFrame = 0
    let lastTime = performance.now()

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(280, rect.width)
      const height = Math.max(320, rect.height)
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      if (reducedMotion) {
        drawStatic(context, width, height)
        return
      }

      field = buildField(context, width, height, performance.now())
      lastTime = performance.now()
    }

    const render = (now: number) => {
      if (!field) {
        animationFrame = window.requestAnimationFrame(render)
        return
      }

      const deltaSeconds = Math.min((now - lastTime) / 1000, 0.034)
      lastTime = now

      if (!field.initialPlayed && now >= field.initialChargeAt) {
        plantCharge(
          field,
          field.canvasWidth * 0.57,
          field.canvasHeight * 0.38,
          now,
          INITIAL_FUSE_MS,
          Math.min(field.canvasWidth, field.canvasHeight) * 0.96,
        )
        field.initialPlayed = true
      }

      field.charges.forEach((charge) => updateCharge(field as AmbientField, charge, now))
      field.charges = field.charges.filter((charge) => charge.detonatedAt === null || now <= charge.doneAt)

      updateSparks(field, deltaSeconds)
      updateTokens(field, deltaSeconds, now)
      applyPointerRepel(field, pointer, now)

      context.save()
      if (field.shakeUntil > now) {
        const shakeProgress = (field.shakeUntil - now) / 260
        const shakeX = (hashNumber(now * 0.05) - 0.5) * field.shakePower * shakeProgress
        const shakeY = (hashNumber(now * 0.07 + 3) - 0.5) * field.shakePower * shakeProgress

        context.translate(shakeX, shakeY)
      }

      drawBackground(context, field)
      drawSparks(context, field)
      drawTokens(context, field)
      field.charges.forEach((charge) => drawCharge(context, charge, now))
      context.restore()

      animationFrame = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const point = getLocalPoint(canvas, event)

      pointer.active = true
      pointer.lastSeen = performance.now()
      pointer.x = point.x
      pointer.y = point.y
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!field || reducedMotion) return

      const point = getLocalPoint(canvas, event)
      pointer.active = true
      pointer.lastSeen = performance.now()
      pointer.x = point.x
      pointer.y = point.y
      plantCharge(field, point.x, point.y, performance.now(), POINTER_FUSE_MS)
    }

    const resizeObserver = new ResizeObserver(resizeCanvas)

    resizeObserver.observe(canvas)
    resizeCanvas()

    if (!reducedMotion) {
      canvas.addEventListener("pointermove", handlePointerMove)
      canvas.addEventListener("pointerleave", handlePointerLeave)
      canvas.addEventListener("pointerdown", handlePointerDown)
      animationFrame = window.requestAnimationFrame(render)
    }

    return () => {
      resizeObserver.disconnect()
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerleave", handlePointerLeave)
      canvas.removeEventListener("pointerdown", handlePointerDown)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div
      aria-label="직원 이름 움직임 패널"
      className="relative mt-4 min-h-[360px] overflow-hidden rounded-[8px] border border-[#DDE2E8] bg-white shadow-[0_24px_80px_rgba(16,24,32,0.08)] sm:min-h-[430px] lg:min-h-[460px]"
      data-access-name-burst
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-pointer" />
    </div>
  )
}
