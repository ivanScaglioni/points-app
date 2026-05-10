// src/routes/_authed/admin/user/give-points.tsx

import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { givePoints } from '../../../../server/givePoints'
import { searchUsers, type SearchUser } from '../../../../server/searchUsers'

export const Route = createFileRoute(
    '/_authed/admin/user/give-points'
)({
    component: GivePointsPage,
})

function GivePointsPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchUser[]>([])
    const [selectedUser, setSelectedUser] = useState<SearchUser | null>(null)

    const [amount, setAmount] = useState<number>(0)

    const [loadingSearch, setLoadingSearch] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const [message, setMessage] = useState<string | null>(null)

    // 🔍 búsqueda manual SOLO
    const handleSearch = async () => {
        if (query.trim().length < 3) {
            setResults([])
            setMessage('Escribí al menos 3 caracteres')
            return
        }

        setLoadingSearch(true)
        setMessage(null)

        try {
            const res = await searchUsers({ data: query })

            setResults(Array.isArray(res) ? res : [])
            setSelectedUser(null)
        } finally {
            setLoadingSearch(false)
        }
    }

    // 💰 asignar puntos
    const handleSubmit = async () => {
        if (!selectedUser) {
            setMessage('Seleccioná un usuario')
            return
        }

        if (!amount || amount <= 0) {
            setMessage('Ingresá un monto válido')
            return
        }

        try {
            setLoadingSubmit(true)
            setMessage(null)

            await givePoints({
                data: {
                    userId: selectedUser.id,
                    amount,
                    description: 'Recarga manual',
                },
            })

            setMessage('✅ Puntos asignados correctamente')

            setAmount(0)
        } catch (err: any) {
            setMessage(err.message ?? 'Error inesperado')
        } finally {
            setLoadingSubmit(false)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex justify-center p-6">
            <div className="w-full max-w-md space-y-6">

                <h1 className="text-xl font-bold">
                    Asignar puntos
                </h1>

                {/* SEARCH */}
                <div className="flex gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 rounded border border-border bg-card p-2"
                        placeholder="Buscar usuario..."
                    />

                    <button
                        onClick={handleSearch}
                        disabled={loadingSearch}
                        className="rounded bg-primary px-3 text-primary-foreground"
                    >
                        {loadingSearch ? '...' : 'Buscar'}
                    </button>
                </div>

                {/* RESULTS */}
                <div className="space-y-2">
                    {results.map((u) => (
                        <div
                            key={u.id}
                            onClick={() => setSelectedUser(u)}
                            className={`cursor-pointer rounded p-2 border transition ${selectedUser?.id === u.id
                                    ? 'bg-primary/20 border-primary'
                                    : 'bg-card border-border'
                                }`}
                        >
                            {u.email}
                        </div>
                    ))}
                </div>

                {/* FORM */}
                {selectedUser && (
                    <div className="space-y-3 rounded border border-border bg-card p-4">

                        <p className="text-sm">
                            Usuario: <strong>{selectedUser.email}</strong>
                        </p>

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full rounded border border-border bg-background p-2"
                            placeholder="Cantidad de puntos"
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={loadingSubmit}
                            className="w-full rounded bg-primary py-2 text-primary-foreground"
                        >
                            {loadingSubmit ? 'Asignando...' : 'Asignar puntos'}
                        </button>

                        {message && (
                            <p className="text-sm text-muted-foreground">
                                {message}
                            </p>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}