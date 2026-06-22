'use client'

// Phase 4 stub — renders R3 background + a minimal label.
// GridBackground added in Phase 17.
// Full section components added in Phase 17.

import { useScrollPosition } from '@/hooks'

export function BuilderRoot() {
    useScrollPosition('builder')

    return (
        <div
            id="reality-builder"
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
                fontFamily: 'var(--r3-font-mono, Geist Mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--r3-muted, #555)',
                textTransform: 'uppercase',
            }}>
                03 / the builder
            </p>
            <p style={{
                fontFamily: 'var(--r3-font-mono, Geist Mono, monospace)',
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                fontWeight: 400,
                color: 'var(--r3-accent, #ADFF2F)',
                letterSpacing: '-0.02em',
            }}>
                &gt;_ daksh saini
            </p>
            <p style={{
                fontFamily: 'var(--r3-font-mono, Geist Mono, monospace)',
                fontSize: '10px',
                color: 'var(--r3-muted, #555)',
                letterSpacing: '0.08em',
            }}>
                phase 4 — reality scoping ✓
            </p>
        </div>
    )
}