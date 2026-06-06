// src/routes/_authed/admin/dashboard.tsx

import {
  createFileRoute,
  redirect,
  Link,
} from '@tanstack/react-router'

import {
  UsersIcon,
  CreditCardIcon,
  BanknotesIcon,
  FireIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { getAdminDashboardData } from '../../../server/getAdminDashboardData'

import {
  Card,
  CardContent,
} from '~/components/ui/Card'

import { Button } from '~/components/ui/Button'

export const Route =
  createFileRoute(
    '/_authed/admin/dashboard',
  )({
    loader: async () => {
      try {
        return await getAdminDashboardData()
      } catch {
        throw redirect({
          to: '/login',
        })
      }
    },

    component: AdminDashboard,
  })

function AdminDashboard() {
  const {
    pendingRecharges,
    pendingChips,
    totalUsers,
    totalTransactions,
    totalRecharges,
    totalChips,
  } = Route.useLoaderData()

  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_35%)]" />

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <div className="h-2 w-2 rounded-full bg-primary" />

                Panel administrativo
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Dashboard Admin
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                  Gestioná usuarios,
                  recargas, rewards y
                  operaciones de la
                  plataforma desde un
                  solo lugar.
                </p>
              </div>
            </div>

            {/* QUICK ACTION */}
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="h-12 px-6"
              >
                <Link to="/admin/recharge">
                  Recargas pendientes

                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 px-6"
              >
                <Link to="/admin/chip">
                  Fichas pendientes

                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* STATS */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
          {/* PENDING */}
          <Link to="/admin/recharge">
            <Card className="group border-yellow-500/20 bg-yellow-500/5 transition-all hover:-translate-y-1 hover:border-yellow-500/40 hover:bg-yellow-500/10">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-400">
                    <ExclamationTriangleIcon className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Recargas pendientes
                    </p>

                    <h2 className="mt-1 text-4xl font-bold tracking-tight text-yellow-400">
                      {pendingRecharges}
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/chip">
            <Card className="group border-indigo-500/20 bg-indigo-500/5 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-indigo-500/10">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                    <FireIcon className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Fichas pendientes
                    </p>

                    <h2 className="mt-1 text-4xl font-bold tracking-tight text-indigo-400">
                      {pendingChips}
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* USERS */}
          <Card className="transition-all hover:-translate-y-1 hover:border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <UsersIcon className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Usuarios
                  </p>

                  <h2 className="mt-1 text-4xl font-bold tracking-tight">
                    {totalUsers}
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TRANSACTIONS 
          <Card className="transition-all hover:-translate-y-1 hover:border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BanknotesIcon className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Transacciones
                  </p>

                  <h2 className="mt-1 text-4xl font-bold tracking-tight">
                    {totalTransactions}
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
          */}

          {/* RECHARGES */}
          <Card className="transition-all hover:-translate-y-1 hover:border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CreditCardIcon className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Total recargas
                  </p>

                  <h2 className="mt-1 text-4xl font-bold tracking-tight">
                    {totalRecharges}
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chips 
        <Card className="transition-all hover:-translate-y-1 hover:border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <GiftIcon className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total fichas
                </p>

                <h2 className="mt-1 text-4xl font-bold tracking-tight">
                  {totalChips}
                </h2>
              </div>
            </div>
          </CardContent>
        </Card>
        */}

        {/* MANAGEMENT */}
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Gestión
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Accesos rápidos para
              administrar la plataforma.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <AdminActionCard
              title="Procesar recargas"
              description="Aprobar o rechazar solicitudes de recarga."
              icon={
                <CreditCardIcon className="h-6 w-6" />
              }
              to="/admin/recharge"
            />

            <AdminActionCard
              title="Procesar fichas"
              description="Aprobar o rechazar solicitudes de fichas."
              icon={
                <FireIcon className="h-6 w-6" />
              }
              to="/admin/chips"
            />

            <AdminActionCard
              title="Beneficios"
              description="Crear y administrar beneficios."
              icon={
                <FireIcon className="h-6 w-6" />
              }
              to="/admin/rewards"
            />

            <AdminActionCard
              title="Casinos"
              description="Gestionar casinos y configuraciones."
              icon={
                <BuildingOffice2Icon className="h-6 w-6" />
              }
              to="/admin/casinos"
            />

            <AdminActionCard
              title="Alias de cobro"
              description="Administrar cuentas y destinos."
              icon={
                <BanknotesIcon className="h-6 w-6" />
              }
              to="/admin/payment-destinations"
            />

            <AdminActionCard
              title="Usuarios"
              description="Administrar usuarios, roles y puntos."
              icon={
                <UsersIcon className="h-6 w-6" />
              }
              to="/admin/user"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

type AdminActionCardProps = {
  title: string
  description: string
  icon: React.ReactNode
  to: string
}

function AdminActionCard({
  title,
  description,
  icon,
  to,
}: AdminActionCardProps) {
  return (
    <Link to={to}>
      <Card className="group h-full transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        <CardContent className="flex h-full flex-col p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
            {icon}
          </div>

          <div className="mt-5 space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">
              {title}
            </h3>

            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="mt-auto pt-6">
            <div className="inline-flex items-center text-sm font-medium text-primary">
              Abrir

              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}