// src/routes/_authed/admin/recharge/index.tsx

import { createFileRoute } from '@tanstack/react-router'

import {
    ClockIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline'

import { getPendingRecharges } from '../../../../server/recharge/getPendingRecharges'

import { AdminRechargeCard } from '../../../../components/admin/recharge/AdminRechargeCard'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

export const Route =
    createFileRoute(
        '/_authed/admin/recharge/',
    )({
        loader: async () => {
            return await getPendingRecharges()
        },

        component:
            PendingRechargesPage,
    })

function PendingRechargesPage() {
    const recharges =
        Route.useLoaderData()

    return (
        <main className="min-h-screen bg-background">
            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.12),transparent_40%)]" />

                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        {/* LEFT */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
                                <div className="h-2 w-2 rounded-full bg-yellow-400" />

                                Administración de
                                recargas
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    Recharges
                                    pendientes
                                </h1>

                                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                    Revisá, aprobá o
                                    rechazá las solicitudes
                                    enviadas por los
                                    usuarios.
                                </p>
                            </div>
                        </div>

                        {/* STATS */}
                        <Card className="min-w-[220px] border-yellow-500/20 bg-yellow-500/5">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-400">
                                        <ClockIcon className="h-7 w-7" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Pendientes
                                        </p>

                                        <h2 className="mt-1 text-4xl font-bold tracking-tight text-yellow-400">
                                            {
                                                recharges.length
                                            }
                                        </h2>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {recharges.length ===
                    0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <CreditCardIcon className="h-10 w-10" />
                            </div>

                            <h2 className="mt-6 text-2xl font-bold tracking-tight">
                                No hay recargas
                                pendientes
                            </h2>

                            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                                Todas las solicitudes
                                fueron procesadas.
                                Cuando ingresen nuevas
                                recargas aparecerán
                                aquí.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-5">
                        {recharges.map(
                            (recharge) => (
                                <AdminRechargeCard
                                    key={
                                        recharge.id
                                    }
                                    recharge={
                                        recharge
                                    }
                                />
                            ),
                        )}
                    </div>
                )}
            </section>
        </main>
    )
}