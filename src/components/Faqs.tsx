const faqs = [
    {
        q: '¿Cómo gano puntos?',
        a: 'Cada vez que realizás una recarga aprobada acumulás puntos automáticamente según el monto.',
    },

    {
        q: '¿Cómo puedo canjear mis puntos?',
        a: 'Desde la sección de beneficios podés elegir un beneficio y solicitar el canje directamente.',
    },

    {
        q: '¿Qué tipo de beneficios puedo obtener?',
        a: 'La plataforma ofrece beneficios exclusivos asociados a distintos casinos.',
    },
    {
        q: '¿Qué pasa después de solicitar una recarga?',
        a: 'Un operador toma tu solicitud, valida la transferencia y procesa la recarga manualmente. Puede tardar algunos minutos',
    },
    {
        q: '¿Mis puntos vencen?',
        a: 'No. Tus puntos quedan acumulados en tu cuenta y podés utilizarlos cuando quieras.',
    },
    {
        q: '¿Qué pasa si rechazan mi recarga?',
        a: 'Si tu recarga incluía un beneficio, los puntos reservados se devuelven automáticamente a tu balance.',
    },
    
]
export function Faqs() {
    return (
        <section id="faq" className="container-app py-24">
            {/* HEADER */}
            <div className="mx-auto max-w-3xl text-center">

                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                    Preguntas frecuentes
                </h2>

                <p className="mt-6 text-lg text-muted-foreground">
                    Todo lo que necesitás saber sobre
                    recargas, puntos y beneficios.
                </p>
            </div>

            {/* LIST */}
            <div className="mx-auto mt-16 max-w-4xl space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={faq.q}
                        className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:bg-secondary/40"
                    >
                        <div className="flex gap-5">
                            {/* NUMBER */}
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            {/* CONTENT */}
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {faq.q}
                                </h3>

                                <p className="mt-2 leading-7 text-muted-foreground">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}