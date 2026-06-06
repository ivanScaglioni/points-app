import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'

import {
    Bars3Icon,
    MoonIcon,
    SunIcon,
    XMarkIcon,
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

export function Navbar({
    user,
}: NavbarProps) {
    const {
        theme,
        toggleTheme,
        mounted,
    } = useTheme()

    return (
        <Disclosure
            as="header"
            className="
                sticky
                top-0
                z-50

                border-b
                border-border

                bg-background/80

                backdrop-blur-xl
                backdrop-saturate-150
            "
        >
            {({ open }) => (
                <>
                    <div className="container-app">
                        <div
                            className="
                                flex
                                min-h-[72px]
                                items-center
                                justify-between
                            "
                        >
                            {/* LEFT */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-8
                                "
                            >
                                {/* LOGO */}

                                <Link
                                    to="/"
                                    className="
                                        flex
                                        items-center
                                        gap-3

                                        transition-opacity

                                        hover:opacity-90
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center

                                            rounded-xl

                                            bg-primary

                                            text-lg
                                            font-bold

                                            text-primary-foreground

                                            card-shadow
                                        "
                                    >
                                        <img src="https://res.cloudinary.com/ivanscacloud/image/upload/v1780727805/fenix/fenixfichas500_qauipw.png" alt="" />
                                    </div>

                                    <div className="hidden sm:block">
                                        <p
                                            className="
                                                font-bold
                                                tracking-tight
                                            "
                                        >
                                            Fenix Fichas
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >
                                            Beneficios y
                                            recompensas
                                        </p>
                                    </div>
                                </Link>

                                {/* DESKTOP NAV */}

                                <nav
                                    className="
                                        hidden
                                        items-center
                                        gap-1

                                        md:flex
                                    "
                                >
                                    {navigation.map(
                                        item => (
                                            <Link
                                                key={
                                                    item.to
                                                }
                                                to={
                                                    item.to
                                                }
                                                activeProps={{
                                                    className:
                                                        `
                                                        bg-accent
                                                        text-foreground
                                                    `,
                                                }}
                                                className="
                                                    rounded-lg

                                                    px-4
                                                    py-2

                                                    text-sm
                                                    font-medium

                                                    text-muted-foreground

                                                    transition-all

                                                    hover:bg-accent
                                                    hover:text-foreground
                                                "
                                            >
                                                {
                                                    item.name
                                                }
                                            </Link>
                                        ),
                                    )}
                                </nav>
                            </div>

                            {/* RIGHT */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                {/* THEME */}

                                <button
                                    onClick={
                                        toggleTheme
                                    }
                                    aria-label="Cambiar tema"
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center

                                        rounded-lg

                                        border
                                        border-border

                                        bg-card

                                        transition-all

                                        hover:bg-accent
                                    "
                                >
                                    {!mounted ? (
                                        <div className="size-5" />
                                    ) : theme ===
                                        'dark' ? (
                                        <SunIcon className="size-5" />
                                    ) : (
                                        <MoonIcon className="size-5" />
                                    )}
                                </button>

                                {/* AUTH */}

                                {user ? (
                                    <>
                                        <Link
                                            to="/dashboard"
                                            className="
                                                hidden

                                                md:flex
                                                items-center

                                                rounded-lg

                                                bg-secondary

                                                px-4
                                                py-2

                                                text-sm
                                                font-medium

                                                transition-colors

                                                hover:bg-accent
                                            "
                                        >
                                            Mi panel
                                        </Link>

                                        <Link
                                            to="/logout"
                                            className="
                                                rounded-lg

                                                bg-primary

                                                px-4
                                                py-2

                                                text-sm
                                                font-semibold

                                                text-primary-foreground

                                                transition-opacity

                                                hover:opacity-90
                                            "
                                        >
                                            Salir
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="
                                                hidden

                                                md:flex

                                                rounded-lg

                                                px-4
                                                py-2

                                                text-sm
                                                font-medium

                                                text-muted-foreground

                                                transition-colors

                                                hover:text-foreground
                                            "
                                        >
                                            Ingresar
                                        </Link>

                                        <Link
                                            to="/signup"
                                            className="
                                                rounded-lg

                                                bg-primary

                                                px-4
                                                py-2

                                                text-sm
                                                font-semibold

                                                text-primary-foreground

                                                transition-opacity

                                                hover:opacity-90
                                            "
                                        >
                                            Comenzar ahora
                                        </Link>
                                    </>
                                )}

                                {/* MOBILE BUTTON */}

                                <DisclosureButton
                                    className="
                                        flex

                                        items-center
                                        justify-center

                                        rounded-lg

                                        border
                                        border-border

                                        p-2

                                        transition

                                        hover:bg-accent

                                        md:hidden
                                    "
                                >
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

                    <DisclosurePanel
                        className="
                            border-t
                            border-border

                            bg-card

                            md:hidden
                        "
                    >
                        <div
                            className="
                                container-app

                                space-y-1

                                py-4
                            "
                        >
                            {navigation.map(
                                item => (
                                    <Link
                                        key={
                                            item.to
                                        }
                                        to={
                                            item.to
                                        }
                                        className="
                                            block

                                            rounded-lg

                                            px-4
                                            py-3

                                            text-sm
                                            font-medium

                                            transition-colors

                                            hover:bg-accent
                                        "
                                    >
                                        {
                                            item.name
                                        }
                                    </Link>
                                ),
                            )}

                            <div
                                className="
                                    my-4
                                    border-t
                                    border-border
                                "
                            />

                            {user ? (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        to="/dashboard"
                                        className="
                                            rounded-lg

                                            border
                                            border-border

                                            px-4
                                            py-3

                                            text-center
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Mi panel
                                    </Link>

                                    <Link
                                        to="/logout"
                                        className="
                                            rounded-lg

                                            bg-primary

                                            px-4
                                            py-3

                                            text-center
                                            text-sm
                                            font-semibold

                                            text-primary-foreground
                                        "
                                    >
                                        Salir
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        to="/login"
                                        className="
                                            rounded-lg

                                            border
                                            border-border

                                            px-4
                                            py-3

                                            text-center
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Ingresar
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="
                                            rounded-lg

                                            bg-primary

                                            px-4
                                            py-3

                                            text-center
                                            text-sm
                                            font-semibold

                                            text-primary-foreground
                                        "
                                    >
                                        Comenzar ahora
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