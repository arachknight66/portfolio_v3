export type Reality = 'designer' | 'observer' | 'builder'

export interface RealityState {
    current: Reality
    previous: Reality | null
    isTransitioning: boolean
    scrollPositions: Record<Reality, number>
    loadingComplete: boolean
}

export const NEXT_REALITY: Record<Reality, Reality> = {
    designer: 'observer',
    observer: 'builder',
    builder: 'designer',
}

export const REALITY_SWITCHER_LABEL: Record<Reality, string> = {
    designer: 'Switch to Observer',
    observer: '[SWITCH_TO_BUILDER]',
    builder: '> sudo su designer',
}