// src/components/ui/dashboard-card.tsx

import * as React from 'react'

import { cn } from '~/lib/cn'

export function DashboardCard({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                `
                overflow-hidden

                rounded-2xl

                border
                border-border

                bg-card

                shadow-sm

                transition-all
                duration-200
                `,
                className,
            )}
            {...props}
        />
    )
}