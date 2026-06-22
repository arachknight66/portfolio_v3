'use client'

// Phase 4 stub — renders R2 background + a minimal label.
// Canvas layers (StarField, NebulaCanvas) added in Phase 13.
// Full section components added in Phase 14.

import { useScrollPosition } from '@/hooks'

export function ObserverRoot() {
    useScrollPosition('observer')

    return (
        <div
            id="reality-observer"
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
                fontFamily: 'var(--r2-font-mono, JetBrains Mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--r2-accent, #C084FC)',
                textTransform: 'uppercase',
            }}>
                02 / the observer
            </p>
            <p style={{
                fontFamily: 'var(--r2-font-display, Syne, sans-serif)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 200,
                color: 'var(--r2-text, rgba(255,255,255,0.9))',
                letterSpacing: '-0.03em',
            }}>
                Daksh Saini
            </p>
            <p style={{
                fontFamily: 'var(--r2-font-mono, JetBrains Mono, monospace)',
                fontSize: '10px',
                color: 'var(--r2-muted, rgba(255,255,255,0.45))',
                letterSpacing: '0.08em',
            }}>
                phase 4 — reality scoping ✓
            </p>
        </div>
    )
}