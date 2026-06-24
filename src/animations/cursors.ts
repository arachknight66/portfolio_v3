// ─────────────────────────────────────────────
// CURSOR ANIMATION CONFIGS
// Per-reality cursor shapes, sizes, and labels.
// Consumed entirely by CustomCursor.tsx.
// ─────────────────────────────────────────────

import type { Reality, CursorContext } from '@/types'

export interface CursorConfig {
    // Dot size in px
    dotSize: number
    // Ring size in px (0 = no ring)
    ringSize: number
    // Ring border style
    ringBorder: string
    // Label shown beside cursor (empty = none)
    label: string
    // Whether the dot blinks
    blink: boolean
    // Dot shape
    shape: 'circle' | 'block' | 'crosshair'
}

// Indexed by [reality][context]
export const CURSOR_CONFIGS: Record<Reality, Record<CursorContext, CursorConfig>> = {
    // ── Reality 01 — Designer ──────────────────
    designer: {
        default: {
            dotSize: 8,
            ringSize: 36,
            ringBorder: '1px solid rgba(17,17,17,0.2)',
            label: '',
            blink: false,
            shape: 'circle',
        },
        text: {
            dotSize: 2,
            ringSize: 0,
            ringBorder: '',
            label: '',
            blink: false,
            shape: 'circle',
        },
        project: {
            dotSize: 6,
            ringSize: 52,
            ringBorder: '1px solid rgba(255,77,0,0.3)',
            label: 'open →',
            blink: false,
            shape: 'circle',
        },
        link: {
            dotSize: 10,
            ringSize: 40,
            ringBorder: '1px solid rgba(17,17,17,0.15)',
            label: '',
            blink: false,
            shape: 'circle',
        },
        interactive: {
            dotSize: 8,
            ringSize: 44,
            ringBorder: '1px solid rgba(17,17,17,0.15)',
            label: '',
            blink: false,
            shape: 'circle',
        },
        'easter-egg': {
            dotSize: 6,
            ringSize: 32,
            ringBorder: '1px solid rgba(255,77,0,0.4)',
            label: '',
            blink: false,
            shape: 'circle',
        },
    },

    // ── Reality 02 — Observer ──────────────────
    observer: {
        default: {
            dotSize: 0,          // no dot — crosshair is the cursor
            ringSize: 0,
            ringBorder: '',
            label: '',
            blink: false,
            shape: 'crosshair',
        },
        text: {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '',
            blink: false,
            shape: 'crosshair',
        },
        project: {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '[OPEN FILE]',
            blink: false,
            shape: 'crosshair',
        },
        link: {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '[TARGET LOCKED]',
            blink: false,
            shape: 'crosshair',
        },
        interactive: {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '[INTERACT]',
            blink: false,
            shape: 'crosshair',
        },
        'easter-egg': {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '',
            blink: false,
            shape: 'crosshair',
        },
    },

    // ── Reality 03 — Builder ───────────────────
    builder: {
        default: {
            dotSize: 0,          // block cursor replaces dot
            ringSize: 0,
            ringBorder: '',
            label: '',
            blink: true,
            shape: 'block',
        },
        text: {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '',
            blink: true,
            shape: 'block',
        },
        project: {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '> open',
            blink: false,
            shape: 'block',
        },
        link: {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '>_',
            blink: false,
            shape: 'block',
        },
        interactive: {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '>_',
            blink: false,
            shape: 'block',
        },
        'easter-egg': {
            dotSize: 0,
            ringSize: 0,
            ringBorder: '',
            label: '',
            blink: true,
            shape: 'block',
        },
    },
}

// Dot color per reality
export const CURSOR_DOT_COLOR: Record<Reality, string> = {
    designer: '#111111',
    observer: '#C084FC',
    builder: '#ADFF2F',
}

// Crosshair arm length for R2 (px)
export const CROSSHAIR_ARM = 14

// Crosshair line width for R2 (px)
export const CROSSHAIR_WIDTH = 1

// Block cursor dimensions for R3 (px)
export const BLOCK_W = 10
export const BLOCK_H = 18