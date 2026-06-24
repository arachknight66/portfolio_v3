'use client'

// ─────────────────────────────────────────────
// REALITY WATCHER
//
// A zero-render component that keeps the DOM
// in sync with the Zustand reality store.
//
// Responsibilities:
//  1. Sets data-reality on <body> whenever
//     the active reality changes.
//  2. Toggles the .active class on each
//     .reality-root div so only one is visible.
//  3. Lives in page.tsx, mounts once.
// ─────────────────────────────────────────────

import { useEffect } from 'react'
import { useRealityStore } from '@/lib/reality-machine'
import type { Reality } from '@/types'

const REALITY_IDS: Record<Reality, string> = {
    designer: 'reality-designer',
    observer: 'reality-observer',
    builder: 'reality-builder',
}

export function RealityWatcher() {
    const current = useRealityStore((s) => s.current)
    const loadingComplete = useRealityStore((s) => s.loadingComplete)

    // ── Sync data-reality on <body> ───────────
    useEffect(() => {
        document.body.setAttribute('data-reality', current)

        Object.entries(REALITY_IDS).forEach(([reality, domId]) => {
            const el = document.getElementById(domId)
            if (!el) return
            if (reality === current) {
                el.classList.add('active')
            } else {
                el.classList.remove('active')
            }
        })
    }, [current])

    // ── Sync data-loading on <body> ───────────
    // CSS uses this to hide the switcher + cursor
    // while the loading screen is playing.
    useEffect(() => {
        document.body.setAttribute(
            'data-loading',
            loadingComplete ? 'false' : 'true',
        )
    }, [loadingComplete])

    return null
}