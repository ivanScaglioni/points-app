import { Link } from '@tanstack/react-router'

export function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            {/* BACKGROUND */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

                <div className="absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-3xl" />
            </div>

            <div className="container-app py-24 md:py-32">
                <div className="mx-auto max-w-5xl text-center">

                    {/* TITLE */}
                    <h1 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
                        Convertí tus{' '}
                        <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
                            puntos
                        </span>{' '}
                        en beneficios reales
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                        Recargá, acumulá puntos y desbloqueá
                        recompensas exclusivas dentro de la
                        plataforma.
                    </p>

                    {/* CTA */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            to="/rewards"
                            className="flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                        >
                            Ver beneficios
                        </Link>

                        <Link
                            to="/dashboard"
                            className="flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 font-medium transition hover:bg-secondary"
                        >
                            Mi cuenta
                        </Link>
                    </div>

                
                </div>
            </div>
        </section>
    )
}