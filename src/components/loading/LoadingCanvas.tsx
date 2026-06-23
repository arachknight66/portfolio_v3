'use client'

// ─────────────────────────────────────────────
// LOADING CANVAS
//
// Full-screen canvas that drives all four phases
// of the loading animation using requestAnimationFrame.
//
// Receives:
//   onComplete — called when Phase 4 finishes
//   onSkippable — called when skip becomes available
// ─────────────────────────────────────────────

import { useEffect, useRef, useCallback } from 'react'
import { LOADING, LOADING_COLORS, BUILDER_CHARS, PARTICLES } from '@/animations/loading'
import {
    windowProgress, lerp, ease,
    drawCircle, strokeCircle, drawRect, drawText,
    setCanvasSize, randomBetween, randomFrom,
} from '@/lib/canvas-utils'

interface Props {
    onComplete: () => void
    onSkippable: () => void
    skipSignal: boolean   // flips to true when user requests skip
}

// ── Particle types ────────────────────────────

interface DesignParticle {
    x: number; y: number
    vx: number; vy: number
    w: number; h: number
    alpha: number
}

interface PhysicsParticle {
    x: number; y: number
    vx: number; vy: number
    radius: number
    alpha: number
}

interface BuilderParticle {
    x: number; y: number
    vx: number; vy: number
    char: string
    alpha: number
}

// ── Shape types for Phase 1 ───────────────────

interface ConvergingShape {
    // Start position (corner)
    sx: number; sy: number
    // Current position
    x: number; y: number
}

