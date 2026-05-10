type TransactionType = 'earn' | 'redeem' | 'adjustment'

type Reward = {
    id: string
    title: string
} | null | undefined

type Props = {
    description?: string | null
    amount: number
    type: TransactionType
    createdAt: string
    reward?: Reward
    variant?: 'compact' | 'full'
}

export function TransactionItem({
    description,
    amount,
    type,
    createdAt,
    reward,
    variant = 'full',
}: Props) {
    const config = {
        earn: {
            label: 'Ingreso',
            sign: '+',
            color: 'text-success',
            badge: 'bg-success/10 text-success',
        },
        redeem: {
            label: 'Canje',
            sign: '-',
            color: 'text-destructive',
            badge: 'bg-destructive/10 text-destructive',
        },
        adjustment: {
            label: 'Ajuste',
            sign: '±',
            color: 'text-muted-foreground',
            badge: 'bg-muted/10 text-muted-foreground',
        },
    }[type]

    const isCompact = variant === 'compact'

    return (
        <div
            className={[
                'flex items-center justify-between rounded-2xl border border-border bg-card transition',
                isCompact ? 'p-3 hover:bg-accent/50' : 'p-4 hover:bg-accent',
            ].join(' ')}
        >
            {/* LEFT */}
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <p className="font-medium">
                        {description ?? config.label}
                    </p>

                    {!isCompact && (
                        <span className={`rounded-md px-2 py-1 text-xs ${config.badge}`}>
                            {type}
                        </span>
                    )}
                </div>

                {/* reward */}
                {reward && !isCompact && (
                    <p className="text-xs text-primary">
                        Reward: {reward.title}
                    </p>
                )}

                <p className="text-xs text-muted-foreground">
                    {new Date(createdAt).toLocaleString()}
                </p>
            </div>

            {/* RIGHT */}
            <div className="text-right">
                <div className={`text-lg font-bold ${config.color}`}>
                    {config.sign}
                    {amount} pts
                </div>
            </div>
        </div>
    )
}