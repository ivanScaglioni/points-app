import {
    createFileRoute,
    useRouter,
} from '@tanstack/react-router'

import {
    ExclamationTriangleIcon,
    ArrowLeftIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'

import { Button } from '~/components/ui/Button'

export const Route =
    createFileRoute('/error')({
        validateSearch: (
            search: Record<string, unknown>,
        ) => ({
            title:
                (search.title as string) ??
                'Ocurrió un error',

            message:
                (search.message as string) ??
                'No pudimos completar la operación.',
        }),

        component: ErrorPage,
    })

function ErrorPage() {
    const router = useRouter()

    const {
        title,
        message,
    } = Route.useSearch()

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-lg">
                <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
                    <div className="flex justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                            <ExclamationTriangleIcon className="h-10 w-10" />
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {title}
                        </h1>

                        <p className="mt-3 text-muted-foreground">
                            {message}
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() =>
                                router.history.back()
                            }
                        >
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Volver
                        </Button>

                        <Button
                            className="flex-1"
                            onClick={() =>
                                router.navigate({
                                    to: '/dashboard',
                                })
                            }
                        >
                            <HomeIcon className="mr-2 h-4 w-4" />
                            Ir al inicio
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}