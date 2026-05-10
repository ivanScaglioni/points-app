type Props = {
    destination: {
        id: string
        alias: string
        owner_name: string | null
        active: boolean
    }
}

export function PaymentDestinationRow({
    destination,
}: Props) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="space-y-1">
                <div className="font-semibold">
                    {destination.alias}
                </div>

                <div className="text-sm text-zinc-400">
                    {destination.owner_name}
                </div>

                <div className="text-xs text-zinc-500">
                    {destination.active
                        ? 'Activo'
                        : 'Inactivo'}
                </div>
            </div>
        </div>
    )
}