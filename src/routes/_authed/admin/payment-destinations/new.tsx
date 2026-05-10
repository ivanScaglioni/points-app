import {
    createFileRoute,
    useRouter,
    Link,
} from '@tanstack/react-router'

import { useMutation } from '../../../../hooks/useMutation'
import { createPaymentDestination } from '../../../../server/createPaymentDestination'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

import { Button } from '~/components/ui/Button'

import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline'

import { PaymentDestinationForm } from '../../../../components/admin/payment-destination/PaymentDestinationForm'

export const Route = createFileRoute(
    '/_authed/admin/payment-destinations/new',
)({
    component: Page,
})

function Page() {
    const router = useRouter()

    const mutation = useMutation({
        fn: createPaymentDestination,

        onSuccess: async () => {
            router.navigate({
                to: '/admin/payment-destinations',
            })
        },
    })

    return (
        <main className="min-h-screen bg-background">
            {/* HERO */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="text-primary">●</span>
                                Admin / Payment destinations
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight">
                                Nuevo alias de cobro
                            </h1>

                            <p className="text-muted-foreground">
                                Creá una nueva cuenta o alias para recibir pagos dentro del sistema.
                            </p>
                        </div>

                        <Button asChild variant="ghost">
                            <Link to="/admin/payment-destinations">
                                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                Volver
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        {/* FORM HEADER */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <PlusIcon className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">
                                    Crear alias
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Completá los datos del destino de pago
                                </p>
                            </div>
                        </div>

                        {/* FORM */}
                        <PaymentDestinationForm
                            loading={mutation.status === 'pending'}
                            onSubmit={(data) => {
                                mutation.mutate({
                                    data,
                                })
                            }}
                        />

                        {/* ERROR STATE (opcional si tu mutation lo soporta) */}

                    </CardContent>
                </Card>
            </section>
        </main>
    )
}