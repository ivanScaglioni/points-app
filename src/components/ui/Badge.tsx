// src/components/ui/badge.tsx

import * as React from 'react'

import { cn } from '~/lib/cn'

type BadgeProps =
    React.HTMLAttributes<HTMLDivElement>

export function Badge({
    className,
    ...props
}: BadgeProps) {
    return (
        <div
            className={cn(
                [
                    'inline-flex items-center',
                    'rounded-full',
                    'border border-border',
                    'bg-secondary',
                    'px-4 py-1.5',
                    'text-sm font-medium',
                    'text-muted-foreground',
                ],
                className,
            )}
            {...props}
        />
    )
}