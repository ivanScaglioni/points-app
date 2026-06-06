import type { Reward } from '~/types/reward'

import { Button } from '~/components/ui/Button'
import { Card, CardContent } from '~/components/ui/Card'
import { RewardImage } from '~/components/ui/RewardImage'
import { StatusBadge } from '~/components/ui/StatusBadge'

type Props = {
    reward: Reward
    onToggle: (id: string, active: boolean) => void
    loading: boolean
}

export function AdminRewardCard({
    reward,
    onToggle,
    loading,
}: Props) {
    return (
        <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/20">
            {/* IMAGE */}
            <div className="relative">
                <RewardImage
                    src={reward.image_url}
                    alt={reward.title}
                    className="h-48"
                />

                <div className="absolute right-4 top-4 rounded-full border border-background/20 bg-background/90 px-3 py-1 text-xs font-bold shadow backdrop-blur">
                    {reward.cost} pts
                </div>
            </div>

            {/* CONTENT */}
            <CardContent className="flex flex-1 flex-col gap-4 p-5">
                {/* HEADER */}
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <h3 className="line-clamp-1 text-lg font-semibold">
                            {reward.title}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Beneficio de rewards
                        </p>
                    </div>

                    <StatusBadge active={reward.active} />
                </div>

                {/* TYPE */}
                <div>
                    <span
                        className={
                            reward.type === 'chips'
                                ? 'inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400'
                                : 'inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400'
                        }
                    >
                        {reward.type === 'chips'
                            ? 'Chips'
                            : 'Recharge'}
                    </span>
                </div>

                {/* DESCRIPTION */}
                {reward.description && (
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {reward.description}
                    </p>
                )}

                {/* ACTION */}
                <div className="pt-2">
                    <Button
                        disabled={loading}
                        onClick={() =>
                            onToggle(
                                reward.id,
                                reward.active,
                            )
                        }
                        variant={
                            reward.active
                                ? 'destructive'
                                : 'default'
                        }
                        className="w-full"
                    >
                        {loading
                            ? 'Procesando...'
                            : reward.active
                                ? 'Desactivar beneficio'
                                : 'Activar beneficio'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}