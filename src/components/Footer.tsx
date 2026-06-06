import { Link } from '@tanstack/react-router'

const links = [
    {
        name: 'Beneficios',
        to: '/rewards',
    },
    {
        name: 'Mis puntos',
        to: '/dashboard',
    },
    {
        name: 'Crear cuenta',
        to: '/signup',
    },
]

export function Footer() {
    return (
        <footer
            className="
                border-t
                border-border
                bg-card
            "
        >
            <div
                className="
                    container-app
                    py-12
                    lg:py-16
                "
            >
                {/* TOP */}

                <div
                    className="
                        grid
                        gap-10

                        lg:grid-cols-[1.5fr_1fr]
                    "
                >
                    {/* BRAND */}

                    <div className="max-w-lg">
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center

                                    rounded-xl

                                    bg-primary

                                    text-lg
                                    font-bold

                                    text-primary-foreground
                                "
                            >
                                <img src="https://res.cloudinary.com/ivanscacloud/image/upload/v1780727805/fenix/fenixfichas500_qauipw.png" alt="" />
                            </div>

                            <div>
                                <h2
                                    className="
                                        font-bold
                                        tracking-tight
                                    "
                                >
                                    Fenix Fichas
                                </h2>

                                <p
                                    className="
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    Plataforma de beneficios
                                </p>
                            </div>
                        </div>

                        <p
                            className="
                                mt-5

                                text-sm
                                leading-7

                                text-muted-foreground

                                sm:text-base
                            "
                        >
                            Realizá tus recargas,
                            acumulá puntos automáticamente
                            y canjealos por beneficios
                            exclusivos dentro de la plataforma.
                        </p>
                    </div>

                    {/* LINKS */}

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-8
                        "
                    >
                        <div>
                            <h3
                                className="
                                    mb-4
                                    text-sm
                                    font-semibold
                                "
                            >
                                Navegación
                            </h3>

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                "
                            >
                                {links.map(
                                    link => (
                                        <Link
                                            key={
                                                link.to
                                            }
                                            to={
                                                link.to
                                            }
                                            className="
                                                text-sm
                                                text-muted-foreground

                                                transition-colors

                                                hover:text-foreground
                                            "
                                        >
                                            {
                                                link.name
                                            }
                                        </Link>
                                    ),
                                )}
                            </div>
                        </div>

                        <div>
                            <h3
                                className="
                                    mb-4
                                    text-sm
                                    font-semibold
                                "
                            >
                                Información
                            </h3>

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                "
                            >
                                <a
                                    href="#about"
                                    className="
                                            text-sm
                                            text-muted-foreground
                                            transition-colors
                                            hover:text-foreground
                                        "
                                >
                                    Sobre nosotros
                                </a>

                                <a
                                    href="#faq"
                                    className="
                                        text-sm
                                        text-muted-foreground
                                        transition-colors
                                        hover:text-foreground
                                    "
                                >
                                    Preguntas frecuentes
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}

                <div
                    className="
                        mt-10

                        flex
                        flex-col
                        gap-4

                        border-t
                        border-border

                        pt-6

                        text-sm
                        text-muted-foreground

                        md:flex-row
                        md:items-center
                        md:justify-between
                    "
                >
                    <p>
                        © {new Date().getFullYear()}
                        {' '}
                        Fenix Fichas.
                        Todos los derechos reservados.
                    </p>

                    <div
                        className="
                            flex
                            items-center
                            gap-6
                        "
                    >
                        <Link
                            to="/terms-privacy"
                            className="
                                transition-colors
                                hover:text-foreground
                            "
                        >
                            Privacidad
                        </Link>

                        <Link
                            to="/terms-privacy"
                            className="
                                transition-colors
                                hover:text-foreground
                            "
                        >
                            Términos
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}