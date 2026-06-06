// src/routes/_authed/admin/payment-destinations/index.tsx

import {
    createFileRoute,
    Link,
} from '@tanstack/react-router'

import {
    EyeSlashIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline'

import { useRouter } from '@tanstack/react-router'

import { useMutation } from '~/hooks/useMutation'

import { togglePaymentDestinationStatus } from '~/server/payment/togglePaymentDestinationStatus'

import { getPaymentDestinations } from '~/server/payment/getPaymentDestinations'

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

    const router = useRouter()

    const toggleMutation = useMutation({
        fn: togglePaymentDestinationStatus,

        onSuccess: async () => {
            await router.invalidate()
        },
    })

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
                                No hay alias
                            </h3>

                            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                                Creá el primer destino de cobro para comenzar a
                                recibir transferencias.
                            </p>

                            <Button
                                asChild
                                className="mt-6"
                            >
                                <Link to="/admin/payment-destinations/new">
                                    Crear alias
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {destinations.map((destination) => (
                            <Card
                                key={destination.id}
                                className="transition-all hover:-translate-y-1 hover:border-primary/20"
                            >
                                <CardContent className="flex h-full flex-col p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                <BanknotesIcon className="h-7 w-7" />
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-semibold tracking-tight">
                                                    {destination.alias}
                                                </h2>

                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    Creado el{' '}
                                                    {new Date(
                                                        destination.created_at,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                destination.active
                                                    ? 'rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400'
                                                    : 'rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground'
                                            }
                                        >
                                            {destination.active
                                                ? 'Activo'
                                                : 'Inactivo'}
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-2xl border border-border bg-secondary/30 p-4">
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                            Alias
                                        </p>

                                        <p className="mt-1 break-all font-medium">
                                            {destination.alias}
                                        </p>
                                    </div>

                                    <div className="mt-3 rounded-2xl border border-border bg-secondary/30 p-4">
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                            Titular
                                        </p>

                                        <p className="mt-1 font-medium">
                                            {destination.owner_name}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-6">
                                        <Button
                                            variant={
                                                destination.active
                                                    ? 'destructive'
                                                    : 'default'
                                            }
                                            fullWidth
                                            disabled={
                                                toggleMutation.status ===
                                                'pending'
                                            }
                                            onClick={() => {
                                                toggleMutation.mutate({
                                                    data: {
                                                        destinationId:
                                                            destination.id,
                                                        active: !destination.active
                                                    },
                                                })
                                            }}
                                        >
                                            {destination.active ? (
                                                <>
                                                    <EyeSlashIcon className="h-4 w-4" />
                                                    Desactivar
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircleIcon className="h-4 w-4" />
                                                    Activar
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}