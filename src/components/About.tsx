import { Link } from '@tanstack/react-router'

export function AboutSection() {
    return (
        <section id='about' className="py-12 sm:py-16 lg:py-20">
            <div className="container-app">
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-border
                        bg-card
                        p-6

                        sm:p-8

                        lg:p-12
                    "
                >
                    {/* Glow */}

                    <div
                        className="
                            absolute
                            left-1/2
                            top-0

                            h-64
                            w-64

                            -translate-x-1/2

                            rounded-full

                            bg-primary/10

                            blur-3xl
                        "
                    />

                    <div
                        className="
                            relative
                            z-10

                            mx-auto
                            max-w-3xl

                            text-center
                        "
                    >
                        {/* Badge */}

                        <span
                            className="
                                inline-flex
                                items-center

                                rounded-full

                                bg-primary/10

                                px-3
                                py-1

                                text-xs
                                font-medium

                                text-primary
                            "
                        >
                            Sobre Fenix Fichas
                        </span>

                        {/* Title */}

                        <h2
                            className="
                                mt-5

                                text-3xl
                                font-bold
                                tracking-tight

                                sm:text-4xl
                            "
                        >
                            Más que una plataforma de recargas
                        </h2>

                        {/* Description */}

                        <p
                            className="
                                mt-6

                                text-base
                                leading-8

                                text-muted-foreground

                                sm:text-lg
                            "
                        >
                            En Fenix Fichas buscamos ofrecer una experiencia
                            más simple, rápida y confiable para quienes nos
                            eligen día a día.

                            <br />
                            <br />

                            Nuestro objetivo no es solamente procesar recargas,
                            sino brindar un servicio cercano, con atención
                            personalizada y beneficios exclusivos para
                            recompensar la confianza de cada usuario.
                        </p>

                        {/* Features */}


                        {/* Actions */}

                        <div
                            className="
                                mt-10

                                flex
                                flex-col
                                justify-center
                                gap-3

                                sm:flex-row
                            "
                        >
                            <Link
                                to="/rewards"
                                className="
                                    rounded-lg

                                    bg-primary

                                    px-6
                                    py-3

                                    font-semibold

                                    text-primary-foreground

                                    transition-opacity

                                    hover:opacity-90
                                "
                            >
                                Ver beneficios
                            </Link>

                            <Link
                                to="/signup"
                                className="
                                    rounded-lg

                                    border
                                    border-border

                                    bg-card

                                    px-6
                                    py-3

                                    font-semibold

                                    transition-colors

                                    hover:bg-accent
                                "
                            >
                                Crear cuenta
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}