// src/routes/_authed/admin/user/index.tsx

import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import {
    UserIcon,
    MagnifyingGlassIcon,
    ShieldCheckIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

import {
    searchUsers,
    type SearchUser,
} from '~/server/searchUsers'

import { givePoints } from '~/server/givePoints'

import { updateUserRole } from '~/server/updateUserRole'

import { Button } from '~/components/ui/Button'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

import { Input } from '~/components/ui/Input'

export const Route =
    createFileRoute(
        '/_authed/admin/user/',
    )({
        component: AdminUsersPage,
    })

function AdminUsersPage() {
    const [query, setQuery] =
        useState('')

    const [results, setResults] =
        useState<SearchUser[]>([])

    const [
        selectedUser,
        setSelectedUser,
    ] =
        useState<SearchUser | null>(
            null,
        )

    const [amount, setAmount] =
        useState(0)

    const [
        loadingSearch,
        setLoadingSearch,
    ] = useState(false)

    const [
        loadingPoints,
        setLoadingPoints,
    ] = useState(false)

    const [
        loadingRole,
        setLoadingRole,
    ] = useState(false)

    const [message, setMessage] =
        useState<string | null>(
            null,
        )

    const handleSearch =
        async () => {
            if (
                query.trim().length <
                3
            ) {
                setMessage(
                    'Ingresá al menos 3 caracteres',
                )

                return
            }

            try {
                setLoadingSearch(
                    true,
                )

                setMessage(null)

                const users =
                    await searchUsers(
                        {
                            data: query,
                        },
                    )

                setResults(
                    Array.isArray(
                        users,
                    )
                        ? users
                        : [],
                )

                setSelectedUser(
                    null,
                )
            } finally {
                setLoadingSearch(
                    false,
                )
            }
        }

    const handleGivePoints =
        async () => {
            if (
                !selectedUser
            )
                return



            try {
                setLoadingPoints(
                    true,
                )

                await givePoints({
                    data: {
                        userId:
                            selectedUser.id,

                        amount,

                        description:
                            'Asignación manual',
                    },
                })

                setMessage(
                    '✅ Puntos asignados correctamente',
                )

                setAmount(0)
            } catch (
            err: any
            ) {
                setMessage(
                    err.message,
                )
            } finally {
                setLoadingPoints(
                    false,
                )
            }
        }

    const handleRole = async () => {
        if (!selectedUser) return

        try {
            setLoadingRole(true)

            const newRole =
                selectedUser.role ===
                    'worker'
                    ? 'user'
                    : 'worker'

            await updateUserRole({
                data: {
                    userId:
                        selectedUser.id,

                    role: newRole,
                },
            })

            setSelectedUser({
                ...selectedUser,
                role: newRole,
            })

            setResults((prev) =>
                prev.map((user) =>
                    user.id ===
                        selectedUser.id
                        ? {
                            ...user,
                            role: newRole,
                        }
                        : user,
                ),
            )

            setMessage(
                newRole === 'worker'
                    ? '✅ Operador asignado'
                    : '✅ Operador removido',
            )
        } catch (err: any) {
            setMessage(
                err.message ??
                'Error inesperado',
            )
        } finally {
            setLoadingRole(false)
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <section className="border-b border-border">
                <div className="mx-auto max-w-5xl px-4 py-10">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <UserIcon className="h-4 w-4" />
                            Usuarios
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight">
                            Gestión de usuarios
                        </h1>

                        <p className="text-muted-foreground">
                            Buscar usuarios,
                            asignar puntos y
                            administrar
                            operadores.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-5xl space-y-6 px-4 py-10">
                {/* SEARCH */}

                <Card>
                    <CardContent className="p-6">
                        <div className="flex gap-3">
                            <Input
                                value={
                                    query
                                }
                                onChange={(
                                    e,
                                ) =>
                                    setQuery(
                                        e
                                            .target
                                            .value,
                                    )
                                }
                                placeholder="Buscar usuario por email..."
                            />

                            <Button
                                onClick={
                                    handleSearch
                                }
                                disabled={
                                    loadingSearch
                                }
                            >
                                <MagnifyingGlassIcon className="h-4 w-4" />

                                {loadingSearch
                                    ? 'Buscando...'
                                    : 'Buscar'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* RESULTS */}

                {results.length >
                    0 && (
                        <Card>
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    {results.map(
                                        (
                                            user,
                                        ) => (
                                            <button
                                                key={
                                                    user.id
                                                }
                                                onClick={() =>
                                                    setSelectedUser(
                                                        user,
                                                    )
                                                }
                                                className={`w-full rounded-xl border p-3 text-left transition ${selectedUser?.id ===
                                                        user.id
                                                        ? 'border-primary bg-primary/10'
                                                        : 'border-border'
                                                    }`}
                                            >
                                                <div className="font-medium">
                                                    {
                                                        user.email
                                                    }
                                                </div>

                                                <div className="text-xs text-muted-foreground">
                                                    Rol:{' '}
                                                    {
                                                        user.role
                                                    }
                                                </div>
                                            </button>
                                        ),
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                {/* USER */}

                {selectedUser && (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* ROLE */}

                        <Card>
                            <CardContent className="space-y-4 p-6">
                                <div className="flex items-center gap-2">
                                    <ShieldCheckIcon className="h-5 w-5 text-primary" />

                                    <h2 className="font-semibold">
                                        Permisos
                                    </h2>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Usuario
                                    </p>

                                    <p className="font-medium">
                                        {
                                            selectedUser.email
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Rol actual
                                    </p>

                                    <p className="font-semibold capitalize">
                                        {
                                            selectedUser.role
                                        }
                                    </p>
                                </div>

                                {selectedUser.role !==
                                    'admin' && (
                                        <Button
                                            onClick={
                                                handleRole
                                            }
                                            disabled={
                                                loadingRole
                                            }
                                            className="w-full"
                                        >
                                            {loadingRole
                                                ? 'Procesando...'
                                                : selectedUser.role ===
                                                    'worker'
                                                    ? 'Quitar operador'
                                                    : 'Convertir en operador'}
                                        </Button>
                                    )}
                            </CardContent>
                        </Card>

                        {/* POINTS */}

                        <Card>
                            <CardContent className="space-y-4 p-6">
                                <div className="flex items-center gap-2">
                                    <CurrencyDollarIcon className="h-5 w-5 text-primary" />

                                    <h2 className="font-semibold">
                                        Asignar puntos
                                    </h2>
                                </div>

                                <Input
                                    type="number"
                                    value={
                                        amount
                                    }
                                    onChange={(
                                        e,
                                    ) =>
                                        setAmount(
                                            Number(
                                                e
                                                    .target
                                                    .value,
                                            ),
                                        )
                                    }
                                    placeholder="Cantidad"
                                />

                                <Button
                                    onClick={
                                        handleGivePoints
                                    }
                                    disabled={
                                        loadingPoints
                                    }
                                    className="w-full"
                                >
                                    {loadingPoints
                                        ? 'Asignando...'
                                        : 'Asignar puntos'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {message && (
                    <Card>
                        <CardContent className="p-4 text-sm">
                            {message}
                        </CardContent>
                    </Card>
                )}
            </section>
        </main>
    )
}