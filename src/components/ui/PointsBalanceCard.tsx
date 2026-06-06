// src/components/ui/points-balance-card.tsx

type Props = {
    balance: number
}

export function PointsBalanceCard({
    balance,
}: Props) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative">
                <p className="text-sm font-medium text-muted-foreground">
                    Balance actual
                </p>

                <h2 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
                    {balance}
                    <span className="ml-2 text-2xl text-primary">
                        pts
                    </span>
                </h2>

            </div>
        </div>
    )
}