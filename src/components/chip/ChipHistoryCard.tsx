type Props = {
    chip: any
}

export function ChipHistoryCard({
    chip,
}: Props) {
    const statusColor =
        chip.status ===
            'approved'
            ? 'text-emerald-400'
            : chip.status ===
                'rejected'
                ? 'text-red-400'
                : 'text-yellow-400'

    return (
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">
                    {
                        chip.reward
                            ?.title
                    }
                </div>

                <div
                    className={`font-medium capitalize ${statusColor}`}
                >
                    {chip.status}
                </div>
            </div>

            <div className="space-y-2 text-sm">
                <div>
                    <span className="text-white/50">
                        Casino:
                    </span>{' '}
                    {
                        chip.casino
                            ?.name
                    }
                </div>

                <div>
                    <span className="text-white/50">
                        Usuario casino:
                    </span>{' '}
                    {
                        chip.casino_username
                    }
                </div>

                {chip.reward && (
                    <div>
                        <span className="text-white/50">
                            Reward:
                        </span>{' '}
                        {
                            chip.reward
                                .title
                        }

                        <span className="ml-2 text-pink-400">
                            (
                            {
                                chip.reward
                                    .cost
                            }{' '}
                            pts)
                        </span>
                    </div>
                )}

                <div>
                    <span className="text-white/50">
                        Tipo:
                    </span>{' '}
                    Solicitud de fichas
                </div>

                <div className="text-xs text-white/40">
                    {new Date(
                        chip.created_at
                    ).toLocaleString()}
                </div>
            </div>
        </div>
    )
}