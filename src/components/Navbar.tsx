import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
    SunIcon,
    MoonIcon,
} from '@heroicons/react/24/outline'

import { Link } from '@tanstack/react-router'
import { useTheme } from '~/hooks/useTheme'



type NavbarProps = {
    user?: unknown
}

const navigation = [
    {
        name: 'Beneficios',
        to: '/rewards',
    },
    {
        name: 'Mis puntos',
        to: '/dashboard',
    },
]

export function Navbar({ user }: NavbarProps) {

    const {
        theme,
        toggleTheme,
        mounted,
    } = useTheme()

    return (
        <Disclosure
            as="header"
            className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
        >
            {({ open }) => (
                <>
                    <div className="container-app">
                        <div className="flex h-16 items-center justify-between">
                            {/* LEFT */}
                            <div className="flex items-center gap-8">
                                {/* LOGO */}
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground shadow-md">
                                        P
                                    </div>

                                    <div className="hidden sm:block">
                                        <p className="text-sm font-semibold">
                                            PointsApp
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Rewards Platform
                                        </p>
                                    </div>
                                </Link>

                                {/* DESKTOP NAV */}
                                <nav className="hidden items-center gap-1 md:flex">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            activeProps={{
                                                className:
                                                    'bg-secondary text-foreground',
                                            }}
                                            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary/60 hover:text-foreground"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* RIGHT */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleTheme}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-secondary"
                                    aria-label="Cambiar tema"
                                >
                                    {!mounted ? (
                                        <div className="size-5" />
                                    ) : theme === 'dark' ? (
                                        <SunIcon className="size-5" />
                                    ) : (
                                        <MoonIcon className="size-5" />
                                    )}
                                </button>
                                {user ? (
                                    <>
                                        <Link
                                            to="/dashboard"
                                            className="hidden rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-secondary md:flex"
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            to="/logout"
                                            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                                        >
                                            Salir
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground md:flex"
                                        >
                                            Ingresar
                                        </Link>

                                        <Link
                                            to="/signup"
                                            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                                        >
                                            Crear cuenta
                                        </Link>
                                    </>
                                )}

                                {/* MOBILE BUTTON */}
                                <DisclosureButton className="flex items-center justify-center rounded-lg border border-border p-2 transition hover:bg-secondary md:hidden">
                                    <span className="sr-only">
                                        Abrir menú
                                    </span>

                                    {open ? (
                                        <XMarkIcon className="size-5" />
                                    ) : (
                                        <Bars3Icon className="size-5" />
                                    )}
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE MENU */}
                    <DisclosurePanel className="border-t border-border bg-background md:hidden">
                        <div className="container-app space-y-2 py-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="my-4 border-t border-border" />

                            {user ? (
                                <Link
                                    to="/logout"
                                    className="block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                                >
                                    Salir
                                </Link>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        to="/login"
                                        className="rounded-lg border border-border px-4 py-3 text-center text-sm font-medium"
                                    >
                                        Ingresar
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                                    >
                                        Crear cuenta
                                    </Link>
                                </div>
                            )}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}