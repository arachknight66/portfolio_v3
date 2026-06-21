import type { Config } from 'tailwindcss'

// Tailwind is used for layout utilities and resets only.
// Reality-specific colors and typography live in src/styles/realities/*.css
// Do NOT add per-reality color tokens here.

const config: Config = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                // Reality 01 — The Designer
                'instrument': ['Instrument Serif', 'Georgia', 'serif'],
                'inter': ['Inter', 'system-ui', 'sans-serif'],
                'dm-mono': ['DM Mono', 'monospace'],
                // Reality 02 — The Observer
                'syne': ['Syne', 'system-ui', 'sans-serif'],
                'jetbrains': ['JetBrains Mono', 'monospace'],
                // Reality 03 — The Builder
                'geist-mono': ['Geist Mono', 'JetBrains Mono', 'monospace'],
                'geist': ['Geist Sans', 'system-ui', 'sans-serif'],
            },
            transitionTimingFunction: {
                // Primary ease — fast out, instant settle. Used across all realities.
                'reality': 'cubic-bezier(0.16, 1, 0.3, 1)',
                // Iris transition ease
                'iris': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            transitionDuration: {
                '80': '80ms',
                '180': '180ms',
                '320': '320ms',
                '640': '640ms',
                '800': '800ms',
            },
        },
    },
    plugins: [],
}

export default config