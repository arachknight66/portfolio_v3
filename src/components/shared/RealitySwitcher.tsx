'use client'

// ─────────────────────────────────────────────
// REALITY SWITCHER
//
// Always fixed top-right. Morphs its appearance
// entirely via scoped CSS in each reality file:
//
//   r1-designer.css  → pill, Instrument Serif italic
//   r2-observer.css  → flat mono, scan-line underline
//   r3-builder.css   → terminal command, blink cursor
//
// Uses className "reality-switcher-btn" and
// "reality-switcher-label" which the per-reality
// CSS files target via [data-reality="..."] scope.
//
// Hidden (opacity 0) when data-loading="true" on body.
// Disabled + dimmed during transitions.
// ─────────────────────────────────────────────

import { useReality } from '@/hooks'
import { useRealityStore } from '@/lib/reality-machine'
import { REALITY_SWITCHER_LABEL } from '@/types'

export function RealitySwitcher() {
    const { current, isTransitioning, switchReality } = useReality()
    const loadingComplete = useRealityStore((s) => s.loadingComplete)

    return (
        <button
            className="reality-switcher-btn"
            onClick={switchReality}
            disabled={isTransitioning || !loadingComplete}
            aria-label={`Currently: ${current}. Click to switch reality.`}
            data-transitioning={isTransitioning}
        >
            <span className="reality-switcher-label">
                {REALITY_SWITCHER_LABEL[current]}

                {/* R3 Builder only — blinking terminal cursor */}
                {current === 'builder' && (
                    <span
                        className="switcher-cursor"
                        aria-hidden="true"
                    />
                )}
            </span>
        </button>
    )
}