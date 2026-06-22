import type { Metadata } from 'next'
import './globals.css'

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
        Phase 4 (reality state machine) will toggle this dynamically.
        All three reality CSS files scope themselves to this attribute.
      */}
            <body data-reality="designer">
                <a href="#main" className="skip-link">
                    Skip to content
                </a>

                {/* Transition overlays — always in DOM, inactive until a switch */}
                <div className="transition-iris" aria-hidden="true">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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

                <main id="main">
                    {children}
                </main>
            </body>
        </html>
    )
}