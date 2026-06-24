import { useState, useEffect } from 'react'
import type { CursorState, CursorContext } from '@/types'

export function useCursor(): CursorState {
    const [state, setState] = useState<CursorState>({
        x: -100,
        y: -100,
        context: 'default',
        isVisible: false,
    })

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null
            const cursorEl = target?.closest('[data-cursor]')
            const context = (cursorEl?.getAttribute('data-cursor') as CursorContext) || 'default'

            setState((prev) => ({
                ...prev,
                x: e.clientX,
                y: e.clientY,
                context,
                isVisible: true,
            }))
        }

        const handleMouseLeave = () => {
            setState((prev) => ({ ...prev, isVisible: false }))
        }
        
        const handleMouseEnter = () => {
            setState((prev) => ({ ...prev, isVisible: true }))
        }

        window.addEventListener('mousemove', updateCursor, { passive: true })
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', updateCursor)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [])

    return state
}
