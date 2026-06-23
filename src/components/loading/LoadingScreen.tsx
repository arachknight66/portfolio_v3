'use client'

// ─────────────────────────────────────────────
// LOADING SCREEN
//
// Mounts the canvas animation and owns the
// skip logic. Sits above everything at z:1000.
//
// Flow:
//   1. Renders LoadingCanvas full-screen
//   2. After SKIP_AFTER_MS any keypress/click
//      sets skipSignal → canvas jumps to Phase 4
//   3. When canvas calls onComplete → tells
//      the reality store loading is done →
//      this component unmounts itself
// ─────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { LoadingCanvas } from './LoadingCanvas'
import { useRealityStore } from '@/lib/reality-machine'

export function LoadingScreen() {
    const completeLoading = useRealityStore((s) => s.completeLoading)
    const loadingComplete = useRealityStore((s) => s.loadingComplete)

    const [canSkip, setCanSkip] = useState(false)
    const [skipSignal, setSkipSignal] = useState(false)

    // Once canvas says it's skippable, listen for any input
    useEffect(() => {
        if (!canSkip) return

        const trigger = () => setSkipSignal(true)

        window.addEventListener('keydown', trigger, { once: true })
        window.addEventListener('pointerdown', trigger, { once: true })

        return () => {
            window.removeEventListener('keydown', trigger)
            window.removeEventListener('pointerdown', trigger)
        }
    }, [canSkip])

    const handleComplete = useCallback(() => {
        completeLoading()
    }, [completeLoading])

    const handleSkippable = useCallback(() => {
        setCanSkip(true)
    }, [])

    // Don't render after loading is done
    if (loadingComplete) return null

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                background: '#000000',
            }}
            aria-hidden="true"
            aria-label="Loading"
        >
            <LoadingCanvas
                onComplete={handleComplete}
                onSkippable={handleSkippable}
                skipSignal={skipSignal}
            />

            {/* Skip hint — appears after SKIP_AFTER_MS, fades in */}
            {canSkip && !skipSignal && (
                <p
                    style={{
                        position: 'fixed',
                        bottom: '32px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.25)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        pointerEvents: 'none',
                        animation: 'fadeIn 400ms ease forwards',
                    }}
                >
                    press any key to skip
                </p>
            )}

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
        </div>
    )
}