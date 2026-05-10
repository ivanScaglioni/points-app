import type React from 'react'

export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
  forgotPassword,
}: {
  actionText: string

  onSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void

  status:
  | 'pending'
  | 'idle'
  | 'success'
  | 'error'

  afterSubmit?: React.ReactNode

  forgotPassword?: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-black px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <img
          alt="Logo"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />

        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          {actionText}
        </h2>

      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e)
          }}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>
            <label className="block text-sm font-medium text-gray-100">
              Email
            </label>

            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
            />
          </div>

          {/* PASSWORD */}

          <div>

            <div className="flex items-center justify-between">

              <label className="block text-sm font-medium text-gray-100">
                Contraseña
              </label>

              {forgotPassword && (
                <div className="text-sm">
                  {forgotPassword}
                </div>
              )}

            </div>

            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
            />

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={status === 'pending'}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50"
          >
            {status === 'pending'
              ? 'Cargando...'
              : actionText}
          </button>

          {/* AFTER */}

          {afterSubmit && (
            <div className="text-center text-sm">
              {afterSubmit}
            </div>
          )}

        </form>

      </div>

    </div>
  )
}