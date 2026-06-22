'use client'

// Phase 2 verification page.
// Confirms all fonts load and all three reality CSS scopes are active.
// Replace entirely in Phase 4 with the real reality root wiring.

export default function Home() {
    return (
        <div style={{ padding: '40px', maxWidth: '760px', margin: '0 auto' }}>

            <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: '#888',
                textTransform: 'uppercase',
                marginBottom: '40px',
            }}>
                phase 2 — fonts &amp; tokens · open devtools → elements → check data-reality on body
            </p>

            {/* R1 Designer fonts */}
            <div style={{ marginBottom: '48px' }}>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#888', marginBottom: '16px', letterSpacing: '0.1em' }}>
                    REALITY 01 — THE DESIGNER
                </p>
                <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '2.4rem', fontWeight: 400, lineHeight: 1.1, color: '#111', marginBottom: '8px' }}>
                    I design things that feel right.
                </p>
                <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '2.4rem', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1, color: '#888', marginBottom: '12px' }}>
                    Italic variant.
                </p>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.95rem', fontWeight: 300, color: '#444', marginBottom: '8px' }}>
                    Inter 300 — body text. Frontend engineer, UI/UX designer, USICT Delhi.
                </p>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#111', marginBottom: '8px' }}>
                    Inter 500 — medium weight for emphasis.
                </p>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: '#888', letterSpacing: '0.08em' }}>
                    DM MONO — LABELS · METADATA · TAGS
                </p>
            </div>

            {/* R2 Observer fonts */}
            <div style={{ background: '#08060F', padding: '32px', borderRadius: '6px', marginBottom: '48px' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(192,132,252,0.6)', marginBottom: '16px', letterSpacing: '0.1em' }}>
                    REALITY 02 — THE OBSERVER
                </p>
                <p style={{ fontFamily: 'Syne, system-ui, sans-serif', fontSize: '2.4rem', fontWeight: 200, lineHeight: 1.1, color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>
                    I pointed JWST at NGC 7469.
                </p>
                <p style={{ fontFamily: 'Syne, system-ui, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#C084FC', marginBottom: '12px' }}>
                    Syne Bold — mission titles.
                </p>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
                    JetBrains Mono — all data, labels, coords: 28.6139°N 77.2090°E
                </p>
            </div>

            {/* R3 Builder fonts */}
            <div style={{ background: '#0D0D0D', padding: '32px', borderRadius: '6px', marginBottom: '48px' }}>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', color: '#555', marginBottom: '16px', letterSpacing: '0.1em' }}>
                    REALITY 03 — THE BUILDER
                </p>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.85rem', color: '#F0F0EE', lineHeight: 1.9, marginBottom: '8px' }}>
                    <span style={{ color: '#ADFF2F' }}>$ whoami</span><br />
                    <span style={{ color: '#555' }}>&gt; daksh saini</span>
                </p>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.85rem', color: '#F0F0EE', lineHeight: 1.9, marginBottom: '12px' }}>
                    <span style={{ color: '#818CF8' }}>const</span>{' '}
                    <span style={{ color: '#ADFF2F' }}>stack</span>{' '}
                    <span style={{ color: '#555' }}>=</span>{' '}
                    <span style={{ color: '#555' }}>[</span>
                    <span style={{ color: '#ADFF2F' }}>&ldquo;React&rdquo;</span>
                    <span style={{ color: '#555' }}>,</span>{' '}
                    <span style={{ color: '#ADFF2F' }}>&ldquo;Next.js&rdquo;</span>
                    <span style={{ color: '#555' }}>]</span>
                </p>
                <p style={{ fontFamily: 'Geist Sans, system-ui, sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#555' }}>
                    Geist Sans Light — prose only in R3.
                </p>
            </div>

            <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                color: '#333',
                letterSpacing: '0.08em',
            }}>
                if all three blocks above render in their correct typefaces → phase 2 complete ✓
            </p>

        </div>
    )
}