// ─────────────────────────────────────────────
// CANVAS UTILITIES
// Pure functions — no React.
// Used by: LoadingCanvas, StarField, NebulaCanvas,
//          Spectrograph, CodeRainCanvas.
// ─────────────────────────────────────────────

// ── Easing ────────────────────────────────────

export const ease = {
    linear: (t: number) => t,
    inOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    inOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    outQuart: (t: number) => 1 - Math.pow(1 - t, 4),
    inQuart: (t: number) => t * t * t * t,
    outExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    inExpo: (t: number) => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
} as const

// ── Progress helpers ──────────────────────────

/**
 * Normalises a timestamp within a window to 0–1.
 * Returns 0 before the window starts, 1 after it ends.
 */
export function windowProgress(
    elapsed: number,
    startMs: number,
    endMs: number,
): number {
    if (elapsed <= startMs) return 0
    if (elapsed >= endMs) return 1
    return (elapsed - startMs) / (endMs - startMs)
}

/**
 * Lerp — linear interpolation between a and b.
 */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
}

// ── Drawing helpers ───────────────────────────

/**
 * Draw a filled circle.
 */
export function drawCircle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string,
    alpha = 1,
): void {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
}

/**
 * Draw a stroked circle.
 */
export function strokeCircle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string,
    lineWidth = 1,
    alpha = 1,
): void {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
}

/**
 * Draw a rectangle.
 */
export function drawRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    alpha = 1,
): void {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
    ctx.restore()
}

/**
 * Draw monospace text.
 */
export function drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    font: string,
    color: string,
    alpha = 1,
    align: CanvasTextAlign = 'left',
): void {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = color
    ctx.font = font
    ctx.textAlign = align
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x, y)
    ctx.restore()
}

// ── Canvas sizing ─────────────────────────────

/**
 * Set canvas pixel dimensions accounting for devicePixelRatio.
 * Call on mount and on window resize.
 */
export function setCanvasSize(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
): void {
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.getContext('2d')?.scale(dpr, dpr)
}

// ── Random helpers ────────────────────────────

export function randomBetween(min: number, max: number): number {
    return min + Math.random() * (max - min)
}

export function randomInt(min: number, max: number): number {
    return Math.floor(randomBetween(min, max + 1))
}

export function randomFrom<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

// ── Coordinate helpers ────────────────────────

/** Convert viewport percentage (0–1) to canvas pixel coordinates. */
export function pctToCanvas(
    pct: number,
    total: number,
): number {
    return pct * total
}

/** Euclidean distance between two points. */
export function dist(
    x1: number, y1: number,
    x2: number, y2: number,
): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}