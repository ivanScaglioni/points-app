// ejemplo actualizado para CasinoForm.tsx

import { useState } from 'react'

import { Button } from '~/components/ui/Button'

import { Input } from '~/components/ui/Input'

import { Label } from '~/components/ui/Label'

type Props = {
    loading?: boolean

    onSubmit: (data: {
        name: string
    }) => void
}

export function CasinoForm({
    loading,
    onSubmit,
}: Props) {
    const [name, setName] =
        useState('')

    return (
        <form
            className="space-y-6"
            onSubmit={(e) => {
                e.preventDefault()

                onSubmit({
                    name,
                })
            }}
        >
            <div className="space-y-2">
                <Label>
                    Nombre del casino
                </Label>

                <Input
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value,
                        )
                    }
                    placeholder="Ej: Bet365"
                    required
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading
                    ? 'Creando...'
                    : 'Crear casino'}
            </Button>
        </form>
    )
}