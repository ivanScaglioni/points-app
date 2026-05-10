import {
    createFileRoute,
    redirect,
    Link,
} from '@tanstack/react-router'

import { getUserDashboardData } from '~/server/getUserDashboardData'

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
                    <SectionHeader
                        align="left"
                        badge="Dashboard"
                        title="Tu cuenta"
                        description={user.email}
                    />

                    {/* BALANCE */}
                    <PointsBalanceCard
                        balance={balance}
                    />

                    {/* ACTIONS */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <ActionCard
                            title="Nueva recarga"
                            description="Solicitá una nueva recarga y ganá puntos."
                            to="/recharge"
                            search={{
                                rewardId: undefined,
                            }}
                        />

                        <ActionCard
                            title="Mis recargas"
                            description="Consultá el historial y estado."
                            to="/recharge/history"
                        />

                        <ActionCard
                            title="Rewards"
                            description="Canjeá tus puntos por beneficios."
                            to="/rewards"
                        />
                    </div>

                    {/* TRANSACTIONS */}
                    <DashboardCard>
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold tracking-tight">
                                    Últimos movimientos
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Historial reciente de puntos
                                </p>
                            </div>

                            <Link
                                to="/transactions"
                                search={{ page: 0 }}
                                className="text-sm font-medium text-primary transition hover:opacity-80"
                            >
                                Ver todos
                            </Link>
                        </div>

                        {transactions.length === 0 ? (
                            <EmptyState
                                title="No hay movimientos"
                                description="Todavía no tenés movimientos registrados."
                            />
                        ) : (
                            <div className="space-y-4">
                                {transactions.map((tx) => (
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
                    </DashboardCard>
                </div>
            </div>
        </main>
    )
}