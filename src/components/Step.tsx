const steps = [
    {
        number: '01',
        title: 'Creá tu cuenta',
        description:
            'Registrate en segundos y accedé a tu dashboard personal para empezar a sumar puntos.',
        image:
            'https://res.cloudinary.com/ivanscacloud/image/upload/v1780724768/fenix/59310789-b8e3-4c1f-b2d8-d93a6ca49f75_tzbcbw.png',
    },

    {
        number: '02',
        title: 'Solicitá una recarga',
        description:
            'Elegí tu casino, cargá los datos de transferencia y enviá la solicitud desde la app.',
        image:
            'https://res.cloudinary.com/ivanscacloud/image/upload/v1780724768/fenix/60e239a4-5f8c-43d4-92a2-de194bac1cdf_pah5gw.png',
    },

    {
        number: '03',
        title: 'Un operador procesa tu pedido',
        description:
            'Un operador toma tu recarga, valida la información y procesa la operación rápidamente.',
        image:
            'https://res.cloudinary.com/ivanscacloud/image/upload/v1780724768/fenix/5929b9f6-ad7e-48ee-aab2-7cc9d9d8f4ae_jvgmqz.png',
    },

    {
        number: '04',
        title: 'Ganás puntos y canjealos',
        description:
            'Acumulá puntos automáticamente y canjealos por beneficios exclusivos dentro de la plataforma.',
        image:
            'https://res.cloudinary.com/ivanscacloud/image/upload/v1780724768/fenix/734f04e9-c1d6-415c-aad3-5e097f807a89_gbjci0.png',
    },
]
export function Step() {
    return (
        <section className="container-app py-24">
            {/* HEADER */}
            <div className="mx-auto max-w-3xl text-center">

                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                    Empezá a ganar puntos en minutos
                </h2>

                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Un flujo rápido, moderno y simple para
                    recargar y obtener beneficios.
                </p>
            </div>

            {/* GRID */}
            <div className="mt-20 grid gap-6 lg:grid-cols-2">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
                    >
                        {/* IMAGE */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={step.image}
                                alt={step.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                            {/* NUMBER */}
                            <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-background/80 text-lg font-bold backdrop-blur">
                                {step.number}
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="space-y-4 p-6">
                            <h3 className="text-2xl font-semibold tracking-tight">
                                {step.title}
                            </h3>

                            <p className="leading-7 text-muted-foreground">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}