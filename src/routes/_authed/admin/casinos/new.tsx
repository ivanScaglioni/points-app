// src/routes/_authed/admin/casinos/new.tsx

import {
    createFileRoute,
    useRouter,
} from '@tanstack/react-router'

import {
    BuildingOffice2Icon,
} from '@heroicons/react/24/outline'

import { CasinoForm } from '~/components/admin/casino/CasinoForm'

import { useMutation } from '~/hooks/useMutation'

import { createCasino } from '~/server/casino/createCasino'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

export const Route =
    createFileRoute(
        '/_authed/admin/casinos/new',
    )({
        component: NewCasinoPage,
    })

function NewCasinoPage() {
    const router = useRouter()

    const mutation = useMutation({
        fn: createCasino,

        onSuccess: async () => {
            router.navigate({
                to: '/admin/casinos',
            })
        },
    })

    return (
        <main className="min-h-screen bg-background">
            <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {/* HEADER */}
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <BuildingOffice2Icon className="h-4 w-4" />

                            Nuevo casino
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">
                                Crear casino
                            </h1>

                            <p className="mt-2 text-muted-foreground">
                                Agregá un nuevo casino
                                disponible para recargas.
                            </p>
                        </div>
                    </div>

                    {/* FORM */}
                    <Card>
                        <CardContent className="p-8">
                            <CasinoForm
                                loading={
                                    mutation.status ===
                                    'pending'
                                }
                                onSubmit={(data) => {
                                    mutation.mutate({
                                        data,
                                    })
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    )
}