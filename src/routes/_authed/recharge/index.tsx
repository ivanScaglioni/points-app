// src/routes/_authed/recharge/index.tsx

import {
    createFileRoute,
    useRouter,
} from '@tanstack/react-router'

import {
    BuildingStorefrontIcon,
    BanknotesIcon,
    UserIcon,
    CreditCardIcon,
    GiftIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline'

import { useMutation } from '~/hooks/useMutation'

import { createRecharge } from '~/server/createRecharge'

import { getRechargeFormData } from '~/server/getRechargeFormData'

import { Button } from '~/components/ui/Button'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

import { Input } from '~/components/ui/Input'

import { Label } from '~/components/ui/Label'

export const Route =
    createFileRoute(
        '/_authed/recharge/',
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

        loader: async ({ deps }) => {
            return await getRechargeFormData(
                {
                    data: {
                        rewardId:
                            deps.rewardId,
                    },
                },
            )
        },

        component: RechargePage,
    })

function RechargePage() {
    const router = useRouter()

    const data =
        Route.useLoaderData()

    const mutation = useMutation({
        fn: createRecharge,

        onSuccess: async () => {
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
                            <div className="h-2 w-2 rounded-full bg-primary" />

                            Nueva recarga
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                Crear recharge
                            </h1>

                            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                Completá los datos de la
                                transferencia para que un
                                operador procese tu
                                recarga.
                            </p>
                        </div>

                        {/* POINTS */}
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
                                    Datos de la recarga
                                </h2>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Verificá correctamente
                                    los datos antes de
                                    enviar la solicitud.
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
                                            casino_id:
                                                formData.get(
                                                    'casino_id',
                                                ) as string,

                                            destination_id:
                                                formData.get(
                                                    'destination_id',
                                                ) as string,

                                            casino_username:
                                                formData.get(
                                                    'casino_username',
                                                ) as string,

                                            amount: Number(
                                                formData.get(
                                                    'amount',
                                                ),
                                            ),

                                            transaction_id:
                                                formData.get(
                                                    'transaction_id',
                                                ) as string,

                                            reward_id:
                                                data.reward
                                                    ?.id,
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
                                                Seleccionar
                                                casino
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

                                {/* DESTINATION */}
                                <div className="space-y-2">
                                    <Label>
                                        Alias / destino
                                    </Label>

                                    <div className="relative">
                                        <BanknotesIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                        <select
                                            name="destination_id"
                                            required
                                            className="flex h-11 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                                        >
                                            <option value="">
                                                Seleccionar
                                                alias
                                            </option>

                                            {data.destinations.map(
                                                (
                                                    destination,
                                                ) => (
                                                    <option
                                                        key={
                                                            destination.id
                                                        }
                                                        value={
                                                            destination.id
                                                        }
                                                    >
                                                        {
                                                            destination.alias
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
                                        Usuario del casino
                                    </Label>

                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                        <Input
                                            name="casino_username"
                                            placeholder="Ej: juan123"
                                            required
                                            className="pl-11"
                                        />
                                    </div>
                                </div>

                                {/* AMOUNT */}
                                <div className="space-y-2">
                                    <Label>
                                        Monto
                                    </Label>

                                    <div className="relative">
                                        <BanknotesIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                        <Input
                                            type="number"
                                            name="amount"
                                            placeholder="Ej: 10000"
                                            required
                                            className="pl-11"
                                        />
                                    </div>
                                </div>

                                {/* TRANSACTION */}
                                <div className="space-y-2">
                                    <Label>
                                        Número de
                                        transacción
                                    </Label>

                                    <div className="relative">
                                        <CreditCardIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                        <Input
                                            name="transaction_id"
                                            placeholder="Ej: 123456789"
                                            required
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
                                        'Crear recharge'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* SIDEBAR */}
                    <div className="space-y-6">
                        {/* REWARD */}
                        {data.reward && (
                            <Card className="border-green-500/20 bg-green-500/5">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                                            <GiftIcon className="h-6 w-6" />
                                        </div>

                                        <div className="space-y-2">
                                            <div>
                                                <h3 className="font-semibold">
                                                    Reward
                                                    seleccionado
                                                </h3>

                                                <p className="text-sm text-muted-foreground">
                                                    {
                                                        data.reward
                                                            .title
                                                    }
                                                </p>
                                            </div>

                                            <div className="inline-flex rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                                                {
                                                    data.reward
                                                        .cost
                                                }{' '}
                                                pts
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* INFO */}
                        <Card>
                            <CardContent className="space-y-4 p-6">
                                <h3 className="font-semibold">
                                    Información
                                </h3>

                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <p>
                                        • Un operador
                                        validará tu
                                        transferencia.
                                    </p>

                                    <p>
                                        • Las recargas
                                        pueden demorar
                                        algunos minutos.
                                    </p>

                                    <p>
                                        • Los puntos se
                                        acreditan
                                        automáticamente.
                                    </p>

                                    <p>
                                        • Verificá que el
                                        número de
                                        transacción sea
                                        correcto.
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