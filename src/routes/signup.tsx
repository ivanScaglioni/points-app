// src/routes/signup.tsx

import {
  redirect,
  createFileRoute,
  Link,
} from '@tanstack/react-router'

import {
  createServerFn,
  useServerFn,
} from '@tanstack/react-start'

import { useState } from 'react'

import { useMutation } from '~/hooks/useMutation'

import { getSupabaseServerClient } from '~/utils/supabase'

import { AuthCard } from '~/components/ui/AuthCard'

import { Input } from '~/components/ui/Input'

import { Label } from '~/components/ui/Label'

import { Button } from '~/components/ui/Button'

export const signupFn =
  createServerFn({
    method: 'POST',
  })
    .inputValidator(
      (d: {
        email: string
        password: string
        redirectUrl?: string
      }) => d,
    )
    .handler(async ({ data }) => {
      const supabase =
        getSupabaseServerClient()

      const { error } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        })

      if (error) {
        return {
          error: true,
          message: error.message,
        }
      }

      return {
        success: true,
      }
    })

export const Route =
  createFileRoute('/signup')({
    component: SignupPage,
  })

function SignupPage() {
  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  })

  const success =
    signupMutation.data?.success

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_35%)]" />

      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <AuthCard
        title={
          success
            ? 'Revisá tu email'
            : 'Crear cuenta'
        }
        description={
          success
            ? 'Te enviamos un enlace para confirmar tu cuenta.'
            : 'Comenzá a acumular puntos y desbloquear beneficios exclusivos.'
        }
      >
        {success ? (
          <div className="space-y-6">
            {/* SUCCESS ICON */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl">
              ✓
            </div>

            {/* SUCCESS TEXT */}
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-semibold">
                Cuenta creada correctamente
              </h3>

              <p className="text-sm leading-6 text-muted-foreground">
                Confirmá tu dirección de email
                para activar tu cuenta.
              </p>
            </div>

            <Button
              className="w-full"
              variant="secondary"
              asChild
            >
              <Link to="/login">
                Ir al login
              </Link>
            </Button>
          </div>
        ) : (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault()

              signupMutation.mutate({
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
              <Label>Contraseña</Label>

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
            {signupMutation.data
              ?.error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                  {
                    signupMutation
                      .data.message
                  }
                </div>
              )}

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full"
              disabled={
                signupMutation.status ===
                'pending'
              }
            >
              {signupMutation.status ===
                'pending'
                ? 'Creando cuenta...'
                : 'Crear cuenta'}
            </Button>

            {/* LOGIN LINK */}
            <div className="pt-2 text-center text-sm text-muted-foreground">
              ¿Ya tenés cuenta?{' '}
              <Link
                to="/login"
                className="font-medium text-primary transition hover:opacity-80"
              >
                Iniciar sesión
              </Link>
            </div>
          </form>
        )}
      </AuthCard>
    </main>
  )
}