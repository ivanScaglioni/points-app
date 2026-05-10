// src/routes/_authed/operator/dashboard.tsx

import {
    createFileRoute,
    redirect,
    Link,
} from '@tanstack/react-router'

import {
    ClockIcon,
    CheckCircleIcon,
    CreditCardIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline'

import { getWorkerDashboardData } from '../../../server/getWorkerDashboardData'

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
        todayProcessed,
    } = Route.useLoaderData()

    return (
        <main className="min-h-screen bg-background">
            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_40%)]" />

                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <div className="h-2 w-2 rounded-full bg-primary" />

                                Panel operador
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    Dashboard
                                </h1>

                                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                    Gestioná y procesá
                                    recargas de usuarios
                                    de forma rápida y
                                    eficiente.
                                </p>
                            </div>
                        </div>

                        <Button
                            asChild
                            className="h-12 px-6"
                        >
                            <Link to="/admin/recharge">
                                Ver pendientes

                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
                {/* STATS */}
                <div className="grid gap-5 md:grid-cols-2">
                    {/* PENDING */}
                    <Link to="/admin/recharge">
                        <Card className="group border-yellow-500/20 bg-yellow-500/5 transition-all hover:-translate-y-1 hover:border-yellow-500/40 hover:bg-yellow-500/10">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-3">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-400">
                                            <ClockIcon className="h-7 w-7" />
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Recargas pendientes
                                            </p>

                                            <h2 className="mt-1 text-5xl font-bold tracking-tight text-yellow-400">
                                                {
                                                    pendingRecharges
                                                }
                                            </h2>
                                        </div>
                                    </div>

                                    <ArrowRightIcon className="h-5 w-5 text-yellow-400 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* TODAY */}
                    <Card className="transition-all hover:-translate-y-1 hover:border-primary/20">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <CheckCircleIcon className="h-7 w-7" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Procesadas hoy
                                        </p>

                                        <h2 className="mt-1 text-5xl font-bold tracking-tight">
                                            {
                                                todayProcessed
                                            }
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ACTIONS */}
                <div className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Acciones rápidas
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Accedé rápidamente a
                            las herramientas de
                            trabajo.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <OperatorActionCard
                            title="Procesar recargas"
                            description="Revisá solicitudes pendientes y asigná puntos."
                            icon={
                                <CreditCardIcon className="h-6 w-6" />
                            }
                            to="/admin/recharge"
                        />

                        <OperatorActionCard
                            title="Ver pendientes"
                            description="Accedé al listado completo de recargas pendientes."
                            icon={
                                <ClockIcon className="h-6 w-6" />
                            }
                            to="/admin/recharge"
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}

type OperatorActionCardProps =
    {
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