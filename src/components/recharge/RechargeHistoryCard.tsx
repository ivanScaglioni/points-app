type Props = {
    recharge: any
}

export function RechargeHistoryCard({
    recharge,
}: Props) {
    const statusColor =
        recharge.status ===
            'approved'
            ? 'text-emerald-400'
            : recharge.status ===
                'rejected'
                ? 'text-red-400'
                : 'text-yellow-400'

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">
                    $
                    {recharge.amount}
                </div>

                <div
                    className={`font-medium capitalize ${statusColor}`}
                >
                    {recharge.status}
                </div>
            </div>

            <div className="space-y-2 text-sm">
                <div>
                    <span className="text-white/50">
                        Casino:
                    </span>{' '}
                    {
                        recharge.casino
                            ?.name
                    }
                </div>

                <div>
                    <span className="text-white/50">
                        Alias:
                    </span>{' '}
                    {
                        recharge
                            .payment_destination
                            ?.alias
                    }
                </div>

                <div>
                    Usuario casino:
                    {recharge.casino_username}
                </div>

                <div>
                    <span className="text-white/50">
                        Transferencia:
                    </span>{' '}
                    {
                        recharge.transaction_id
                    }
                </div>

                {recharge.points_earned && (
                    <div>
                        <span className="text-white/50">
                            Puntos:
                        </span>{' '}
                        <span className="text-emerald-400">
                            +
                            {
                                recharge.points_earned
                            }
                        </span>
                    </div>
                )}

                {recharge.reward && (
                    <div>
                        <span className="text-white/50">
                            Reward:
                        </span>{' '}
                        {
                            recharge.reward
                                .title
                        }

                        <span className="ml-2 text-pink-400">
                            (
                            {
                                recharge.reward
                                    .cost
                            }{' '}
                            pts)
                        </span>
                    </div>
                )}

                <div className="text-white/40 text-xs">
                    {new Date(
                        recharge.created_at
                    ).toLocaleString()}
                </div>
            </div>
        </div>
    )
}