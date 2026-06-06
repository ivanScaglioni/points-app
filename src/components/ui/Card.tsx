// src/components/ui/card.tsx

import * as React from 'react'

import { cn } from '~/lib/cn'

export function Card({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                `
                rounded-lg
                border
                border-border
                bg-card
                text-card-foreground
                card-shadow
                transition-all
                duration-200
                `,
                className,
            )}
            {...props}
        />
    )
}

export function CardContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'p-4 sm:p-5',
                className,
            )}
            {...props}
        />
    )
}