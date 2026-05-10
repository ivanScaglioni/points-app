import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { updatePassword } from '~/server/updatePassword'

import { AuthCard } from '~/components/ui/AuthCard'
import { Input } from '~/components/ui/Input'
import { Label } from '~/components/ui/Label'
import { Button } from '~/components/ui/Button'

export const Route = createFileRoute('/update-password')({
  component: UpdatePasswordPage,
})

function UpdatePasswordPage() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleUpdatePassword() {
    setMessage(null)

    if (password.length < 6) {
      setMessage('Mínimo 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setMessage('No coinciden')
      return
    }

    try {
      setLoading(true)

      await updatePassword({
        data: { password },
      })

      setMessage('Contraseña actualizada')

      setTimeout(() => {
        navigate({ to: '/login' })
      }, 1200)

    } catch (err: any) {
      setMessage(err.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthCard title="Actualizar contraseña">

        <div className="space-y-4">

          <div>
            <Label>Nueva contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Label>Confirmar</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {message && (
            <p className="text-sm text-muted-foreground">
              {message}
            </p>
          )}

          <Button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </Button>

        </div>

      </AuthCard>
    </main>
  )
}