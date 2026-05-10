import { useRouter } from '@tanstack/react-router'

import type { Reward, User } from '~/types/reward'

import { Button } from '~/components/ui/Button'
import { Card, CardContent } from '~/components/ui/Card'
import { RewardImage } from '~/components/ui/RewardImage'

import { SparklesIcon } from '@heroicons/react/24/outline'

type Props = {
    reward: Reward
    user: User | null
}

export function RewardCard({ reward, user }: Props) {
    const router = useRouter()

    const canRedeem = !!user

    const handleRedeem = () => {
        if (!canRedeem) {
            router.navigate({ to: '/login' })
            return
        }

        router.navigate({
            to: '/recharge',
            search: {
                rewardId: reward.id,
            },
        })
    }

    return (
        <Card className="group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
            {/* IMAGE */}
            <div className="relative">
                <RewardImage
                    src={reward.image_url}
                    alt={reward.title}
                    className="h-52"
                />

                {/* COST BADGE */}
                <div className="absolute right-4 top-4 rounded-full border border-background/20 bg-background/90 px-3 py-1 text-xs font-bold backdrop-blur">
                    {reward.cost} pts
                </div>
            </div>

            {/* CONTENT */}
            <CardContent className="flex flex-1 flex-col gap-4 p-5">
                {/* TITLE */}
                <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                        {reward.title}
                    </h3>

                    {reward.description && (
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                            {reward.description}
                        </p>
                    )}
                </div>

                {/* CASINO */}
                {reward.casino && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <SparklesIcon className="h-4 w-4 text-primary/70" />

                        <span>
                            Disponible en{' '}
                            <span className="font-medium text-foreground">
                                {reward.casino.name}
                            </span>
                        </span>
                    </div>
                )}

                <div className="flex-1" />

                {/* ACTION */}
                <Button
                    onClick={handleRedeem}
                    variant={canRedeem ? 'default' : 'secondary'}
                    className="w-full"
                >
                    {canRedeem
                        ? 'Usar beneficio'
                        : 'Iniciar sesión para usar'}
                </Button>
            </CardContent>
        </Card>
    )
}