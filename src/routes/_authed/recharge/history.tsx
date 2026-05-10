// src/routes/_authed/recharge/history.tsx

import {
    createFileRoute,
    Link,
} from '@tanstack/react-router'

import {
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline'

import { getMyRecharges } from '../../../server/getMyRecharges'

import { RechargeHistoryCard } from '../../../components/recharge/RechargeHistoryCard'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

import { Button } from '~/components/ui/Button'

export const Route =
    createFileRoute(
        '/_authed/recharge/history',
    )({
        validateSearch: (
            search: Record<
                string,
                unknown
            >,
        ) => ({
            page: Number(
                search.page ?? 1,
            ),
        }),

        loaderDeps: ({
            search,
        }) => ({
            page: search.page,
        }),

        loader: async ({
            deps,
        }) => {
            return await getMyRecharges(
                {
                    data: {
                        page: deps.page,
                    },
                },
            )
        },

        component:
            RechargeHistoryPage,
    })

function RechargeHistoryPage() {
    const {
        recharges,
        pagination,
    } = Route.useLoaderData()

    const currentPage =
        pagination.page

    const totalPages =
        pagination.totalPages

    const pendingCount =
        recharges.filter(
            (r) =>
                r.status ===
                'pending',
        ).length

    const approvedCount =
        recharges.filter(
            (r) =>
                r.status ===
                'approved',
        ).length

    const rejectedCount =
        recharges.filter(
            (r) =>
                r.status ===
                'rejected',
        ).length

    return (
        <main className="min-h-screen bg-background">
            {/* HERO */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <CreditCardIcon className="h-4 w-4" />

                                Historial de
                                recargas
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    Mis recargas
                                </h1>

                                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                    Consultá el
                                    estado de tus
                                    recargas,
                                    recompensas y
                                    movimientos
                                    recientes.
                                </p>
                            </div>
                        </div>

                        <Button asChild>
                            <Link
                                to="/recharge"
                                search={{
                                    rewardId:
                                        undefined,
                                }}
                            >
                                Nueva recarga
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                {/* STATS */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <StatsCard
                        title="Pendientes"
                        value={pendingCount}
                        icon={
                            <ClockIcon className="h-6 w-6" />
                        }
                        className="border-yellow-500/20 bg-yellow-500/5 text-yellow-400"
                    />

                    <StatsCard
                        title="Aprobadas"
                        value={approvedCount}
                        icon={
                            <CheckCircleIcon className="h-6 w-6" />
                        }
                        className="border-green-500/20 bg-green-500/5 text-green-400"
                    />

                    <StatsCard
                        title="Rechazadas"
                        value={rejectedCount}
                        icon={
                            <XCircleIcon className="h-6 w-6" />
                        }
                        className="border-red-500/20 bg-red-500/5 text-red-400"
                    />
                </div>

                {/* LIST */}
                {recharges.length ===
                    0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <CreditCardIcon className="h-8 w-8 text-primary" />
                            </div>

                            <h2 className="mt-6 text-2xl font-semibold">
                                No tienes
                                recargas todavía
                            </h2>

                            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                Cuando realices
                                tu primera
                                recarga aparecerá
                                aquí.
                            </p>

                            <Button
                                asChild
                                className="mt-6"
                            >
                                <Link
                                    to="/recharge"
                                    search={{
                                        rewardId:
                                            undefined,
                                    }}
                                >
                                    Crear recarga
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="space-y-4">
                            {recharges.map(
                                (
                                    recharge,
                                ) => (
                                    <RechargeHistoryCard
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

                        {/* PAGINATION */}
                        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row">
                            <div className="text-sm text-muted-foreground">
                                Página{' '}
                                <span className="font-medium text-foreground">
                                    {
                                        currentPage
                                    }
                                </span>{' '}
                                de{' '}
                                <span className="font-medium text-foreground">
                                    {
                                        totalPages
                                    }
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    disabled={
                                        currentPage <=
                                        1
                                    }
                                    asChild
                                >
                                    <Link
                                        to="/recharge/history"
                                        search={{
                                            page:
                                                currentPage -
                                                1,
                                        }}
                                    >
                                        <ChevronLeftIcon className="mr-2 h-4 w-4" />

                                        Anterior
                                    </Link>
                                </Button>

                                <Button
                                    variant="outline"
                                    disabled={
                                        currentPage >=
                                        totalPages
                                    }
                                    asChild
                                >
                                    <Link
                                        to="/recharge/history"
                                        search={{
                                            page:
                                                currentPage +
                                                1,
                                        }}
                                    >
                                        Siguiente

                                        <ChevronRightIcon className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </main>
    )
}

type StatsCardProps = {
    title: string
    value: number
    icon: React.ReactNode
    className?: string
}

function StatsCard({
    title,
    value,
    icon,
    className,
}: StatsCardProps) {
    return (
        <Card className={className}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm opacity-80">
                            {title}
                        </p>

                        <h3 className="mt-2 text-4xl font-bold tracking-tight">
                            {value}
                        </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/50">
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}