export function LoadingCanvas({ onComplete, onSkippable, skipSignal }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const startRef = useRef<number>(0)
    const rafRef = useRef<number>(0)
    const skipRef = useRef(false)
    const doneRef = useRef(false)

    // Particle pools — created once, reused
    const designP = useRef<DesignParticle[]>([])
    const physicsP = useRef<PhysicsParticle[]>([])
    const builderP = useRef<BuilderParticle[]>([])

    const initParticles = useCallback((cx: number, cy: number) => {
        // Design particles — emerge left-ish
        designP.current = Array.from({ length: PARTICLES.DESIGN_COUNT }, () => ({
            x: cx, y: cy,
            vx: randomBetween(-3.5, -0.5),
            vy: randomBetween(-2.5, 2.5),
            w: randomBetween(4, 14),
            h: randomBetween(3, 9),
            alpha: randomBetween(0.4, 0.9),
        }))

        // Physics particles — emerge right-ish
        physicsP.current = Array.from({ length: PARTICLES.PHYSICS_COUNT }, () => ({
            x: cx, y: cy,
            vx: randomBetween(0.5, 4),
            vy: randomBetween(-3, 3),
            radius: randomBetween(1, 3),
            alpha: randomBetween(0.3, 1.0),
        }))

        // Builder particles — emerge downward
        builderP.current = Array.from({ length: PARTICLES.BUILDER_COUNT }, () => ({
            x: cx, y: cy,
            vx: randomBetween(-2, 2),
            vy: randomBetween(1, 5),
            char: randomFrom(BUILDER_CHARS),
            alpha: randomBetween(0.5, 1.0),
        }))
    }, [])

    const draw = useCallback((timestamp: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const W = canvas.width / (window.devicePixelRatio || 1)
        const H = canvas.height / (window.devicePixelRatio || 1)
        const cx = W / 2
        const cy = H / 2

        if (!startRef.current) startRef.current = timestamp
        const elapsed = timestamp - startRef.current

        // Handle skip — jump to phase 4
        if (skipRef.current && elapsed < LOADING.PHASE_4_START) {
            startRef.current = timestamp - LOADING.PHASE_4_START
        }

        // ── Clear ─────────────────────────────────
        ctx.fillStyle = LOADING_COLORS.black
        ctx.fillRect(0, 0, W, H)

        // ── PHASE 1: Convergence (0–600ms) ────────
        const p1 = windowProgress(elapsed, LOADING.PHASE_1_START, LOADING.PHASE_1_END)

        if (p1 > 0 && p1 <= 1) {
            const t = ease.inOutCubic(p1)

            // Golden-ratio spiral (Design) — top-left → center
            const spiralX = lerp(W * 0.05, cx, t)
            const spiralY = lerp(H * 0.08, cy, t)
            drawGoldenSpiral(ctx, spiralX, spiralY, lerp(0, 32, t), LOADING_COLORS.designer, t)

            // Orbital ellipse (Physics) — top-right → center
            const orbitX = lerp(W * 0.92, cx, t)
            const orbitY = lerp(H * 0.08, cy, t)
            drawOrbitalEllipse(ctx, orbitX, orbitY, lerp(0, 28, t), LOADING_COLORS.observer, t)

            // Block cursor (Builder) — bottom-center → center
            const cursorX = lerp(cx, cx, t)
            const cursorY = lerp(H * 0.92, cy, t)
            const cursorVisible = Math.floor(elapsed / 180) % 2 === 0
            if (cursorVisible) {
                drawRect(ctx, cursorX - 5, cursorY - 9, 10, 18, LOADING_COLORS.builder, t * 0.9)
            }
        }

        // ── PHASE 2: Collision (600–1200ms) ───────
        const p2 = windowProgress(elapsed, LOADING.PHASE_2_START, LOADING.PHASE_2_END)

        if (p2 > 0) {
            // Shockwave ring expands from center
            const ringProgress = ease.outExpo(Math.min(p2 * 2, 1))
            const maxR = Math.sqrt(W * W + H * H) / 2
            const ringR = ringProgress * maxR
            const ringAlpha = 1 - ringProgress
            if (ringR > 0) {
                strokeCircle(ctx, cx, cy, ringR, '#ffffff', 1.5, ringAlpha * 0.7)
            }

            // White flash at peak (p2 ~0.1)
            if (p2 < 0.18) {
                const flashAlpha = (0.18 - p2) / 0.18
                ctx.fillStyle = `rgba(255,255,255,${flashAlpha * 0.4})`
                ctx.fillRect(0, 0, W, H)
            }

            // Initialise particles on first frame of phase 2
            if (p2 > 0 && designP.current.length === 0) {
                initParticles(cx, cy)
            }
        }

        // ── PHASE 3: Bloom (1200–2000ms) ──────────
        const p3 = windowProgress(elapsed, LOADING.PHASE_3_START, LOADING.PHASE_3_END)

        if (p3 > 0) {
            const speed = ease.outQuart(p3)
            const fade = p3 > 0.8 ? 1 - (p3 - 0.8) / 0.2 : 1

            // Move and draw design particles (grid rectangles, orange)
            for (const dp of designP.current) {
                dp.x += dp.vx * speed * 2.2
                dp.y += dp.vy * speed * 2.2
                drawRect(ctx, dp.x, dp.y, dp.w, dp.h, LOADING_COLORS.designer, dp.alpha * fade)
            }

            // Move and draw physics particles (dots, violet)
            for (const pp of physicsP.current) {
                pp.x += pp.vx * speed * 2.5
                pp.y += pp.vy * speed * 2.5
                drawCircle(ctx, pp.x, pp.y, pp.radius, LOADING_COLORS.observer, pp.alpha * fade)
            }

            // Move and draw builder particles (chars, green)
            for (const bp of builderP.current) {
                bp.x += bp.vx * speed * 2.0
                bp.y += bp.vy * speed * 2.0
                drawText(
                    ctx, bp.char, bp.x, bp.y,
                    '11px "JetBrains Mono", monospace',
                    LOADING_COLORS.builder,
                    bp.alpha * fade,
                )
            }
        }

        // ── PHASE 4: Collapse + Wipe (2000–2400ms) ─
        const p4 = windowProgress(elapsed, LOADING.PHASE_4_START, LOADING.PHASE_4_END)

        if (p4 > 0) {
            const collapseT = ease.inExpo(Math.min(p4 * 2, 1))

            // Suck particles back to center
            for (const dp of designP.current) {
                dp.x = lerp(dp.x, cx, collapseT * 0.15)
                dp.y = lerp(dp.y, cy, collapseT * 0.15)
                drawRect(ctx, dp.x, dp.y, dp.w * (1 - collapseT), dp.h * (1 - collapseT),
                    LOADING_COLORS.designer, dp.alpha * (1 - collapseT))
            }
            for (const pp of physicsP.current) {
                pp.x = lerp(pp.x, cx, collapseT * 0.15)
                pp.y = lerp(pp.y, cy, collapseT * 0.15)
                drawCircle(ctx, pp.x, pp.y, pp.radius * (1 - collapseT),
                    LOADING_COLORS.observer, pp.alpha * (1 - collapseT))
            }
            for (const bp of builderP.current) {
                bp.x = lerp(bp.x, cx, collapseT * 0.15)
                bp.y = lerp(bp.y, cy, collapseT * 0.15)
                drawText(ctx, bp.char, bp.x, bp.y,
                    '11px "JetBrains Mono", monospace',
                    LOADING_COLORS.builder, bp.alpha * (1 - collapseT))
            }

            // Single dot at center shrinking to nothing
            const dotR = lerp(4, 0, ease.inExpo(p4))
            if (dotR > 0) {
                drawCircle(ctx, cx, cy, dotR, '#ffffff', 1)
            }

            // Venetian-blind wipe — black slices drop in from top
            if (p4 > 0.5) {
                const wipeT = (p4 - 0.5) / 0.5
                const sliceH = H / LOADING.WIPE_SLICES
                for (let i = 0; i < LOADING.WIPE_SLICES; i++) {
                    const delay = i / LOADING.WIPE_SLICES * 0.35
                    const sliceT = ease.outQuart(clampLocal(wipeT - delay, 0, 1))
                    const sliceY = i * sliceH
                    ctx.fillStyle = '#000000'
                    ctx.fillRect(0, sliceY, W, sliceH * sliceT)
                }
            }

            // Done
            if (p4 >= 1 && !doneRef.current) {
                doneRef.current = true
                onComplete()
                return
            }
        }

        // Emit skippable signal once
        if (elapsed >= LOADING.SKIP_AFTER_MS && !skipRef.current) {
            onSkippable()
        }

        rafRef.current = requestAnimationFrame(draw)
    }, [initParticles, onComplete, onSkippable])

    // ── Handle skip signal ────────────────────
    useEffect(() => {
        if (skipSignal) {
            skipRef.current = true
        }
    }, [skipSignal])

    // ── Mount / resize ────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const resize = () => {
            setCanvasSize(canvas, window.innerWidth, window.innerHeight)
        }
        resize()
        window.addEventListener('resize', resize, { passive: true })

        rafRef.current = requestAnimationFrame(draw)

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(rafRef.current)
        }
    }, [draw])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                display: 'block',
                background: '#000',
            }}
        />
    )
}

