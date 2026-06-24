// ─────────────────────────────────────────────
// TRANSITION ANIMATION CONFIGS
//
// Timing constants consumed by transition-engine.ts.
// Easing curves match the CSS custom properties
// so JS-driven and CSS-driven animations stay in sync.
// ─────────────────────────────────────────────

// ── Iris  (R01 → R02) ────────────────────────
export const IRIS = {
    // How long the iris takes to fully close (ms)
    CLOSE_DURATION: 320,
    // Hold time at fully closed before swap (ms)
    HOLD_DURATION: 20,
    // How long the iris takes to fully open (ms)
    OPEN_DURATION: 320,
    // Total: ~660ms
} as const

// ── Glitch  (R02 → R03) ──────────────────────
export const GLITCH = {
    // Delay between each tear starting to expand (ms)
    TEAR_STAGGER: 45,
    // How long each tear takes to expand (ms) — matches CSS animation
    TEAR_DURATION: 320,
    // Hold at fully covered before swap (ms)
    HOLD_DURATION: 30,
    // How long the scanline flicker plays after swap (ms)
    FLICKER_DURATION: 380,
    // Number of tears — must match .glitch-tear count in layout
    TEAR_COUNT: 3,
} as const

// ── Flash  (R03 → R01) ───────────────────────
export const FLASH = {
    // How long the white flash holds at full opacity (ms)
    FLASH_HOLD: 60,
    // Gap before starting blur resolve (ms)
    PRE_RESOLVE: 40,
    // How long the blur/opacity resolve takes (ms)
    RESOLVE_DURATION: 300,
    // Cleanup buffer after resolve (ms)
    CLEANUP_BUFFER: 20,
} as const

// ── Shared ────────────────────────────────────
// Guards rapid-click spamming — minimum time between
// any two transition starts (ms)
export const MIN_SWITCH_INTERVAL = 200