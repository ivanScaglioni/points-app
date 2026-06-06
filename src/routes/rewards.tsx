import { createFileRoute } from '@tanstack/react-router'

import { getRewardsPageData } from '~/server/reward/getRewardsPageData'

import { RewardCard } from '~/components/reward/RewardCard'

import { SectionHeader } from '~/components/ui/SectionHader'

import { EmptyState } from '~/components/ui/EmpyState'

import { Badge } from '~/components/ui/Badge'

import type {
    Reward,
    User,
} from '~/types/reward'

export const Route =
    createFileRoute('/rewards')({
        loader: async () => {
            return await getRewardsPageData()
        },

        component: RewardsPage,
    })

function RewardsPage() {
    const {
        rewards,
        user,
        points,
    } = Route.useLoaderData() as {
        rewards: Reward[]

        user: User | null

        points: number
    }

    const activeRewards =
        rewards.filter((r) => r.active)

    return (
        <main className="min-h-screen bg-background">
            <div className="container-app py-8 md:py-10">
                <div className="space-y-10">
                    {/* HERO */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <SectionHeader
                            align="left"
                            badge="Rewards"
                            title="Beneficios exclusivos"
                            description="Canjeá tus puntos por beneficios y promociones para tus próximas recargas."
                            className="mx-0"
                        />

                        {/* USER POINTS */}
                        {user && (
                            <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 backdrop-blur">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                                    ✦
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Tus puntos
                                    </p>

                                    <p className="text-2xl font-bold tracking-tight">
                                        {points}
                                        <span className="ml-1 text-sm text-primary">
                                            pts
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* LOGIN ALERT */}
                    {!user && (
                        <div className="rounded-3xl border border-border bg-card p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-semibold">
                                        Iniciá sesión para canjear rewards
                                    </h3>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Accedé a tu cuenta para usar tus
                                        puntos y desbloquear beneficios.
                                    </p>
                                </div>

                                <Badge>
                                    Invitado
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* GRID */}
                    {activeRewards.length === 0 ? (
                        <EmptyState
                            title="No hay beneficios disponibles"
                            description="Todavía no existen rewards activos en la plataforma."
                        />
                    ) : (
                        <>
                            {/* RESULTS */}
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    {activeRewards.length}{' '}
                                    {activeRewards.length === 1
                                        ? 'beneficio disponible'
                                        : 'beneficios disponibles'}
                                </p>
                            </div>

                            {/* REWARDS GRID */}
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {activeRewards.map(
                                    (reward) => (
                                        <RewardCard
                                            key={reward.id}
                                            reward={reward}
                                            user={user}
                                        />
                                    ),
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}