// ── Local helpers ─────────────────────────────

function clampLocal(v: number, mn: number, mx: number) {
    return Math.max(mn, Math.min(mx, v))
}

function drawGoldenSpiral(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    alpha: number,
) {
    if (size < 1) return
    ctx.save()
    ctx.globalAlpha = alpha * 0.85
    ctx.strokeStyle = color
    ctx.lineWidth = 1.2
    ctx.translate(x, y)
    // Approximate golden spiral with arc segments
    const phi = 1.618
    let r = size / 6
    ctx.beginPath()
    for (let i = 0; i < 4; i++) {
        const startA = (i * Math.PI) / 2
        const endA = startA + Math.PI / 2
        ctx.arc(0, 0, r, startA, endA)
        r *= phi / 2.2
    }
    ctx.stroke()
    ctx.restore()
}

function drawOrbitalEllipse(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    alpha: number,
) {
    if (size < 1) return
    ctx.save()
    ctx.globalAlpha = alpha * 0.8
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.translate(x, y)
    // Three ellipses at different inclinations
    const angles = [0, 40, -30]
    const scales = [1, 0.65, 0.85]
    for (let i = 0; i < 3; i++) {
        ctx.save()
        ctx.rotate((angles[i] * Math.PI) / 180)
        ctx.scale(1, scales[i])
        ctx.beginPath()
        ctx.arc(0, 0, size, 0, Math.PI * 2)
        ctx.stroke()
        // Dot on orbit
        const dotAngle = (Date.now() / 1200 + i * 1.2) % (Math.PI * 2)
        drawCircle(ctx, Math.cos(dotAngle) * size, Math.sin(dotAngle) * size * scales[i], 2, color, alpha)
        ctx.restore()
    }
    ctx.restore()
}