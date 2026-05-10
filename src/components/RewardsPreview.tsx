import { RewardCard } from '~/components/reward/RewardCard'
import { Link } from '@tanstack/react-router'
import type { Reward, User } from '../types/reward'

export function RewardsPreview({
    rewards,
    user,
}: {
    rewards: Reward[]
    user: User | null
}) {
    const topRewards = rewards.slice(0, 4)

    return (
        <div className="px-6 pb-20">
            <div className="max-w-6xl mx-auto space-y-6">

                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        Rewards destacados
                    </h2>

                    <Link
                        to="/rewards"
                        className="text-indigo-400 hover:text-indigo-300"
                    >
                        Ver todos →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topRewards.map((reward) => (
                        <RewardCard
                            key={reward.id}
                            reward={reward}
                            user={user}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}