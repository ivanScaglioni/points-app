// src/components/ui/auth-card.tsx

import type { ReactNode } from 'react'

type Props = {
    title: string
    description?: string
    children: ReactNode
}

export function AuthCard({
    title,
    description,
    children,
}: Props) {
    return (
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    {title}
                </h1>

                {description && (
                    <p className="text-sm leading-6 text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {children}
        </div>
    )
}