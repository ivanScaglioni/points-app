// src/components/ui/empty-state.tsx

type EmptyStateProps = {
    title: string
    description?: string
}

export function EmptyState({
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-secondary/30 p-10 text-center">
            <h3 className="text-lg font-semibold">
                {title}
            </h3>

            {description && (
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    )
}