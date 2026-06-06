import { Link } from '@tanstack/react-router'

import { RewardCard } from '~/components/reward/RewardCard'

import type {
    Reward,
    User,
} from '../types/reward'

type Props = {
    rewards: Reward[]
    user: User | null
}

export function RewardsPreview({
    rewards,
    user,
}: Props) {
    const topRewards =
        rewards.slice(0, 4)

    return (
        <section
            className="
                py-8
                sm:py-10
                lg:py-20
            "
        >
            <div className="container-app">
                <div
                    className="
                        flex
                        flex-col
                        gap-4

                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >
                    <div>
                        <h2
                            className="
                                text-2xl
                                font-bold
                                tracking-tight

                                sm:text-3xl
                            "
                        >
                            Beneficios destacados
                        </h2>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-muted-foreground

                                sm:text-base
                            "
                        >
                            Canjeá tus puntos por
                            fichas y recargas.
                        </p>
                    </div>

                    <Link
                        to="/rewards"
                        className="
                            inline-flex
                            h-10
                            items-center
                            justify-center
                            rounded-md
                            border
                            border-border
                            bg-card
                            px-4
                            text-xl
                            font-medium
                            transition-colors

                            hover:bg-accent
                            hover:text-accent-foreground
                        "
                    >
                        Ver todos
                    </Link>
                </div>

                <div
                    className="
                        mt-6

                        grid
                        grid-cols-1
                        gap-4

                        md:grid-cols-2
                        md:gap-6
                    "
                >
                    {topRewards.map(
                        reward => (
                            <RewardCard
                                key={
                                    reward.id
                                }
                                reward={
                                    reward
                                }
                                user={
                                    user
                                }
                            />
                        ),
                    )}
                </div>
            </div>
        </section>
    )
}