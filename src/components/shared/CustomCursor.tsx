'use client'

// ─────────────────────────────────────────────
// CUSTOM CURSOR
//
// Replaces the native cursor across all three
// realities. Reads CursorContext from the hook
// and renders the correct visual per reality:
//
//   designer → filled circle + lagging ring
//   observer → SVG crosshair (two lines, no dot)
//   builder  → blinking block █
//
// The ring lags behind the dot using lerp in a
// rAF loop for a smooth follow effect.
//
// Mount once in layout.tsx — above everything
// except the loading screen.
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { useCursor } from '@/hooks'
import { useRealityStore } from '@/lib/reality-machine'
import {
    CURSOR_CONFIGS,
    CURSOR_DOT_COLOR,
    CROSSHAIR_ARM,
    CROSSHAIR_WIDTH,
    BLOCK_W,
    BLOCK_H,
} from '@/animations/cursors'

export function CustomCursor() {
    const cursorState = useCursor()
    const current = useRealityStore((s) => s.current)
    const config = CURSOR_CONFIGS[current][cursorState.context]
    const dotColor = CURSOR_DOT_COLOR[current]

    // Ring position — lags behind dot
    const ringPos = useRef({ x: -100, y: -100 })
    const rafRef = useRef<number>(0)

    // Blink state for R3 block cursor
    const [visible, setVisible] = useState(true)
    const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null)

    // ── Lagging ring rAF loop ─────────────────
    useEffect(() => {
        function animate() {
            ringPos.current.x += (cursorState.x - ringPos.current.x) * 0.12
            ringPos.current.y += (cursorState.y - ringPos.current.y) * 0.12

            const ring = document.getElementById('cursor-ring')
            if (ring) {
                ring.style.transform =
                    `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
            }

            rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [cursorState.x, cursorState.y])

    // ── Blink interval for R3 ─────────────────
    useEffect(() => {
        if (config.blink) {
            blinkRef.current = setInterval(() => {
                setVisible((v) => !v)
            }, 530)
        } else {
            setVisible(true)
            if (blinkRef.current) clearInterval(blinkRef.current)
        }
        return () => {
            if (blinkRef.current) clearInterval(blinkRef.current)
        }
    }, [config.blink])

    if (!cursorState.isVisible) return null

    const dotX = cursorState.x
    const dotY = cursorState.y

    return (
        <>
            {/* ── Dot / Block / Crosshair ─────────── */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 'var(--z-cursor)' as string,
                    transform: `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`,
                    willChange: 'transform',
                }}
            >
                {config.shape === 'circle' && config.dotSize > 0 && (
                    <div
                        style={{
                            width: config.dotSize,
                            height: config.dotSize,
                            borderRadius: '50%',
                            background: dotColor,
                            transition: 'width 200ms, height 200ms',
                        }}
                    />
                )}

                {config.shape === 'crosshair' && (
                    <svg
                        width={CROSSHAIR_ARM * 2 + 2}
                        height={CROSSHAIR_ARM * 2 + 2}
                        style={{ overflow: 'visible', display: 'block' }}
                        aria-hidden="true"
                    >
                        {/* Horizontal arm */}
                        <line
                            x1={-CROSSHAIR_ARM} y1={0}
                            x2={CROSSHAIR_ARM} y2={0}
                            stroke={dotColor}
                            strokeWidth={CROSSHAIR_WIDTH}
                        />
                        {/* Vertical arm */}
                        <line
                            x1={0} y1={-CROSSHAIR_ARM}
                            x2={0} y2={CROSSHAIR_ARM}
                            stroke={dotColor}
                            strokeWidth={CROSSHAIR_WIDTH}
                        />
                    </svg>
                )}

                {config.shape === 'block' && visible && (
                    <div
                        style={{
                            width: BLOCK_W,
                            height: BLOCK_H,
                            background: dotColor,
                        }}
                    />
                )}

                {/* Label (R2 mission context / R3 prompt) */}
                {config.label && (
                    <span
                        style={{
                            position: 'absolute',
                            left: config.shape === 'crosshair' ? CROSSHAIR_ARM + 8 : BLOCK_W + 6,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontFamily: current === 'observer'
                                ? 'JetBrains Mono, monospace'
                                : 'Geist Mono, JetBrains Mono, monospace',
                            fontSize: '9px',
                            color: dotColor,
                            letterSpacing: '0.08em',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                        }}
                    >
                        {config.label}
                    </span>
                )}
            </div>

            {/* ── Lagging ring — R1 Designer only ─── */}
            {config.ringSize > 0 && (
                <div
                    id="cursor-ring"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: config.ringSize,
                        height: config.ringSize,
                        borderRadius: '50%',
                        border: config.ringBorder,
                        pointerEvents: 'none',
                        zIndex: (parseInt(String(getComputedStyle(document.documentElement)
                            .getPropertyValue('--z-cursor') || '998')) - 1) as unknown as string,
                        willChange: 'transform',
                        // Initial position — rAF loop updates this
                        transform: `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`,
                    }}
                />
            )}
        </>
    )
}