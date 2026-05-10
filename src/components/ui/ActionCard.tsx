// src/components/ui/action-card.tsx

import { Link } from '@tanstack/react-router'

type ActionCardProps = {
    title: string
    description: string
    to: string
    search?: Record<string, unknown>
}

export function ActionCard({
    title,
    description,
    to,
    search,
}: ActionCardProps) {
    return (
        <Link
            to={to}
            search={search}
            className="group rounded-3xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:bg-secondary/40"
        >
            <div className="space-y-3">
                <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                </h3>

                <p className="text-sm leading-6 text-muted-foreground">
                    {description}
                </p>
            </div>
        </Link>
    )
}