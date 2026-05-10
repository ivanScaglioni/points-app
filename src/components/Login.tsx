import {
  Link,
  useRouter,
} from '@tanstack/react-router'

import { useState } from 'react'

import { loginFn } from '~/routes/_authed'

import { useMutation } from '~/hooks/useMutation'

import { resetPassword } from '~/utils/supabase.client'

import { Button } from '~/components/ui/Button'

import { Input } from '~/components/ui/Input'

import { Label } from '~/components/ui/Label'

import { Modal } from '~/components/ui/Modal'

import { AuthCard } from '~/components/ui/AuthCard'

export function Login() {
  const router = useRouter()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [showReset, setShowReset] =
    useState(false)

  const [resetEmail, setResetEmail] =
    useState('')

  const [resetSent, setResetSent] =
    useState(false)

  const [resetLoading, setResetLoading] =
    useState(false)

  const loginMutation = useMutation({
    fn: loginFn,

    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate()

        router.navigate({
          to: '/dashboard',
        })
      }
    },
  })

  async function handleResetPassword() {
    try {
      setResetLoading(true)

      const { error } = await resetPassword(resetEmail)

      if (!error) {
        setResetSent(true)
      }
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <>
      {/* PAGE */}
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_35%)]" />

        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <AuthCard
          title="Bienvenido"
          description="Ingresá a tu cuenta para administrar tus puntos y recompensas."
        >
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault()

              loginMutation.mutate({
                data: {
                  email,
                  password,
                },
              })
            }}
          >
            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value,
                  )
                }
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>
                  Contraseña
                </Label>

                <button
                  type="button"
                  onClick={() =>
                    setShowReset(true)
                  }
                  className="text-sm font-medium text-primary transition hover:opacity-80"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value,
                  )
                }
                required
              />
            </div>

            {/* ERROR */}
            {loginMutation.data
              ?.error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                  {
                    loginMutation
                      .data.message
                  }
                </div>
              )}

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full"
              disabled={
                loginMutation.status ===
                'pending'
              }
            >
              {loginMutation.status ===
                'pending'
                ? 'Ingresando...'
                : 'Acceder'}
            </Button>

            {/* SIGNUP */}
            <div className="pt-2 text-center text-sm text-muted-foreground">
              ¿No tenés cuenta?{' '}
              <Link
                to="/signup"
                className="font-medium text-primary transition hover:opacity-80"
              >
                Crear cuenta
              </Link>
            </div>
          </form>
        </AuthCard>
      </main>

      {/* RESET PASSWORD */}
      <Modal
        open={showReset}
        onClose={() => {
          setShowReset(false)

          setResetSent(false)

          setResetEmail('')
        }}
      >
        {!resetSent ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Recuperar contraseña
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Te enviaremos un enlace para
                restablecer tu contraseña.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                value={resetEmail}
                onChange={(e) =>
                  setResetEmail(
                    e.target.value,
                  )
                }
                placeholder="tu@email.com"
              />
            </div>

            <Button
              onClick={
                handleResetPassword
              }
              disabled={resetLoading}
              className="w-full"
            >
              {resetLoading
                ? 'Enviando...'
                : 'Enviar email'}
            </Button>
          </div>
        ) : (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl">
              ✓
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Email enviado
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Revisá tu bandeja de entrada
                para continuar con la
                recuperación.
              </p>
            </div>

            <Button
              onClick={() =>
                setShowReset(false)
              }
              className="w-full"
            >
              Entendido
            </Button>
          </div>
        )}
      </Modal>
    </>
  )
}