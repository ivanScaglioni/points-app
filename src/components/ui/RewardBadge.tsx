// src/components/ui/status-badge.tsx

import { cn } from '~/lib/cn'

type StatusBadgeProps = {
    active: boolean
}

export function StatusBadge({
    active,
}: StatusBadgeProps) {
    return (
        <div
            className={cn(
                `
                inline-flex
                items-center
                gap-2
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                `,
                active
                    ? 'bg-success/10 text-success'
                    : 'bg-destructive/10 text-destructive',
            )}
        >
            <div
                className={cn(
                    'h-2 w-2 rounded-full',
                    active
                        ? 'bg-success'
                        : 'bg-destructive',
                )}
            />

            {active
                ? 'Activo'
                : 'Inactivo'}
        </div>
    )
}