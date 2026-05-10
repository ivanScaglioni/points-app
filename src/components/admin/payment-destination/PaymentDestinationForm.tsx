type Props = {
    onSubmit: (data: {
        alias: string
        owner_name?: string
    }) => void

    loading?: boolean
}

export function PaymentDestinationForm({
    onSubmit,
    loading,
}: Props) {
    return (
        <form
            className="space-y-4"
            onSubmit={(e) => {
                e.preventDefault()

                const formData = new FormData(
                    e.target as HTMLFormElement
                )

                onSubmit({
                    alias: formData.get(
                        'alias'
                    ) as string,

                    owner_name: formData.get(
                        'owner_name'
                    ) as string,
                })
            }}
        >
            <input
                name="alias"
                placeholder="Alias"
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3"
                required
            />

            <input
                name="owner_name"
                placeholder="Titular"
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3"
            />

            <button
                disabled={loading}
                className="w-full rounded-lg bg-white/10 p-3 font-semibold hover:bg-white/20"
                type="submit"
            >
                {loading
                    ? 'Creando...'
                    : 'Crear Alias'}
            </button>
        </form>
    )
}