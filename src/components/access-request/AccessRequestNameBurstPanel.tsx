"use client"

import { useEffect, useRef } from "react"

import { accessRequestEmployeeNames } from "./access-request-name-pool"

const INITIAL_CHARGE_DELAY_MS = 820
const INITIAL_FUSE_MS = 760
const POINTER_FUSE_MS = 180
const BLAST_WAVE_MS = 620
const BURST_MS = 820
const RETURN_MS = 780
const GRAVITY = 220
const DRAG_PER_FRAME = 0.968

const INITIAL_CHARGE_POINT = { x: 0.58, y: 0.42 } as const

type ParticleState = "rest" | "burst" | "returning"

type TextParticle = {
  accent: number
  burstAt: number
  char: string
  color: string
  fromRotation: number
  fromX: number
  fromY: number
  homeX: number
  homeY: number
  returnAt: number
  returnDuration: number
  rotation: number
  seed: number
  spin: number
  state: ParticleState
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
  charges: Charge[]
  font: string
  fontSize: number
  height: number
  initialChargeAt: number
  lineHeight: number
  particles: TextParticle[]
  shakePower: number
  shakeUntil: number
  sparks: Spark[]
  width: number
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

function elasticOut(value: number) {
  const t = clamp(value)
  if (t === 0 || t === 1) return t

  return 2 ** (-9 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
}

function mix(start: number, end: number, progress: number) {
  return start + (end - start) * progress
}

function hashNumber(value: number) {
  const next = Math.sin(value * 127.1) * 43758.5453

  return next - Math.floor(next)
}

function splitGlyphs(text: string) {
  return Array.from(text)
}

function getParticleColor(row: number, column: number, char: string) {
  if (/[0-9]/.test(char)) return "#9e5700"
  if (char === "/" || char === ":" || char === "-") return "#b9533d"
  if ((row + column) % 7 === 0) return "#0f766e"
  if (row % 4 === 2) return "#625f58"

  return "#17211f"
}

function getName(index: number) {
  return accessRequestEmployeeNames[index % accessRequestEmployeeNames.length] ?? "AdMate"
}

function buildReadableLine(
  context: CanvasRenderingContext2D,
  row: number,
  maxWidth: number,
) {
  let text = ""
  let cursor = (row * 17) % accessRequestEmployeeNames.length

  while (context.measureText(text).width < maxWidth + 120) {
    const names = Array.from({ length: 8 }, (_, index) => getName(cursor + index * 3))
    text += `${text ? "  /  " : ""}${names.join("  ")}`
    cursor = (cursor + 29) % accessRequestEmployeeNames.length
  }

  return text
}

function buildField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  now: number,
): AmbientField {
  const fontSize = clamp(Math.min(width / 31, height / 15.5), 9, 12)
  const lineHeight = Math.max(14, fontSize * 1.48)
  const font = `800 ${fontSize.toFixed(1)}px "Geist Mono", "Noto Sans KR", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
  const padX = clamp(width * 0.055, 14, 22)
  const padY = clamp(height * 0.1, 15, 22)
  const rows = Math.max(5, Math.floor((height - padY * 2) / lineHeight))
  const maxWidth = Math.max(80, width - padX * 2)
  const particles: TextParticle[] = []

  context.font = font

  for (let row = 0; row < rows; row += 1) {
    const text = buildReadableLine(context, row, maxWidth)
    const glyphs = splitGlyphs(text)
    let x = padX + ((row % 3) - 1) * fontSize * 0.35
    const y = padY + row * lineHeight + (row % 2) * 0.7

    for (let column = 0; column < glyphs.length; column += 1) {
      const char = glyphs[column] ?? ""
      const widthMeasure = context.measureText(char).width
      const charWidth = Math.max(widthMeasure, char === " " ? fontSize * 0.45 : fontSize * 0.5)

      if (x > width - padX + 2) break

      if (char !== " ") {
        const codePoint = char.codePointAt(0) ?? 0
        const seed = hashNumber((row + 1) * 61 + (column + 3) * 17 + codePoint)
        const homeY = y + (seed - 0.5) * 0.8

        particles.push({
          accent: seed,
          burstAt: 0,
          char,
          color: getParticleColor(row, column, char),
          fromRotation: 0,
          fromX: x,
          fromY: homeY,
          homeX: x,
          homeY,
          returnAt: 0,
          returnDuration: RETURN_MS,
          rotation: 0,
          seed,
          spin: 0,
          state: "rest",
          vx: 0,
          vy: 0,
          width: charWidth,
          x,
          y: homeY,
        })
      }

      x += charWidth + (char === "/" ? 1.2 : 0)
    }
  }

  return {
    charges: [],
    font,
    fontSize,
    height,
    initialChargeAt: now + INITIAL_CHARGE_DELAY_MS,
    lineHeight,
    particles,
    shakePower: 0,
    shakeUntil: 0,
    sparks: [],
    width,
  }
}

function plantCharge(
  field: AmbientField,
  x: number,
  y: number,
  now: number,
  fuseMs: number,
  blastRadius = Math.min(field.width, field.height) * 0.72,
) {
  if (field.charges.length >= 3) return

  field.charges.push({
    blastRadius,
    detonatedAt: null,
    doneAt: 0,
    fuseMs,
    maxWaveRadius: blastRadius * 1.16,
    plantedAt: now,
    x: clamp(x, 12, field.width - 12),
    y: clamp(y, 12, field.height - 12),
  })
}

function spawnSparks(field: AmbientField, x: number, y: number) {
  const colors = ["#d99a20", "#b9533d", "#0f766e", "#fff7e8"]

  for (let index = 0; index < 34; index += 1) {
    const seed = hashNumber(field.sparks.length * 19 + index * 29 + x + y)
    const angle = seed * Math.PI * 2
    const speed = 64 + hashNumber(index * 43 + y) * 210
    const life = 320 + hashNumber(index * 37 + x) * 420

    field.sparks.push({
      color: colors[index % colors.length] ?? "#d99a20",
      life,
      maxLife: life,
      size: 0.8 + hashNumber(index * 23 + x) * 2.4,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 28,
      x,
      y,
    })
  }
}

function detonate(field: AmbientField, charge: Charge, now: number) {
  let affected = 0
  const radius = charge.blastRadius

  for (const particle of field.particles) {
    const centerX = particle.x + particle.width * 0.5
    const centerY = particle.y + field.lineHeight * 0.42
    const dx = centerX - charge.x
    const dy = centerY - charge.y
    const distance = Math.hypot(dx, dy)

    if (distance > radius) continue

    const normalized = Math.max(distance, 12) / radius
    const pressure = (1 - normalized) ** 1.65
    const angle = Math.atan2(dy, dx) + (particle.seed - 0.5) * 0.78
    const force = (210 + pressure * 640) * (0.72 + particle.seed * 0.58)

    particle.state = "burst"
    particle.burstAt = now
    particle.returnAt = now + BURST_MS + particle.seed * 380
    particle.returnDuration = RETURN_MS + pressure * 240
    particle.vx = Math.cos(angle) * force
    particle.vy = Math.sin(angle) * force - 42 - pressure * 86
    particle.spin = (particle.seed - 0.5) * 15
    affected += 1
  }

  if (affected > 0) {
    spawnSparks(field, charge.x, charge.y)
    field.shakePower = clamp(affected / Math.max(1, field.particles.length), 0.12, 0.46)
    field.shakeUntil = now + 360
  }
}

function applyPointerRepel(
  field: AmbientField,
  pointer: PointerState,
  particle: TextParticle,
  dt: number,
  now: number,
) {
  if (!pointer.active || now - pointer.lastSeen > 180) return

  const radius = Math.min(92, Math.max(58, field.width * 0.22))
  const centerX = particle.x + particle.width * 0.5
  const centerY = particle.y + field.lineHeight * 0.42
  const dx = centerX - pointer.x
  const dy = centerY - pointer.y
  const distance = Math.hypot(dx, dy)

  if (distance > radius) return

  const pressure = (1 - distance / radius) ** 2
  const safeDistance = Math.max(distance, 8)

  if (particle.state === "rest") {
    particle.state = "burst"
    particle.burstAt = now
    particle.spin = (particle.seed - 0.5) * 8
  }

  particle.vx += (dx / safeDistance) * pressure * 1180 * dt
  particle.vy += (dy / safeDistance) * pressure * 1180 * dt
  particle.returnAt = Math.max(particle.returnAt, now + 220)
  particle.returnDuration = RETURN_MS * 0.78
}

function updateParticles(field: AmbientField, pointer: PointerState, dt: number, now: number) {
  const drag = DRAG_PER_FRAME ** (dt * 60)

  for (const particle of field.particles) {
    applyPointerRepel(field, pointer, particle, dt, now)

    if (particle.state === "rest") continue

    if (particle.state === "burst") {
      particle.vx *= drag
      particle.vy = particle.vy * drag + GRAVITY * dt
      particle.x += particle.vx * dt
      particle.y += particle.vy * dt
      particle.rotation += particle.spin * dt

      if (now >= particle.returnAt) {
        particle.state = "returning"
        particle.fromX = particle.x
        particle.fromY = particle.y
        particle.fromRotation = particle.rotation
      }

      continue
    }

    const progress = (now - particle.returnAt) / particle.returnDuration
    const eased = elasticOut(progress)

    particle.x = mix(particle.fromX, particle.homeX, eased)
    particle.y = mix(particle.fromY, particle.homeY, eased)
    particle.rotation = mix(particle.fromRotation, 0, eased)
    particle.vx = 0
    particle.vy = 0

    if (progress >= 1) {
      particle.state = "rest"
      particle.x = particle.homeX
      particle.y = particle.homeY
      particle.rotation = 0
      particle.spin = 0
    }
  }
}

function updateSparks(field: AmbientField, dt: number) {
  let writeIndex = 0

  for (const spark of field.sparks) {
    spark.x += spark.vx * dt
    spark.y += spark.vy * dt
    spark.vx *= DRAG_PER_FRAME ** (dt * 60)
    spark.vy += GRAVITY * 0.55 * dt
    spark.life -= dt * 1000

    if (spark.life > 0) {
      field.sparks[writeIndex] = spark
      writeIndex += 1
    }
  }

  field.sparks.length = writeIndex
}

function updateCharges(field: AmbientField, now: number) {
  let writeIndex = 0

  for (const charge of field.charges) {
    if (charge.detonatedAt === null && now - charge.plantedAt >= charge.fuseMs) {
      charge.detonatedAt = now
      charge.doneAt = now + BLAST_WAVE_MS
      detonate(field, charge, now)
    }

    if (charge.detonatedAt === null || now < charge.doneAt) {
      field.charges[writeIndex] = charge
      writeIndex += 1
    }
  }

  field.charges.length = writeIndex
}

function hasActiveMotion(
  field: AmbientField,
  hasPlayedInitialCharge: boolean,
) {
  return (
    !hasPlayedInitialCharge ||
    field.charges.length > 0 ||
    field.sparks.length > 0 ||
    field.particles.some((particle) => particle.state !== "rest")
  )
}

function maybePlantInitialCharge(
  field: AmbientField,
  now: number,
  hasPlayedInitialCharge: boolean,
) {
  if (hasPlayedInitialCharge || now < field.initialChargeAt) return false

  plantCharge(
    field,
    INITIAL_CHARGE_POINT.x * field.width,
    INITIAL_CHARGE_POINT.y * field.height,
    now,
    INITIAL_FUSE_MS,
  )

  return true
}

function drawBackground(context: CanvasRenderingContext2D, field: AmbientField) {
  context.clearRect(0, 0, field.width, field.height)
  context.fillStyle = "rgba(255, 253, 247, 0.94)"
  context.fillRect(0, 0, field.width, field.height)

  context.lineWidth = 1
  context.strokeStyle = "rgba(23, 33, 31, 0.055)"

  for (let y = 18; y < field.height; y += 18) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(field.width, y)
    context.stroke()
  }

  const glow = context.createRadialGradient(
    field.width * 0.66,
    field.height * 0.34,
    0,
    field.width * 0.66,
    field.height * 0.34,
    Math.max(field.width, field.height) * 0.62,
  )
  glow.addColorStop(0, "rgba(15, 118, 110, 0.11)")
  glow.addColorStop(0.48, "rgba(217, 154, 32, 0.055)")
  glow.addColorStop(1, "rgba(255, 253, 247, 0)")
  context.fillStyle = glow
  context.fillRect(0, 0, field.width, field.height)
}

function drawCharge(context: CanvasRenderingContext2D, charge: Charge, now: number) {
  if (charge.detonatedAt === null) {
    const progress = clamp((now - charge.plantedAt) / charge.fuseMs)
    const pulse = 1 + Math.sin(progress * Math.PI * 8) * 0.12
    const radius = 5.4 * pulse
    const fuseLength = 18 * (1 - progress)
    const fuseAngle = -Math.PI / 4
    const fuseX = charge.x + Math.cos(fuseAngle) * radius
    const fuseY = charge.y + Math.sin(fuseAngle) * radius

    context.save()
    context.globalAlpha = 0.86
    context.beginPath()
    context.arc(charge.x, charge.y, radius, 0, Math.PI * 2)
    context.fillStyle = "#17211f"
    context.fill()
    context.strokeStyle = "#b9533d"
    context.lineWidth = 1.5
    context.stroke()

    context.beginPath()
    context.moveTo(fuseX, fuseY)
    context.lineTo(
      fuseX + Math.cos(fuseAngle) * fuseLength,
      fuseY + Math.sin(fuseAngle) * fuseLength,
    )
    context.strokeStyle = "#d99a20"
    context.lineWidth = 1.3
    context.stroke()

    context.beginPath()
    context.arc(
      fuseX + Math.cos(fuseAngle) * fuseLength,
      fuseY + Math.sin(fuseAngle) * fuseLength,
      2.4 + Math.sin(progress * Math.PI * 14) * 1.1,
      0,
      Math.PI * 2,
    )
    context.fillStyle = "#d99a20"
    context.fill()
    context.restore()

    return
  }

  const progress = clamp((now - charge.detonatedAt) / BLAST_WAVE_MS)
  const waveRadius = easeOutCubic(progress) * charge.maxWaveRadius
  const alpha = (1 - progress) * 0.56

  context.save()
  context.beginPath()
  context.arc(charge.x, charge.y, waveRadius, 0, Math.PI * 2)
  context.strokeStyle = `rgba(185, 83, 61, ${alpha})`
  context.lineWidth = 14 * (1 - progress) + 1
  context.stroke()

  if (progress < 0.18) {
    const flash = context.createRadialGradient(charge.x, charge.y, 0, charge.x, charge.y, 58)
    flash.addColorStop(0, `rgba(255, 247, 232, ${(1 - progress / 0.18) * 0.64})`)
    flash.addColorStop(0.5, `rgba(217, 154, 32, ${(1 - progress / 0.18) * 0.28})`)
    flash.addColorStop(1, "rgba(185, 83, 61, 0)")
    context.fillStyle = flash
    context.fillRect(charge.x - 58, charge.y - 58, 116, 116)
  }

  context.restore()
}

function drawParticles(
  context: CanvasRenderingContext2D,
  field: AmbientField,
  now: number,
  reduceMotion: boolean,
) {
  context.font = field.font
  context.textBaseline = "top"

  for (const particle of field.particles) {
    const isBurst = particle.state === "burst"
    const isReturning = particle.state === "returning"
    const fade = isBurst ? clamp((now - particle.burstAt - BURST_MS * 0.46) / (BURST_MS * 0.76)) : 0
    const alpha = reduceMotion
      ? 0.68
      : isBurst
        ? mix(0.96, 0.48, fade)
        : isReturning
          ? 0.82
          : 0.7 + particle.accent * 0.18
    const color = isBurst ? (particle.accent > 0.62 ? "#d99a20" : "#b9533d") : isReturning ? "#0f766e" : particle.color

    context.save()
    context.translate(particle.x + particle.width * 0.5, particle.y + field.lineHeight * 0.38)
    context.rotate(particle.rotation)
    context.globalAlpha = alpha
    context.fillStyle = color
    context.fillText(particle.char, -particle.width * 0.5, -field.lineHeight * 0.38)
    context.restore()
  }
}

function drawSparks(context: CanvasRenderingContext2D, field: AmbientField) {
  for (const spark of field.sparks) {
    const alpha = clamp(spark.life / spark.maxLife)

    context.save()
    context.globalAlpha = alpha
    context.beginPath()
    context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
    context.fillStyle = spark.color
    context.fill()
    context.restore()
  }
}

function drawScene(
  context: CanvasRenderingContext2D,
  field: AmbientField,
  now: number,
  reduceMotion: boolean,
) {
  context.save()

  if (!reduceMotion && now < field.shakeUntil) {
    const progress = 1 - (field.shakeUntil - now) / 360
    const decay = 1 - clamp(progress)
    const shake = field.shakePower * decay * 7
    context.translate(
      (hashNumber(now * 0.09) - 0.5) * shake,
      (hashNumber(now * 0.13) - 0.5) * shake,
    )
  }

  drawBackground(context, field)

  for (const charge of field.charges) {
    drawCharge(context, charge, now)
  }

  drawParticles(context, field, now, reduceMotion)
  drawSparks(context, field)
  context.restore()
}

export function AccessRequestNameBurstPanel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointer: PointerState = {
      active: false,
      lastSeen: 0,
      x: 0,
      y: 0,
    }

    let animationId = 0
    let field: AmbientField | null = null
    let hasPlayedInitialCharge = false
    let isRunning = false
    let lastTimestamp = 0
    let reduceMotion = motionQuery.matches

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      field = buildField(context, width, height, performance.now())

      if (field) {
        drawScene(context, field, performance.now(), reduceMotion)
      }
    }

    const render = (timestamp: number) => {
      if (!field) resize()
      if (!field) return

      const dt = lastTimestamp === 0 ? 0.016 : Math.min((timestamp - lastTimestamp) / 1000, 0.05)
      lastTimestamp = timestamp

      if (maybePlantInitialCharge(field, timestamp, hasPlayedInitialCharge)) {
        hasPlayedInitialCharge = true
      }

      updateCharges(field, timestamp)
      updateParticles(field, pointer, dt, timestamp)
      updateSparks(field, dt)
      drawScene(context, field, timestamp, reduceMotion)

      if (hasActiveMotion(field, hasPlayedInitialCharge)) {
        animationId = window.requestAnimationFrame(render)
      } else {
        isRunning = false
      }
    }

    const run = () => {
      if (reduceMotion || isRunning) return

      isRunning = true
      lastTimestamp = 0
      animationId = window.requestAnimationFrame(render)
    }

    const start = () => {
      window.cancelAnimationFrame(animationId)
      isRunning = false
      lastTimestamp = 0

      if (!field) resize()
      if (!field) return

      drawScene(context, field, performance.now(), reduceMotion)

      run()
    }

    const getCanvasPoint = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()

      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (reduceMotion) return

      const point = getCanvasPoint(event)
      pointer.active = true
      pointer.lastSeen = performance.now()
      pointer.x = point.x
      pointer.y = point.y
      run()
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (reduceMotion || !field) return

      const point = getCanvasPoint(event)
      pointer.active = true
      pointer.lastSeen = performance.now()
      pointer.x = point.x
      pointer.y = point.y
      plantCharge(field, point.x, point.y, performance.now(), POINTER_FUSE_MS, Math.min(field.width, field.height) * 0.86)
      run()
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches

      if (field) {
        field.charges.length = 0
        field.sparks.length = 0

        for (const particle of field.particles) {
          particle.state = "rest"
          particle.x = particle.homeX
          particle.y = particle.homeY
          particle.rotation = 0
          particle.vx = 0
          particle.vy = 0
        }
      }

      start()
    }

    resize()
    start()

    const resizeObserver = new ResizeObserver(resize)
    const pointerTarget = canvas.parentElement ?? canvas

    resizeObserver.observe(canvas.parentElement ?? canvas)
    pointerTarget.addEventListener("pointermove", handlePointerMove)
    pointerTarget.addEventListener("pointerdown", handlePointerDown)
    pointerTarget.addEventListener("pointerleave", handlePointerLeave)
    motionQuery.addEventListener("change", handleMotionChange)

    return () => {
      window.cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
      pointerTarget.removeEventListener("pointermove", handlePointerMove)
      pointerTarget.removeEventListener("pointerdown", handlePointerDown)
      pointerTarget.removeEventListener("pointerleave", handlePointerLeave)
      motionQuery.removeEventListener("change", handleMotionChange)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="relative mt-4 min-h-[360px] overflow-hidden rounded-[8px] border border-[#DDE2E8] bg-[#FFFDF7] shadow-[0_24px_80px_rgba(16,24,32,0.08)] sm:min-h-[430px] lg:min-h-[460px]"
      data-access-name-burst
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-pointer" />
    </div>
  )
}
