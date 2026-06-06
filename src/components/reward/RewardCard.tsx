import { useRouter } from '@tanstack/react-router'

import type {
    Reward,
    User,
} from '~/types/reward'

import { Button } from '~/components/ui/Button'
import {
    Card,
    CardContent,
} from '~/components/ui/Card'
import { RewardImage } from '~/components/ui/RewardImage'
import { StatusBadge } from '../ui/RewardBadge'



type Props = {
    reward: Reward
    user: User | null
}

export function RewardCard({
    reward,
    user,
}: Props) {
    const router = useRouter()

    const canRedeem = !!user

    const handleRedeem = () => {
        if (!canRedeem) {
            router.navigate({
                to: '/login',
            })

            return
        }

        if (
            reward.type ===
            'chips'
        ) {
            router.navigate({
                to: '/chip',
                search: {
                    rewardId:
                        reward.id,
                },
            })

            return
        }

        router.navigate({
            to: '/recharge',
            search: {
                rewardId:
                    reward.id,
            },
        })
    }

    return (
        <Card
            className="
                group
                flex
                h-full
                flex-col
                overflow-hidden
                card-shadow
                card-shadow-hover
            "
        >
            <div className="relative">
                <RewardImage
                    src={
                        reward.image_url
                    }
                    alt={
                        reward.title
                    }
                />

                {!user && (
                    <div
                        className="
                            absolute
                            right-3
                            top-3
                            z-10
                            rounded-full
                            border
                            border-border
                            bg-card/90
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            backdrop-blur
                        "
                    >
                        Iniciar sesión
                    </div>
                )}
            </div>

            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-y
                    border-border
                    bg-muted
                    px-4
                    py-3
                "
            >
                <span
                    className={
                        reward.type ===
                            'chips'
                            ? `
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide
                                text-success
                            `
                            : `
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide
                                text-primary
                            `
                    }
                >
                    {reward.type ===
                        'chips'
                        ? 'Fichas'
                        : 'Recarga'}
                </span>

                <div
                    className="
                        flex
                        items-baseline
                        gap-1
                    "
                >
                    <span
                        className="
                            text-xl
                            font-bold
                        "
                    >
                        {
                            reward.cost
                        }
                    </span>

                    <span
                        className="
                            text-xs
                            text-muted-foreground
                        "
                    >
                        pts
                    </span>
                </div>
            </div>

            <CardContent
                className="
                    flex
                    flex-1
                    flex-col
                "
            >
                <div>
                    <h3
                        className="
                            line-clamp-2
                            text-base
                            font-semibold
                            leading-tight
                            sm:text-lg
                        "
                    >
                        {
                            reward.title
                        }
                    </h3>

                    {reward.description && (
                        <p
                            className="
                                mt-2
                                line-clamp-2
                                text-sm
                                leading-6
                                text-muted-foreground
                            "
                        >
                            {
                                reward.description
                            }
                        </p>
                    )}
                </div>

                <div className="flex-1" />

                <Button
                    onClick={
                        handleRedeem
                    }
                    variant={
                        canRedeem
                            ? 'default'
                            : 'secondary'
                    }
                    className="
                        mt-5
                        h-11
                        w-full
                        font-medium
                    "
                >
                    {canRedeem
                        ? 'Canjear beneficio'
                        : 'Iniciar sesión para canjear'}
                </Button>
            </CardContent>
        </Card>
    )
}