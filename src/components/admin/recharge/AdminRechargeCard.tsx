import { useRouter }
    from '@tanstack/react-router'

import { useMutation }
    from '../../../hooks/useMutation'

import { takeRecharge }
    from '../../../server/recharge/takeRecharge'

type Props = {
    recharge: any
}

export function AdminRechargeCard({
    recharge,
}: Props) {
    const router = useRouter()

    const mutation = useMutation({
        fn: takeRecharge,

        onSuccess: async () => {
            router.navigate({
                to: '/admin/recharge/$id',

                params: {
                    id: recharge.id,
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
                                recharge.profile
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
                                recharge.casino
                                    ?.name
                            }
                        </div>
                    </div>

                    {/* AMOUNT */}
                    <div>
                        <div className="text-sm text-white/40">
                            Monto
                        </div>

                        <div className="text-xl font-semibold text-emerald-400">
                            $
                            {
                                recharge.amount
                            }
                        </div>
                    </div>

                    {/* REWARD */}
                    {recharge.reward && (
                        <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-3 py-2">
                            <div className="text-xs text-indigo-300">
                                Beneficio
                            </div>

                            <div className="text-sm font-medium text-white">
                                {
                                    recharge
                                        .reward
                                        .title
                                }
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-4">

                    <div className="text-xs text-white/40">
                        {new Date(
                            recharge.created_at
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
                                    id: recharge.id,
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