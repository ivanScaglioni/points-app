import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
    const root = document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(theme)
}

export function useTheme() {
    const [mounted, setMounted] = useState(false)

    const [theme, setTheme] =
        useState<Theme>('dark')

    useEffect(() => {
        const saved =
            localStorage.getItem('theme') as Theme | null

        const initialTheme =
            saved ?? 'dark'

        setTheme(initialTheme)

        applyTheme(initialTheme)

        setMounted(true)
    }, [])

    const toggleTheme = () => {
        const newTheme: Theme =
            theme === 'dark'
                ? 'light'
                : 'dark'

        setTheme(newTheme)

        applyTheme(newTheme)

        localStorage.setItem(
            'theme',
            newTheme,
        )
    }

    return {
        theme,
        toggleTheme,
        mounted,
    }
}