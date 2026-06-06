// src/routes/_authed/admin/rewards/new.tsx

import {
    createFileRoute,
    useRouter,
} from '@tanstack/react-router'

import { useState } from 'react'

import {
    GiftIcon,
    PhotoIcon,
    ArrowPathIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline'

import { createReward } from '~/server/reward/createReward'

import { Button } from '~/components/ui/Button'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

import { Input } from '~/components/ui/Input'

import { Label } from '~/components/ui/Label'

export const Route = createFileRoute(
    '/_authed/admin/rewards/new',
)({
    component: CreateRewardPage,
})

function CreateRewardPage() {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [cost, setCost] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] =
        useState('')

    const [type, setType] = useState<
        'chips' | 'recharge'
    >('recharge')

    const [loading, setLoading] =
        useState(false)

    const handleCreate = async () => {
        if (
            !title ||
            cost <= 0 ||
            !image
        ) {
            alert(
                'Completá todos los campos obligatorios',
            )

            return
        }

        try {
            setLoading(true)

            await createReward({
                data: {
                    title,
                    cost,
                    type,
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
        <main className="min-h-screen bg-background">
            {/* HERO */}

            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_40%)]" />

                <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="relative z-10 space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <GiftIcon className="h-4 w-4" />
                            Administración
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                Nuevo beneficio
                            </h1>

                            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                Creá recompensas que los usuarios
                                podrán canjear utilizando sus
                                puntos acumulados.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}

            <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
                    {/* FORM */}

                    <Card>
                        <CardContent className="p-6 sm:p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Datos del beneficio
                                </h2>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Configurá la recompensa que
                                    estará disponible para los
                                    usuarios.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* TITLE */}

                                <div className="space-y-2">
                                    <Label>
                                        Título
                                    </Label>

                                    <Input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(
                                                e.target
                                                    .value,
                                            )
                                        }
                                        placeholder="Ej: Bonus 500 fichas"
                                    />
                                </div>

                                {/* TYPE */}

                                <div className="space-y-2">
                                    <Label>
                                        Tipo
                                    </Label>

                                    <select
                                        value={type}
                                        onChange={(e) =>
                                            setType(
                                                e.target
                                                    .value as
                                                    | 'chips'
                                                    | 'recharge',
                                            )
                                        }
                                        className="
                                            h-11
                                            w-full
                                            rounded-xl
                                            border
                                            border-input
                                            bg-background
                                            px-3
                                            text-sm
                                        "
                                    >
                                        <option value="recharge">
                                            Recarga
                                        </option>

                                        <option value="chips">
                                            Fichas
                                        </option>
                                    </select>
                                </div>

                                {/* COST */}

                                <div className="space-y-2">
                                    <Label>
                                        Costo en puntos
                                    </Label>

                                    <Input
                                        type="number"
                                        value={cost}
                                        onChange={(e) =>
                                            setCost(
                                                Number(
                                                    e
                                                        .target
                                                        .value,
                                                ),
                                            )
                                        }
                                        placeholder="500"
                                    />
                                </div>

                                {/* IMAGE */}

                                <div className="space-y-2">
                                    <Label>
                                        URL de imagen
                                    </Label>

                                    <Input
                                        value={image}
                                        onChange={(e) =>
                                            setImage(
                                                e.target
                                                    .value,
                                            )
                                        }
                                        placeholder="https://..."
                                    />
                                </div>

                                {/* DESCRIPTION */}

                                <div className="space-y-2">
                                    <Label>
                                        Descripción
                                    </Label>

                                    <textarea
                                        value={
                                            description
                                        }
                                        onChange={(e) =>
                                            setDescription(
                                                e.target
                                                    .value,
                                            )
                                        }
                                        rows={5}
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-input
                                            bg-background
                                            px-3
                                            py-3
                                            text-sm
                                            outline-none
                                        "
                                        placeholder="Describe el beneficio..."
                                    />
                                </div>

                                <Button
                                    onClick={
                                        handleCreate
                                    }
                                    disabled={
                                        loading
                                    }
                                    className="h-12 w-full text-base"
                                >
                                    {loading ? (
                                        <>
                                            <ArrowPathIcon className="mr-2 h-5 w-5 animate-spin" />
                                            Creando...
                                        </>
                                    ) : (
                                        'Crear beneficio'
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SIDEBAR */}

                    <div className="space-y-6">
                        {/* PREVIEW */}

                        <Card>
                            <CardContent className="p-0">
                                <div className="aspect-video overflow-hidden bg-muted">
                                    {image ? (
                                        <img
                                            src={
                                                image
                                            }
                                            alt={
                                                title
                                            }
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <PhotoIcon className="h-10 w-10 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                type ===
                                                'chips'
                                                    ? 'bg-emerald-500/10 text-emerald-500'
                                                    : 'bg-blue-500/10 text-blue-500'
                                            }`}
                                        >
                                            {type ===
                                            'chips'
                                                ? 'Fichas'
                                                : 'Recarga'}
                                        </span>

                                        <span className="font-bold">
                                            {cost ||
                                                0}{' '}
                                            pts
                                        </span>
                                    </div>

                                    <h3 className="font-semibold">
                                        {title ||
                                            'Título del beneficio'}
                                    </h3>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {description ||
                                            'La descripción aparecerá aquí.'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* INFO */}

                        <Card>
                            <CardContent className="space-y-4 p-6">
                                <div className="flex items-center gap-2">
                                    <TrophyIcon className="h-5 w-5 text-primary" />

                                    <h3 className="font-semibold">
                                        Recomendaciones
                                    </h3>
                                </div>

                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <p>
                                        • Utilizá imágenes
                                        claras y de buena
                                        calidad.
                                    </p>

                                    <p>
                                        • Mantené títulos
                                        cortos y fáciles
                                        de entender.
                                    </p>

                                    <p>
                                        • Indicá
                                        correctamente el
                                        costo en puntos.
                                    </p>

                                    <p>
                                        • Verificá toda la
                                        información antes
                                        de publicar.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    )
}