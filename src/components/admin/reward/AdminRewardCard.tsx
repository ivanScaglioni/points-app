import type { Reward } from '~/types/reward'

import { Button } from '~/components/ui/Button'
import { Card, CardContent } from '~/components/ui/Card'
import { RewardImage } from '~/components/ui/RewardImage'
import { StatusBadge } from '~/components/ui/StatusBadge'

import { GiftIcon } from '@heroicons/react/24/outline'

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

                {/* COST BADGE */}
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

                {/* DESCRIPTION */}
                {reward.description && (
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {reward.description}
                    </p>
                )}

                {/* CASINO */}
                {reward.casino && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GiftIcon className="h-4 w-4 text-primary/70" />

                        <span>
                            Casino:{' '}
                            <span className="font-medium text-foreground">
                                {reward.casino.name}
                            </span>
                        </span>
                    </div>
                )}

                {/* ACTION */}
                <div className="pt-2">
                    <Button
                        disabled={loading}
                        onClick={() => onToggle(reward.id, reward.active)}
                        variant={reward.active ? 'destructive' : 'default'}
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