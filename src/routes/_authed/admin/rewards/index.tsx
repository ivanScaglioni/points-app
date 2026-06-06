import {
    createFileRoute,
    Link,
    useRouter,
} from '@tanstack/react-router'

import { useState } from 'react'

import { getAdminRewards } from '../../../../server/reward/getAdminRewards'
import { toggleReward } from '../../../../server/reward/toggleReward'

import type { Reward } from '../../../../types/reward'

import { AdminRewardCard } from '../../../../components/admin/reward/AdminRewardCard'

import { Button } from '~/components/ui/Button'
import {
    Card,
    CardContent,
} from '~/components/ui/Card'

import {
    GiftIcon,
    PlusIcon,
} from '@heroicons/react/24/outline'

export const Route = createFileRoute(
    '/_authed/admin/rewards/',
)({
    loader: async () => {
        return await getAdminRewards()
    },

    component: AdminRewardsPage,
})

function AdminRewardsPage() {
    const rewards =
        Route.useLoaderData() as Reward[]

    const router = useRouter()

    const [loadingId, setLoadingId] =
        useState<string | null>(null)

    const handleToggle = async (
        id: string,
        active: boolean,
    ) => {
        const confirmed = window.confirm(
            active
                ? '¿Desactivar beneficio?'
                : '¿Activar beneficio?',
        )

        if (!confirmed) return

        try {
            setLoadingId(id)

            await toggleReward({
                data: {
                    id,
                    active: !active,
                },
            })

            await router.invalidate()
        } finally {
            setLoadingId(null)
        }
    }

    const activeRewards = rewards.filter(
        (r) => r.active,
    ).length

    return (
        <main className="min-h-screen bg-background">
            {/* HERO */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <GiftIcon className="h-4 w-4" />
                                Rewards
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">
                                    Beneficios
                                </h1>

                                <p className="mt-2 text-muted-foreground">
                                    Gestioná recompensas, activá o desactivá beneficios para usuarios.
                                </p>
                            </div>
                        </div>

                        <Button asChild>
                            <Link to="/admin/rewards/new">
                                <PlusIcon className="mr-2 h-5 w-5" />
                                Crear beneficio
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
                {/* STATS */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">
                                Total beneficios
                            </p>

                            <h2 className="mt-2 text-4xl font-bold">
                                {rewards.length}
                            </h2>
                        </CardContent>
                    </Card>

                    <Card className="border-emerald-500/20 bg-emerald-500/5">
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">
                                Activos
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-emerald-400">
                                {activeRewards}
                            </h2>
                        </CardContent>
                    </Card>
                </div>

                {/* EMPTY STATE */}
                {rewards.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <GiftIcon className="h-14 w-14 text-muted-foreground/40" />

                            <h3 className="mt-5 text-xl font-semibold">
                                No hay beneficios
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Creá el primer reward para empezar a ofrecer beneficios a usuarios.
                            </p>

                            <Button asChild className="mt-6">
                                <Link to="/admin/rewards/new">
                                    Crear beneficio
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {rewards.map((reward) => (
                            <AdminRewardCard
                                key={reward.id}
                                reward={reward}
                                onToggle={handleToggle}
                                loading={loadingId === reward.id}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}