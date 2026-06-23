import { useEffect } from 'react'
import { useRealityStore } from '@/lib/reality-machine'
import type { Reality } from '@/types'

export function useScrollPosition(reality: Reality) {
    const saveScrollPosition = useRealityStore((state) => state.saveScrollPosition)

    useEffect(() => {
        const handleScroll = () => {
            saveScrollPosition(reality, window.scrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [reality, saveScrollPosition])
}
