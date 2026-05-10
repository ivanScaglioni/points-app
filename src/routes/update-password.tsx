// src/routes/update-password.tsx

import { useState } from 'react'

import {
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'

import { supabase } from '~/utils/supabase.client'

import { AuthCard } from '~/components/ui/AuthCard'

import { Input } from '~/components/ui/Input'

import { Label } from '~/components/ui/Label'

import { Button } from '~/components/ui/Button'

export const Route =
  createFileRoute(
    '/update-password',
  )({
    component:
      UpdatePasswordPage,
  })

function UpdatePasswordPage() {
  const navigate = useNavigate()

  const [password, setPassword] =
    useState('')

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('')

  const [loading, setLoading] =
    useState(false)

  const [message, setMessage] =
    useState<string | null>(null)

  const [success, setSuccess] =
    useState(false)

  async function handleUpdatePassword() {
    setMessage(null)

    if (password.length < 6) {
      setSuccess(false)

      setMessage(
        'La contraseña debe tener al menos 6 caracteres',
      )

      return
    }

    if (
      password !==
      confirmPassword
    ) {
      setSuccess(false)

      setMessage(
        'Las contraseñas no coinciden',
      )

      return
    }

    try {
      setLoading(true)

      const { error } =
        await supabase.auth.updateUser(
          {
            password,
          },
        )

      if (error) {
        setSuccess(false)

        setMessage(error.message)

        return
      }

      setSuccess(true)

      setMessage(
        'Contraseña actualizada correctamente',
      )

      setTimeout(() => {
        navigate({
          to: '/login',
        })
      }, 1800)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_40%)]" />

      <AuthCard
        title="Actualizar contraseña"
        description="Ingresá tu nueva contraseña para finalizar el proceso."
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>
              Nueva contraseña
            </Label>

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value,
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Confirmar contraseña
            </Label>

            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value,
                )
              }
            />
          </div>

          {message && (
            <div
              className={`rounded-2xl border p-4 text-sm ${success
                  ? 'border-green-500/20 bg-green-500/10 text-green-400'
                  : 'border-red-500/20 bg-red-500/10 text-red-400'
                }`}
            >
              {message}
            </div>
          )}

          <Button
            onClick={
              handleUpdatePassword
            }
            disabled={loading}
            className="w-full"
          >
            {loading
              ? 'Actualizando...'
              : 'Actualizar contraseña'}
          </Button>
        </div>
      </AuthCard>
    </main>
  )
}