'use client'

// Phase 4 stub — renders R1 background + a minimal label.
// Full section components added in Phase 10.

import { useScrollPosition } from '@/hooks'

export function DesignerRoot() {
    useScrollPosition('designer')

    return (
        <div
            id="reality-designer"
            className="reality-root"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
            }}
        >
            <p style={{
                fontFamily: 'var(--r1-font-mono, DM Mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--r1-muted, #888)',
                textTransform: 'uppercase',
            }}>
                01 / the designer
            </p>
            <p style={{
                fontFamily: 'var(--r1-font-display, Instrument Serif, serif)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 400,
                color: 'var(--r1-text, #111)',
                letterSpacing: '-0.02em',
            }}>
                Daksh Saini
            </p>
            <p style={{
                fontFamily: 'var(--r1-font-mono, DM Mono, monospace)',
                fontSize: '10px',
                color: 'var(--r1-accent, #FF4D00)',
                letterSpacing: '0.08em',
            }}>
                phase 4 — reality scoping ✓
            </p>
        </div>
    )
}