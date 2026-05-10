import { Link } from '@tanstack/react-router'

const links = [
    {
        name: 'Sobre nosotros',
        to: '/about',
    },
    {
        name: 'Preguntas frecuentes',
        to: '/faq',
    },
    {
        name: 'Beneficios',
        to: '/rewards',
    },
    {
        name: 'Crear cuenta',
        to: '/signup',
    },
]

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container-app py-14">
                {/* TOP */}
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                    {/* BRAND */}
                    <div className="max-w-sm">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
                                P
                            </div>

                            <div>
                                <h2 className="font-semibold">
                                    PointsApp
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Rewards Platform
                                </p>
                            </div>
                        </div>

                        <p className="text-sm leading-6 text-muted-foreground">
                            Convertí tus puntos en beneficios reales,
                            descuentos y experiencias únicas.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold">
                                Plataforma
                            </h3>

                            <div className="flex flex-col gap-2">
                                {links.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className="text-sm text-muted-foreground transition hover:text-foreground"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
                    <p>
                        © {new Date().getFullYear()} PointsApp.
                        Todos los derechos reservados.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="transition hover:text-foreground"
                        >
                            Privacidad
                        </Link>

                        <Link
                            to="/"
                            className="transition hover:text-foreground"
                        >
                            Términos
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}