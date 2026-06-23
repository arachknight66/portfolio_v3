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

    useEffect(() => {
        // 1. Sync data-reality attribute on <body>
        document.body.setAttribute('data-reality', current)

        // 2. Toggle .active on each reality root div
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

    // Renders nothing — side-effects only
    return null
}