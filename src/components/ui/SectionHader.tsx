// src/components/ui/section-header.tsx

import { cn } from '~/lib/cn'

import { Badge } from './Badge'

type SectionHeaderProps = {
    badge?: string
    title: string
    description?: string
    align?: 'left' | 'center'
    className?: string
}

export function SectionHeader({
    badge,
    title,
    description,
    align = 'center',
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                'max-w-3xl',
                align === 'center' && 'mx-auto text-center',
                className,
            )}
        >
            {badge && (
                <Badge className="mb-4">
                    {badge}
                </Badge>
            )}

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                {title}
            </h2>

            {description && (
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    )
}