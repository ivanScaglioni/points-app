// src/routes/login.tsx

import { createFileRoute } from '@tanstack/react-router'

import { Login } from '~/components/Login'

export const Route =
  createFileRoute('/login')({
    component: LoginPage,
  })

function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_40%)]" />

      <Login />
    </main>
  )
}