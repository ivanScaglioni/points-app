import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
    const root = document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(theme)
}

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'dark'

    const saved = localStorage.getItem('theme') as Theme | null

    if (saved) return saved

    return 'dark'
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        return getInitialTheme()
    })

    // 🔥 aplica INMEDIATO al mount (no después de paint)
    useEffect(() => {
        applyTheme(theme)
    }, [])

    const toggleTheme = () => {
        const newTheme: Theme =
            theme === 'dark' ? 'light' : 'dark'

        setTheme(newTheme)
        applyTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return {
        theme,
        toggleTheme,
    }
}