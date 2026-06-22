// ─────────────────────────────────────────────
// TRANSITION ENGINE
//
// Orchestrates the full reality switch sequence:
//
//  1. Save outgoing reality scroll position
//  2. Play outgoing transition animation
//  3. Swap data-reality on <body>
//  4. Restore incoming reality scroll position
//  5. Play incoming reveal animation
//  6. Mark transition complete in store
//
// Three transition types:
//   iris   — R01→R02  circular aperture close/open
//   glitch — R02→R03  horizontal tears + scanline
//   flash  — R03→R01  white flash, blur resolve
// ─────────────────────────────────────────────

import type { TransitionType, Reality } from '@/types'
import { applyRealityToDOM, restoreScroll } from './reality-machine'

const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms))

// ── Public API ────────────────────────────────

export async function runTransition(
    type: TransitionType,
    incoming: Reality,
    savedScrollPos: number,
    onComplete: () => void,
): Promise<void> {
    switch (type) {
        case 'iris':
            await runIris(incoming, savedScrollPos, onComplete)
            break
        case 'glitch':
            await runGlitch(incoming, savedScrollPos, onComplete)
            break
        case 'flash':
            await runFlash(incoming, savedScrollPos, onComplete)
            break
    }
}

// ── Iris  (R01 → R02) ─────────────────────────
// Circular aperture closes inward from edges to
// center (320ms), swaps reality, then opens back
// out (320ms). Total: ~680ms incl. swap.

async function runIris(
    incoming: Reality,
    scrollPos: number,
    onComplete: () => void,
): Promise<void> {
    const wrap = document.querySelector<HTMLElement>('.transition-iris')
    const circle = document.querySelector<SVGCircleElement>('.iris-circle')
    if (!wrap || !circle) {
        // Fallback: instant swap if DOM elements missing
        applyRealityToDOM(incoming)
        restoreScroll(scrollPos)
        onComplete()
        return
    }

    // Get the maximum radius needed to cover the full viewport
    const maxR = Math.ceil(
        Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2 + 10
    )

    wrap.classList.add('active')

    // Phase A: close — grow circle from 0 to maxR (fills black)
    await animateCircle(circle, 0, maxR, 320)

    // Swap the reality while fully black
    applyRealityToDOM(incoming)
    restoreScroll(scrollPos)
    await delay(20)

    // Phase B: open — shrink circle from maxR to 0 (reveals new reality)
    await animateCircle(circle, maxR, 0, 320)

    wrap.classList.remove('active')
    onComplete()
}

function animateCircle(
    circle: SVGCircleElement,
    from: number,
    to: number,
    duration: number,
): Promise<void> {
    return new Promise((resolve) => {
        const start = performance.now()
        const ease = (t: number) => t < 0.5
            ? 2 * t * t
            : -1 + (4 - 2 * t) * t  // ease-in-out quad

        function frame(now: number) {
            const t = Math.min((now - start) / duration, 1)
            const val = from + (to - from) * ease(t)
            circle.setAttribute('r', String(val))
            if (t < 1) {
                requestAnimationFrame(frame)
            } else {
                resolve()
            }
        }
        requestAnimationFrame(frame)
    })
}

// ── Glitch  (R02 → R03) ──────────────────────
// Three horizontal tears expand left→right
// revealing #0D0D0D (R03 background). Tears
// stagger by 40ms each. Then reality swaps,
// tears collapse, scanline flicker plays.

async function runGlitch(
    incoming: Reality,
    scrollPos: number,
    onComplete: () => void,
): Promise<void> {
    const wrap = document.querySelector<HTMLElement>('.transition-glitch')
    const tears = document.querySelectorAll<HTMLElement>('.glitch-tear')
    if (!wrap || tears.length === 0) {
        applyRealityToDOM(incoming)
        restoreScroll(scrollPos)
        onComplete()
        return
    }

    wrap.classList.add('active')

    // Stagger the three tears expanding across the screen
    tears.forEach((tear, i) => {
        setTimeout(() => tear.classList.add('expanding'), i * 45)
    })

    // Wait for all tears to finish expanding
    await delay(45 * (tears.length - 1) + 320)

    // Swap reality while screen is covered
    applyRealityToDOM(incoming)
    restoreScroll(scrollPos)
    await delay(30)

    // Mount scanline flicker over incoming reality
    const flicker = document.createElement('div')
    flicker.className = 'scanline-flicker'
    document.body.appendChild(flicker)

    // Collapse tears
    tears.forEach((tear) => tear.classList.remove('expanding'))
    wrap.classList.remove('active')

    // Let scanline animation play out
    await delay(380)
    flicker.remove()

    onComplete()
}

// ── Flash  (R03 → R01) ───────────────────────
// White flash (60ms), then new reality resolves
// from blurry+transparent to sharp over 300ms.

async function runFlash(
    incoming: Reality,
    scrollPos: number,
    onComplete: () => void,
): Promise<void> {
    const el = document.querySelector<HTMLElement>('.transition-flash')
    if (!el) {
        applyRealityToDOM(incoming)
        restoreScroll(scrollPos)
        onComplete()
        return
    }

    // Instant white flash
    el.style.transition = 'none'
    el.style.opacity = '1'
    el.classList.add('active')
    await delay(60)

    // Swap while white
    applyRealityToDOM(incoming)
    restoreScroll(scrollPos)

    // Apply blur/dark to body so it resolves in
    document.body.style.filter = 'blur(10px)'
    document.body.style.opacity = '0.15'
    document.body.style.transition = 'none'

    // Remove flash
    el.style.transition = 'opacity 280ms ease-out'
    el.style.opacity = '0'
    el.classList.remove('active')

    await delay(40)

    // Resolve the incoming reality into view
    document.body.style.transition = 'filter 300ms ease-out, opacity 300ms ease-out'
    document.body.style.filter = 'none'
    document.body.style.opacity = '1'

    await delay(320)

    // Clean up inline styles
    document.body.style.transition = ''
    document.body.style.filter = ''
    document.body.style.opacity = ''
    el.style.transition = ''
    el.style.opacity = ''

    onComplete()
}