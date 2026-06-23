// ─────────────────────────────────────────────
// LOADING SCREEN — TIMING CONSTANTS
//
// Four phases, 2400ms total.
// All durations in milliseconds.
//
// Phase 1 — Convergence  (0–600ms)
//   Three shapes travel from corners toward center:
//   top-left: golden-ratio spiral drawing itself
//   top-right: orbital ellipse drawing itself
//   bottom-center: block cursor blinking inward
//
// Phase 2 — Collision    (600–1200ms)
//   Shapes meet at center. Shockwave ring expands
//   to screen edges. 40ms white flash.
//
// Phase 3 — Bloom        (1200–2000ms)
//   Three particle streams bloom from center:
//   left:   tiny grid rectangles (Design)
//   right:  star dots (Physics)
//   bottom: code characters {}[]()<> (Builder)
//   All three coexist, overlap, fight for dominance.
//
// Phase 4 — Collapse     (2000–2400ms)
//   All particles reverse-suck into center point.
//   Point shrinks. Black.
//   Venetian-blind wipe reveals Reality 01.
//
// Skip: any interaction after SKIP_AFTER_MS
//   jumps immediately to Phase 4 collapse.
// ─────────────────────────────────────────────

export const LOADING = {
    PHASE_1_START: 0,
    PHASE_1_END: 600,

    PHASE_2_START: 600,
    PHASE_2_END: 1200,

    PHASE_3_START: 1200,
    PHASE_3_END: 2000,

    PHASE_4_START: 2000,
    PHASE_4_END: 2400,

    TOTAL_MS: 2400,

    // Skippable after this point (any key / click)
    SKIP_AFTER_MS: 1200,

    // Duration of the final venetian-blind wipe into R1
    WIPE_DURATION: 220,

    // How many blind slices in the venetian wipe
    WIPE_SLICES: 12,
} as const

// ── Particle counts ───────────────────────────
export const PARTICLES = {
    // Phase 3 — Design stream (grid rectangles)
    DESIGN_COUNT: 28,
    // Phase 3 — Physics stream (star dots)
    PHYSICS_COUNT: 40,
    // Phase 3 — Builder stream (code chars)
    BUILDER_COUNT: 22,
} as const

// ── Code characters for Phase 3 builder stream ─
export const BUILDER_CHARS = [
    '{', '}', '[', ']', '(', ')',
    '<', '>', '/', ';', '=', '=>',
    '&&', '||', '??', '...',
] as const

// ── Colors — all three reality accents ────────
export const LOADING_COLORS = {
    designer: '#FF4D00',   // R1 accent
    observer: '#C084FC',   // R2 accent
    builder: '#ADFF2F',   // R3 accent
    white: '#FFFFFF',
    black: '#000000',
} as const