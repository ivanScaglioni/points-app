// src/routes/_authed/admin/casinos/index.tsx

import {
    createFileRoute,
    Link,
    useRouter,
} from '@tanstack/react-router'

import {
    BuildingOffice2Icon,
    PlusIcon,
    EyeSlashIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline'

import { getCasinos } from '~/server/getCasinos'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

import { Button } from '~/components/ui/Button'

import { useMutation } from '~/hooks/useMutation'

import {
    toggleCasinoStatus,
} from '~/server/toggleCasinoStatus'

export const Route =
    createFileRoute(
        '/_authed/admin/casinos/',
    )({
        loader: async () => {
            return await getCasinos()
        },

        component: CasinosPage,
    })

function CasinosPage() {
    const casinos =
        Route.useLoaderData()

    const router = useRouter()

    const toggleMutation =
        useMutation({
            fn: toggleCasinoStatus,

            onSuccess: async () => {
                await router.invalidate()
            },
        })

    const activeCasinos =
        casinos.filter(
            (c) => c.active,
        ).length

    return (
        <main className="min-h-screen bg-background">
            {/* HERO */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <BuildingOffice2Icon className="h-4 w-4" />

                                Casinos
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">
                                    Gestión de casinos
                                </h1>

                                <p className="mt-2 max-w-2xl text-muted-foreground">
                                    Administrá casinos,
                                    activá o desactivá
                                    operadores y mantené
                                    organizada la plataforma.
                                </p>
                            </div>
                        </div>

                        <Button asChild>
                            <Link to="/admin/casinos/new">
                                <PlusIcon className="h-5 w-5" />

                                Nuevo casino
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                {/* STATS */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Total casinos
                                </p>

                                <h2 className="text-4xl font-bold tracking-tight">
                                    {casinos.length}
                                </h2>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-emerald-500/20 bg-emerald-500/5">
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Casinos activos
                                </p>

                                <h2 className="text-4xl font-bold tracking-tight text-emerald-400">
                                    {activeCasinos}
                                </h2>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* EMPTY */}
                {casinos.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <BuildingOffice2Icon className="h-14 w-14 text-muted-foreground/40" />

                            <h3 className="mt-5 text-xl font-semibold">
                                No hay casinos
                            </h3>

                            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                                Creá el primer casino
                                para comenzar a procesar
                                recargas.
                            </p>

                            <Button
                                asChild
                                className="mt-6"
                            >
                                <Link to="/admin/casinos/new">
                                    Crear casino
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {casinos.map((casino) => (
                            <Card
                                key={casino.id}
                                className="transition-all hover:-translate-y-1 hover:border-primary/20"
                            >
                                <CardContent className="flex h-full flex-col p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                <BuildingOffice2Icon className="h-7 w-7" />
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-semibold tracking-tight">
                                                    {casino.name}
                                                </h2>

                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    Creado el{' '}
                                                    {new Date(
                                                        casino.created_at,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* STATUS */}
                                        <div
                                            className={
                                                casino.active
                                                    ? 'rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400'
                                                    : 'rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground'
                                            }
                                        >
                                            {casino.active
                                                ? 'Activo'
                                                : 'Inactivo'}
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-3">
                                        <Button
                                            variant={
                                                casino.active
                                                    ? 'destructive'
                                                    : 'default'
                                            }
                                            fullWidth
                                            disabled={
                                                toggleMutation.status ===
                                                'pending'
                                            }
                                            onClick={() => {
                                                toggleMutation.mutate(
                                                    {
                                                        data: {
                                                            casinoId:
                                                                casino.id,

                                                            active:
                                                                !casino.active,
                                                        },
                                                    },
                                                )
                                            }}
                                        >
                                            {casino.active ? (
                                                <>
                                                    <EyeSlashIcon className="h-4 w-4" />

                                                    Desactivar
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircleIcon className="h-4 w-4" />

                                                    Activar
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}