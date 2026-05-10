import {
  Link,
  useRouter,
} from '@tanstack/react-router'

import { useState } from 'react'

import { loginFn } from '~/server/login'
import { resetPassword } from '~/server/resetPassword'

import { useMutation } from '~/hooks/useMutation'

import { Button } from '~/components/ui/Button'
import { Input } from '~/components/ui/Input'
import { Label } from '~/components/ui/Label'
import { Modal } from '~/components/ui/Modal'
import { AuthCard } from '~/components/ui/AuthCard'

export function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate()
        router.navigate({ to: '/dashboard' })
      }
    },
  })

  async function handleResetPassword() {
    try {
      setResetLoading(true)

      const res = await resetPassword({
        data: {
          email: resetEmail,
        },
      })

      if (!res.error) {
        setResetSent(true)
      }
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <>
      <main className="relative flex min-h-screen items-center justify-center bg-background px-4">
        <AuthCard
          title="Bienvenido"
          description="Ingresá a tu cuenta"
        >
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault()

              loginMutation.mutate({
                data: { email, password },
              })
            }}
          >
            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {loginMutation.data?.error && (
              <div className="text-red-500 text-sm">
                {loginMutation.data.error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <button
            onClick={() => setShowReset(true)}
            className="mt-4 text-sm text-primary"
          >
            Forgot password?
          </button>
        </AuthCard>
      </main>

      {/* RESET MODAL */}
      <Modal
        open={showReset}
        onClose={() => {
          setShowReset(false)
          setResetSent(false)
        }}
      >
        {!resetSent ? (
          <div className="space-y-4">
            <Input
              value={resetEmail}
              onChange={(e) =>
                setResetEmail(e.target.value)
              }
              placeholder="Email"
            />

            <Button
              onClick={handleResetPassword}
              disabled={resetLoading}
            >
              Send reset email
            </Button>
          </div>
        ) : (
          <p>Email sent!</p>
        )}
      </Modal>
    </>
  )
}