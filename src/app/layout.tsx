import type { Metadata } from 'next'
import './globals.css'
import { RealitySwitcher } from '@/components/shared'

export const metadata: Metadata = {
    title: 'Daksh Saini',
    description: 'Frontend engineer. UI/UX designer. Astrophysics pipeline author.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/*
        data-reality="designer" is the default entry point.
        useReality hook (via RealitySwitcher → switchReality) swaps this
        attribute on <body> in real time. All reality CSS scopes to it.
      */}
            <body data-reality="designer">
                <a href="#main" className="skip-link">
                    Skip to content
                </a>

                {/* ── Always-visible persistent elements ── */}
                <RealitySwitcher />

                {/* ── Transition overlays ──────────────────
            Always in the DOM, z-index: --z-transition.
            TransitionEngine activates via .active class. */}
                <div className="transition-iris" aria-hidden="true">
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    >
                        <defs>
                            <mask id="iris-mask">
                                <rect width="100" height="100" fill="white" />
                                <circle className="iris-circle" cx="50" cy="50" r="0" fill="black" />
                            </mask>
                        </defs>
                        <rect width="100" height="100" fill="black" mask="url(#iris-mask)" />
                    </svg>
                </div>

                <div className="transition-glitch" aria-hidden="true">
                    <div className="glitch-tear" />
                    <div className="glitch-tear" />
                    <div className="glitch-tear" />
                </div>

                <div className="transition-flash" aria-hidden="true" />

                {/* ── Reality roots rendered here ── */}
                <main id="main">
                    {children}
                </main>
            </body>
        </html>
    )
}