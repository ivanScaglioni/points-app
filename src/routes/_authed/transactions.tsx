// src/routes/_authed/transactions.tsx

import { createFileRoute, Link } from '@tanstack/react-router'
import { getMyTransactions } from '../../server/getMyTransactions'
import { useRouter } from '@tanstack/react-router'
import { TransactionItem } from '~/components/ui/TransactionItem'



const PAGE_SIZE = 10

export const Route = createFileRoute('/_authed/transactions')({
    validateSearch: (search: Record<string, unknown>) => {
        return {
            page: Number(search.page ?? 0),
        }
    },

    loaderDeps: ({ search }) => ({
        page: search.page ?? 0,
    }),

    loader: async ({ deps }) => {
        return await getMyTransactions({
            data: {
                page: deps.page,
                pageSize: PAGE_SIZE,
            },
        })
    },

    component: TransactionsPage,
})

function TransactionsPage() {
    const router = useRouter()
    const { page } = Route.useSearch()
    const { transactions, total } = Route.useLoaderData()

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

    const goToPage = (newPage: number) => {
        router.navigate({
            to: '/transactions',
            search: {
                page: newPage,
            },
        })
    }

    return (
        <div className="min-h-screen bg-background p-6 text-foreground">
            <div className="mx-auto max-w-4xl space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Historial de puntos
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Todos tus movimientos
                        </p>
                    </div>

                    <Link
                        to="/dashboard"
                        className="rounded-xl border border-border bg-card px-4 py-2 transition hover:bg-accent"
                    >
                        Volver
                    </Link>
                </div>



                {/* LIST */}
                <div className="rounded-3xl border border-border bg-card p-6">

                    {transactions.length === 0 ? (
                        <div className="py-10 text-center text-muted-foreground">
                            No hay movimientos
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {transactions.map((tx) => {
                                const reward = Array.isArray(tx.reward)
                                    ? tx.reward[0]
                                    : tx.reward

                                return (
                                    <TransactionItem
                                        key={tx.id}
                                        description={tx.description}
                                        amount={tx.amount}
                                        type={tx.type}
                                        createdAt={tx.created_at}
                                        reward={reward}
                                        variant="full"
                                    />
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* PAGINATION */}
                <div className="flex items-center justify-between">

                    <button
                        onClick={() => goToPage(Math.max(page - 1, 0))}
                        disabled={page === 0}
                        className="rounded-xl border border-border bg-card px-4 py-2 transition hover:bg-accent disabled:opacity-40"
                    >
                        Anterior
                    </button>

                    <div className="text-sm text-muted-foreground">
                        Página {page + 1} de {totalPages}
                    </div>

                    <button
                        onClick={() =>
                            goToPage(
                                page + 1 < totalPages
                                    ? page + 1
                                    : page
                            )
                        }
                        disabled={page + 1 >= totalPages}
                        className="rounded-xl border border-border bg-card px-4 py-2 transition hover:bg-accent disabled:opacity-40"
                    >
                        Siguiente
                    </button>

                </div>

            </div>
        </div>
    )
}