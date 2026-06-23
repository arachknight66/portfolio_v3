'use client'

// ─────────────────────────────────────────────
// ROOT PAGE — Phase 4
//
// Mounts all three reality roots simultaneously.
// Only the active one is visible — controlled by
// .reality-root / .reality-root.active CSS rules
// in src/styles/shared/globals.css, driven by the
// data-reality attribute on <body>.
//
// useReality hook inside each Root component
// keeps data-reality in sync with the Zustand store.
// ─────────────────────────────────────────────

import { DesignerRoot } from '@/components/r1-designer'
import { ObserverRoot } from '@/components/r2-observer'
import { BuilderRoot } from '@/components/r3-builder'
import { RealityWatcher } from './RealityWatcher'

export default function Home() {
    return (
        <>
            {/*
        RealityWatcher syncs the Zustand store → data-reality on <body>.
        Must be client-side, mounted at the root level.
      */}
            <RealityWatcher />

            {/* All three roots are always in the DOM.
          CSS visibility is toggled by .reality-root.active class,
          which is managed by RealityWatcher below. */}
            <DesignerRoot />
            <ObserverRoot />
            <BuilderRoot />
        </>
    )
}