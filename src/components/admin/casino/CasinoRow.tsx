type Props = {
    casino: {
        id: string
        name: string
        active: boolean
    }
}

export function CasinoRow({
    casino,
}: Props) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <div className="font-semibold">
                        {casino.name}
                    </div>

                    <div className="text-sm text-zinc-400">
                        {casino.active
                            ? 'Activo'
                            : 'Inactivo'}
                    </div>
                </div>
            </div>
        </div>
    )
}