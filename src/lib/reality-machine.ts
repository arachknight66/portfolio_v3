// ─────────────────────────────────────────────
// REALITY STATE MACHINE
//
// The single source of truth for which reality
// is currently active. Built with Zustand for
// synchronous, instant state updates — no async,
// no suspense, no loading between realities.
//
// Imported by:
//   useReality          → reads current state
//   RealitySwitcher     → calls switchReality()
//   TransitionEngine    → reads previous/current
//   all three Root components → reads current
// ─────────────────────────────────────────────

import { create } from 'zustand'
import type { Reality, RealityState } from '@/types'
import { NEXT_REALITY } from '@/types'

interface RealityStore extends RealityState {
    switchReality: () => void
    setTransitioning: (val: boolean) => void
    saveScrollPosition: (r: Reality, pos: number) => void
    completeLoading: () => void
}

export const useRealityStore = create<RealityStore>((set, get) => ({
    // ── Initial state ──────────────────────────
    current: 'designer',
    previous: null,
    isTransitioning: false,
    scrollPositions: { designer: 0, observer: 0, builder: 0 },
    loadingComplete: false,

    // ── Actions ───────────────────────────────

    // Advance to the next reality in the cycle.
    // No-ops if a transition is already in flight.
    switchReality: () => {
        const { current, isTransitioning } = get()
        if (isTransitioning) return
        set({
            previous: current,
            current: NEXT_REALITY[current],
            isTransitioning: true,
        })
    },

    setTransitioning: (val) => set({ isTransitioning: val }),

    // Called by useScrollPosition on every scroll
    // event — saves position for the active reality
    // so it can be restored when switching back.
    saveScrollPosition: (reality, position) =>
        set((state) => ({
            scrollPositions: {
                ...state.scrollPositions,
                [reality]: position,
            },
        })),

    // Called by LoadingScreen once the 4-phase
    // animation completes (or is skipped).
    completeLoading: () => set({ loadingComplete: true }),
}))

// ─────────────────────────────────────────────
// DOM HELPERS
// Pure functions — no React, callable anywhere.
// ─────────────────────────────────────────────

/**
 * Writes the active reality to the <body> data attribute.
 * This is what activates the scoped CSS for each reality.
 * Called by TransitionEngine after the outgoing animation
 * finishes, right before the incoming reality renders.
 */
export function applyRealityToDOM(reality: Reality): void {
    document.body.setAttribute('data-reality', reality)
}

/**
 * Restores the saved scroll position for an incoming reality.
 * Uses 'instant' behaviour — no smooth scroll during a switch.
 */
export function restoreScroll(position: number): void {
    window.scrollTo({ top: position, behavior: 'instant' })
}