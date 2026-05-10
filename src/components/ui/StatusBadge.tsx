// src/components/ui/status-badge.tsx

type StatusBadgeProps = {
    active: boolean
}

export function StatusBadge({
    active,
}: StatusBadgeProps) {
    return (
        <div
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${active
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
        >
            <div
                className={`mr-2 h-2 w-2 rounded-full ${active
                        ? 'bg-green-400'
                        : 'bg-red-400'
                    }`}
            />

            {active ? 'Activo' : 'Inactivo'}
        </div>
    )
}