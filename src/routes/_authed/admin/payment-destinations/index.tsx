// src/routes/_authed/admin/payment-destinations/index.tsx

import {
    createFileRoute,
    Link,
} from '@tanstack/react-router'

import { getPaymentDestinations } from '~/server/getPaymentDestinations'

import { PaymentDestinationRow } from '~/components/admin/payment-destination/PaymentDestinationRow'

import { Button } from '~/components/ui/Button'
import { Card, CardContent } from '~/components/ui/Card'

import {
    BanknotesIcon,
    PlusIcon,
} from '@heroicons/react/24/outline'

export const Route = createFileRoute(
    '/_authed/admin/payment-destinations/',
)({
    loader: async () => {
        return await getPaymentDestinations()
    },

    component: Page,
})

function Page() {
    const destinations = Route.useLoaderData()

    const activeCount =
        destinations.filter((d) => d.active).length

    return (
        <main className="min-h-screen bg-background">
            {/* HERO */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <BanknotesIcon className="h-4 w-4" />
                                Payment destinations
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">
                                    Alias de cobro
                                </h1>

                                <p className="mt-2 max-w-2xl text-muted-foreground">
                                    Gestioná cuentas de cobro,
                                    activá o desactivá alias y
                                    organizá los destinos de pago.
                                </p>
                            </div>
                        </div>

                        <Button asChild>
                            <Link to="/admin/payment-destinations/new">
                                <PlusIcon className="mr-2 h-5 w-5" />
                                Nuevo alias
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                {/* STATS */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">
                                Total aliases
                            </p>

                            <h2 className="mt-1 text-4xl font-bold tracking-tight">
                                {destinations.length}
                            </h2>
                        </CardContent>
                    </Card>

                    <Card className="border-emerald-500/20 bg-emerald-500/5">
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">
                                Activos
                            </p>

                            <h2 className="mt-1 text-4xl font-bold tracking-tight text-emerald-400">
                                {activeCount}
                            </h2>
                        </CardContent>
                    </Card>
                </div>

                {/* LIST */}
                {destinations.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <BanknotesIcon className="h-14 w-14 text-muted-foreground/40" />

                            <h3 className="mt-5 text-xl font-semibold">
                                No hay aliases aún
                            </h3>

                            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                                Creá tu primer destino de
                                cobro para comenzar a recibir
                                pagos.
                            </p>

                            <Button asChild className="mt-6">
                                <Link to="/admin/payment-destinations/new">
                                    Crear alias
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {destinations.map((destination) => (
                            <PaymentDestinationRow
                                key={destination.id}
                                destination={destination}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}