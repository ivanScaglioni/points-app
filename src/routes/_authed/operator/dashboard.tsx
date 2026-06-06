// src/routes/_authed/operator/dashboard.tsx

import {
    createFileRoute,
    redirect,
    Link,
} from '@tanstack/react-router'

import {
    CreditCardIcon,
    GiftIcon,
    ArrowRightIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

import { getWorkerDashboardData } from '~/server/getWorkerDashboardData'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

import { Button } from '~/components/ui/Button'

export const Route =
    createFileRoute(
        '/_authed/operator/dashboard',
    )({
        loader: async () => {
            try {
                return await getWorkerDashboardData()
            } catch {
                throw redirect({
                    to: '/login',
                })
            }
        },

        component:
            OperatorDashboard,
    })

function OperatorDashboard() {
    const {
        pendingRecharges,
        pendingChips,
    } = Route.useLoaderData()

    const totalPending =
        pendingRecharges +
        pendingChips

    return (
        <main className="min-h-screen bg-background">
            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_35%)]" />

                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <div className="h-2 w-2 rounded-full bg-primary" />

                                Panel operador
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    Panel Operador
                                </h1>

                                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                    Procesá solicitudes
                                    pendientes de
                                    recargas y fichas.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button asChild>
                                <Link to="/admin/recharge">
                                    Recargas

                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                            >
                                <Link to="/admin/chip">
                                    Fichas

                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
                {/* STATS */}
                <div className="grid gap-5 md:grid-cols-3">
                    {/* TOTAL */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <ExclamationTriangleIcon className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Pendientes totales
                                    </p>

                                    <h2 className="mt-1 text-4xl font-bold tracking-tight">
                                        {totalPending}
                                    </h2>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RECHARGES */}
                    <Link to="/admin/recharge">
                        <Card className="group border-yellow-500/20 bg-yellow-500/5 transition-all hover:-translate-y-1 hover:border-yellow-500/40 hover:bg-yellow-500/10">
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-400">
                                        <CreditCardIcon className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Recargas pendientes
                                        </p>

                                        <h2 className="mt-1 text-4xl font-bold tracking-tight text-yellow-400">
                                            {pendingRecharges}
                                        </h2>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* CHIPS */}
                    <Link to="/admin/chip">
                        <Card className="group border-indigo-500/20 bg-indigo-500/5 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-indigo-500/10">
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                                        <GiftIcon className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Fichas pendientes
                                        </p>

                                        <h2 className="mt-1 text-4xl font-bold tracking-tight text-indigo-400">
                                            {pendingChips}
                                        </h2>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* ACTIONS */}
                <div className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Acciones rápidas
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Herramientas disponibles
                            para operadores.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <OperatorActionCard
                            title="Procesar recargas"
                            description="Aprobar o rechazar solicitudes de recarga."
                            icon={
                                <CreditCardIcon className="h-6 w-6" />
                            }
                            to="/admin/recharge"
                        />

                        <OperatorActionCard
                            title="Procesar fichas"
                            description="Aprobar o rechazar solicitudes de fichas."
                            icon={
                                <GiftIcon className="h-6 w-6" />
                            }
                            to="/admin/chip"
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}

type OperatorActionCardProps = {
    title: string
    description: string
    icon: React.ReactNode
    to: string
}

function OperatorActionCard({
    title,
    description,
    icon,
    to,
}: OperatorActionCardProps) {
    return (
        <Link to={to}>
            <Card className="group h-full transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="flex h-full flex-col p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                        {icon}
                    </div>

                    <div className="mt-5 space-y-2">
                        <h3 className="text-lg font-semibold tracking-tight">
                            {title}
                        </h3>

                        <p className="text-sm leading-6 text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <div className="mt-auto pt-6">
                        <div className="inline-flex items-center text-sm font-medium text-primary">
                            Abrir

                            <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}