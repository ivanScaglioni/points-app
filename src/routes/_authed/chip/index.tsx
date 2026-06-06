// src/routes/_authed/chip/index.tsx

import {
    createFileRoute,
    useRouter,
    redirect,
} from '@tanstack/react-router'

import {
    BuildingStorefrontIcon,
    UserIcon,
    GiftIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline'

import { useMutation } from '~/hooks/useMutation'

import { createChip } from '~/server/chip/createChip'

import { getChipFormData } from '~/server/chip/getChipFormData'

import { Button } from '~/components/ui/Button'


import {
    Card,
    CardContent,
} from '~/components/ui/Card'

import { Input } from '~/components/ui/Input'

import { Label } from '~/components/ui/Label'

export const Route =
    createFileRoute(
        '/_authed/chip/',
    )({
        validateSearch: (
            search: Record<
                string,
                unknown
            >,
        ) => ({
            rewardId:
                search.rewardId as
                | string
                | undefined,
        }),

        loaderDeps: ({
            search,
        }) => ({
            rewardId:
                search.rewardId,
        }),

        loader: async ({
            deps,
        }) => {
            try {
                return await getChipFormData({
                    data: {
                        rewardId:
                            deps.rewardId,
                    },
                })
            } catch (error: any) {
                throw redirect({
                    to: '/error',
                    search: {
                        title: 'No se pudo continuar',
                        message:
                            error?.message ??
                            'Ocurrió un error inesperado.',
                    },
                })
            }
        },

        component: ChipPage,
    })

function ChipPage() {
    const router = useRouter()

    const data =
        Route.useLoaderData()

    const mutation =
        useMutation({
            fn: createChip,

            onSuccess:
                async () => {
                    router.navigate({
                        to: '/dashboard',
                    })
                },
        })

    return (
        <main className="min-h-screen bg-background">
            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_40%)]" />

                <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="relative z-10 space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <GiftIcon className="h-4 w-4" />

                            Solicitud de chips
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                Solicitar chips
                            </h1>

                            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                Completá los datos para
                                solicitar tu beneficio
                                de chips.
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
                            <GiftIcon className="h-5 w-5 text-primary" />

                            <span className="text-sm text-muted-foreground">
                                Tus puntos:
                            </span>

                            <span className="font-semibold">
                                {
                                    data.currentPoints
                                }{' '}
                                pts
                            </span>
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
                                    Datos del casino
                                </h2>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Ingresá el casino y
                                    tu usuario para que
                                    un operador procese
                                    la solicitud.
                                </p>
                            </div>

                            <form
                                className="space-y-6"
                                onSubmit={(e) => {
                                    e.preventDefault()

                                    const formData =
                                        new FormData(
                                            e.target as HTMLFormElement,
                                        )

                                    mutation.mutate({
                                        data: {
                                            reward_id:
                                                data.reward.id,

                                            casino_id:
                                                formData.get(
                                                    'casino_id',
                                                ) as string,

                                            casino_username:
                                                formData.get(
                                                    'casino_username',
                                                ) as string,
                                        },
                                    })
                                }}
                            >
                                {/* CASINO */}
                                <div className="space-y-2">
                                    <Label>
                                        Casino
                                    </Label>

                                    <div className="relative">
                                        <BuildingStorefrontIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                        <select
                                            name="casino_id"
                                            required
                                            className="flex h-11 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                                        >
                                            <option value="">
                                                Seleccionar casino
                                            </option>

                                            {data.casinos.map(
                                                (
                                                    casino,
                                                ) => (
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
                                                ),
                                            )}
                                        </select>
                                    </div>
                                </div>

                                {/* USERNAME */}
                                <div className="space-y-2">
                                    <Label>
                                        Usuario casino
                                    </Label>

                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                        <Input
                                            name="casino_username"
                                            required
                                            placeholder="Ej: juan123"
                                            className="pl-11"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={
                                        mutation.status ===
                                        'pending'
                                    }
                                    className="h-12 w-full text-base"
                                >
                                    {mutation.status ===
                                        'pending' ? (
                                        <>
                                            <ArrowPathIcon className="mr-2 h-5 w-5 animate-spin" />

                                            Enviando...
                                        </>
                                    ) : (
                                        'Solicitar chips'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* SIDEBAR */}
                    <div className="space-y-6">
                        <Card className="border-green-500/20 bg-green-500/5">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                                        <GiftIcon className="h-6 w-6" />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-semibold">
                                            Reward seleccionada
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {
                                                data
                                                    .reward
                                                    .title
                                            }
                                        </p>

                                        <div className="inline-flex rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                                            {
                                                data
                                                    .reward
                                                    .cost
                                            }{' '}
                                            pts
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="space-y-4 p-6">
                                <h3 className="font-semibold">
                                    Información
                                </h3>

                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <p>
                                        • Un operador
                                        revisará la
                                        solicitud.
                                    </p>

                                    <p>
                                        • Los chips serán
                                        acreditados en tu
                                        usuario del casino.
                                    </p>

                                    <p>
                                        • Verificá que tu
                                        usuario casino sea
                                        correcto.
                                    </p>

                                    <p>
                                        • Los puntos se
                                        descuentan al
                                        crear la solicitud.
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