export type CursorContext = 'default' | 'text' | 'project' | 'link' | 'interactive' | 'easter-egg'

export interface CursorState {
    x: number
    y: number
    context: CursorContext
    isVisible: boolean
}