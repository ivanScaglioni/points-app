// src/routes/_authed/admin/rewards/new.tsx
import {
    createFileRoute,
    useRouter,
} from '@tanstack/react-router'

import { useState } from 'react'

import { createReward } from '../../../../server/createReward'

import { getRewardCreateData } from '../../../../server/getRewardCreateData'

export const Route =
    createFileRoute(
        '/_authed/admin/rewards/new'
    )({
        loader: async () => {
            return await getRewardCreateData()
        },

        component: CreateRewardPage,
    })

function CreateRewardPage() {
    const router = useRouter()

    const { casinos } =
        Route.useLoaderData()

    const [title, setTitle] =
        useState('')

    const [cost, setCost] =
        useState(0)

    const [casinoId, setCasinoId] =
        useState('')

    const [image, setImage] =
        useState('')

    const [description, setDescription] =
        useState('')

    const [loading, setLoading] =
        useState(false)

    const handleCreate =
        async () => {
            if (
                !title ||
                !casinoId ||
                cost <= 0 ||
                !image
            ) {
                alert(
                    'Completa todos los campos'
                )

                return
            }

            try {
                setLoading(true)

                await createReward({
                    data: {
                        title,
                        cost,
                        casino_id:
                            casinoId,
                        image_url: image,
                        description,
                    },
                })

                router.navigate({
                    to: '/admin/rewards',
                })
            } finally {
                setLoading(false)
            }
        }

    return (
        <div className="mx-auto max-w-xl space-y-6">
            <h1 className="text-3xl font-bold">
                Nuevo beneficio
            </h1>

            <div className="space-y-4">
                <input
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                    placeholder="Título"
                    className="w-full rounded-lg bg-white/10 p-3"
                />

                <select
                    value={casinoId}
                    onChange={(e) =>
                        setCasinoId(
                            e.target.value
                        )
                    }
                    className="w-full rounded-lg bg-white/10 p-3"
                >
                    <option value="">
                        Seleccionar casino
                    </option>

                    {casinos.map(
                        (casino) => (
                            <option
                                key={
                                    casino.id
                                }
                                value={
                                    casino.id
                                }
                            >
                                {
                                    casino.name
                                }
                            </option>
                        )
                    )}
                </select>

                <input
                    type="number"
                    value={cost}
                    onChange={(e) =>
                        setCost(
                            Number(
                                e.target.value
                            )
                        )
                    }
                    placeholder="Costo en puntos"
                    className="w-full rounded-lg bg-white/10 p-3"
                />

                <input
                    value={image}
                    onChange={(e) =>
                        setImage(
                            e.target.value
                        )
                    }
                    placeholder="URL imagen"
                    className="w-full rounded-lg bg-white/10 p-3"
                />

                <textarea
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                    placeholder="Descripción"
                    className="w-full rounded-lg bg-white/10 p-3"
                />

                <button
                    onClick={
                        handleCreate
                    }
                    disabled={loading}
                    className="w-full rounded-lg bg-white/10 p-3 font-semibold"
                >
                    {loading
                        ? 'Creando...'
                        : 'Crear beneficio'}
                </button>
            </div>
        </div>
    )
}