import {
    createFileRoute,
    redirect,
    Link,
} from '@tanstack/react-router'


import {
    CreditCardIcon,
    GiftIcon,
    ClipboardDocumentListIcon,
    FireIcon
} from '@heroicons/react/24/outline'

import { getUserDashboardData } from '~/server/user/getUserDashboardData'

import { SectionHeader } from '~/components/ui/SectionHader'

import { DashboardCard } from '~/components/ui/DashboardCard'

import { PointsBalanceCard } from '~/components/ui/PointsBalanceCard'

import { ActionCard } from '~/components/ui/ActionCard'

import { EmptyState } from '~/components/ui/EmpyState'

import { TransactionItem } from '~/components/ui/TransactionItem'

export const Route =
    createFileRoute('/_authed/dashboard')({
        loader: async () => {
            try {
                return await getUserDashboardData()
            } catch (e) {
                if (e === 'ADMIN') {
                    throw redirect({
                        to: '/admin/dashboard',
                    })
                }

                if (e === 'WORKER') {
                    throw redirect({
                        to: '/operator/dashboard',
                    })
                }

                throw redirect({
                    to: '/login',
                })
            }
        },

        component: Dashboard,
    })

function Dashboard() {
    const {
        balance,
        user,
        transactions,
    } = Route.useLoaderData()

    return (
        <main className="min-h-screen bg-background">
            <div className="container-app py-8 md:py-10">
                <div className="space-y-8">
                    {/* HEADER */}
                    <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_35%)]" />

                        <div className="relative z-10 p-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                Dashboard
                            </div>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Bienvenido nuevamente
                            </h1>

                            <p className="mt-2 text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </section>

                    {/* BALANCE */}
                    <PointsBalanceCard
                        balance={balance}
                    />

                    {/* ACTIONS */}
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        <ActionCard
                            title="Nueva recarga"
                            description="Solicitá una recarga y acumulá puntos."
                            icon={
                                <CreditCardIcon className="h-6 w-6" />
                            }
                            to="/recharge"
                            search={{
                                rewardId: undefined,
                            }}
                        />

                        <ActionCard
                            title="Mis recargas"
                            description="Consultá el historial de solicitudes."
                            icon={
                                <ClipboardDocumentListIcon className="h-6 w-6" />
                            }
                            to="/recharge/history"
                        />

                        <ActionCard
                            title="Beneficios"
                            description="Canjeá puntos por recompensas."
                            icon={
                                <FireIcon className="h-6 w-6" />
                            }
                            to="/rewards"
                        />
                    </div>

                    {/* TRANSACTIONS */}
                    <DashboardCard>
                        {/* HEADER */}

                        <div
                            className="
            flex
            items-start
            justify-between

            border-b
            border-border

            p-6
        "
                        >
                            <div>
                                <h2
                                    className="
                    text-xl
                    font-semibold
                    tracking-tight
                "
                                >
                                    Actividad reciente
                                </h2>

                                <p
                                    className="
                    mt-1
                    text-sm
                    text-muted-foreground
                "
                                >
                                    Tus últimos movimientos de puntos.
                                </p>
                            </div>

                            <Link
                                to="/transactions"
                                search={{ page: 0 }}
                                className="
                text-sm
                font-medium
                text-primary

                transition-opacity

                hover:opacity-80
            "
                            >
                                Ver historial
                            </Link>
                        </div>

                        {/* CONTENT */}

                        <div className="p-6">
                            {transactions.length === 0 ? (
                                <EmptyState
                                    title="Todavía no hay movimientos"
                                    description="Cuando realices una recarga o canjees un beneficio aparecerán aquí."
                                />
                            ) : (
                                <div className="space-y-3">
                                    {transactions.map(tx => (
                                        <TransactionItem
                                            key={tx.id}
                                            description={tx.description}
                                            amount={tx.amount}
                                            type={tx.type}
                                            createdAt={tx.created_at}
                                            reward={tx.reward}
                                            variant="compact"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </main>
    )
}