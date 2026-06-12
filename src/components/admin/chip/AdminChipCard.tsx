import { useRouter }
    from '@tanstack/react-router'

import { useMutation }
    from '../../../hooks/useMutation'

import { takeChip }
    from '../../../server/chip/takeChip'

type Props = {
    chip: any
}

export function AdminChipCard({
    chip,
}: Props) {
    const router = useRouter()

    const mutation = useMutation({
        fn: takeChip,

        onSuccess: async () => {
            router.navigate({
                to: '/admin/chip/$id',

                params: {
                    id: chip.id,
                },
            })
        },
    })

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">

                {/* LEFT */}
                <div className="space-y-3">

                    {/* USER */}
                    <div>
                        <div className="text-sm text-white/40">
                            Usuario
                        </div>

                        <div className="font-medium text-white">
                            {
                                chip.profile
                                    ?.email
                            }
                        </div>
                    </div>

                    {/* CASINO */}
                    <div>
                        <div className="text-sm text-white/40">
                            Casino
                        </div>

                        <div className="text-white/80">
                            {
                                chip.casino
                                    ?.name
                            }
                        </div>
                    </div>

                    {/* CASINO USERNAME */}
                    <div>
                        <div className="text-sm text-white/40">
                            Usuario casino
                        </div>

                        <div className="font-medium text-white">
                            {
                                chip.casino_username
                            }
                        </div>
                    </div>

                    {/* REWARD */}
                    {chip.reward && (
                        <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2">
                            <div className="text-xs text-indigo-300">
                                Beneficio
                            </div>

                            <div className="text-sm font-medium text-white">
                                {
                                    chip.reward
                                        .title
                                }
                            </div>

                            <div className="mt-1 text-xs text-indigo-200">
                                Costo:{' '}
                                {
                                    chip.reward
                                        .cost
                                }{' '}
                                puntos
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-4">

                    <div className="text-xs text-white/40">
                        {new Date(
                            chip.created_at
                        ).toLocaleString()}
                    </div>

                    <button
                        disabled={
                            mutation.status ===
                            'pending'
                        }
                        onClick={() =>
                            mutation.mutate({
                                data: {
                                    id: chip.id,
                                },
                            })
                        }
                        className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50"
                    >
                        {mutation.status ===
                            'pending'
                            ? 'Tomando...'
                            : 'Tomar'}
                    </button>
                </div>
            </div>
        </div>
    )
}