'use client'

// ─────────────────────────────────────────────
// REALITY SWITCHER
//
// The only persistent interactive element across
// all three realities. Always fixed top-right.
// Morphs its own appearance per active reality:
//
//  designer → pill button, Instrument Serif italic
//  observer → flat monospace, scan-line underline
//  builder  → terminal command with blinking cursor
//
// Disabled during transitions to prevent double-fires.
// ─────────────────────────────────────────────

import { useReality } from '@/hooks'
import { REALITY_SWITCHER_LABEL } from '@/types'

export function RealitySwitcher() {
    const { current, isTransitioning, switchReality } = useReality()

    return (
        <button
            onClick={switchReality}
            disabled={isTransitioning}
            aria-label="Switch to next reality"
            data-reality-switcher={current}
            style={{
                position: 'fixed',
                top: '20px',
                right: '24px',
                zIndex: 'var(--z-nav)',
                cursor: isTransitioning ? 'wait' : 'none',
                opacity: isTransitioning ? 0.4 : 1,
                transition: 'opacity 200ms',
                // Reset all default button styles
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
                color: 'inherit',
                // Appearance driven entirely by CSS scoped to data-reality
                // See r1-designer.css, r2-observer.css, r3-builder.css
                // for .reality-switcher-* rules (added in Phase 10/14/17)
            }}
        >
            <span
                className="reality-switcher-label"
                style={{
                    // Fallback styles — replaced by per-reality CSS in later phases.
                    // These are intentionally readable even before reality CSS loads.
                    display: 'block',
                    fontFamily: current === 'designer'
                        ? 'Instrument Serif, Georgia, serif'
                        : current === 'observer'
                            ? 'JetBrains Mono, monospace'
                            : 'Geist Mono, JetBrains Mono, monospace',
                    fontStyle: current === 'designer' ? 'italic' : 'normal',
                    fontSize: '0.8rem',
                    letterSpacing: current === 'designer' ? '0' : '0.06em',
                    color: current === 'designer'
                        ? '#111111'
                        : current === 'observer'
                            ? '#C084FC'
                            : '#ADFF2F',
                    padding: current === 'designer' ? '6px 14px' : '4px 0',
                    border: current === 'designer' ? '1px solid #E8E8E4' : 'none',
                    borderRadius: current === 'designer' ? '100px' : '0',
                    background: current === 'designer' ? '#FFFFFF' : 'transparent',
                    whiteSpace: 'nowrap',
                }}
            >
                {REALITY_SWITCHER_LABEL[current]}
                {/* R3 blinking cursor — only rendered in builder reality */}
                {current === 'builder' && (
                    <span
                        aria-hidden="true"
                        style={{
                            display: 'inline-block',
                            width: '7px',
                            height: '1em',
                            background: '#ADFF2F',
                            marginLeft: '3px',
                            verticalAlign: 'text-bottom',
                            animation: 'blink 530ms step-end infinite',
                        }}
                    />
                )}
            </span>
        </button>
    )
}