// src/routes/_authed/admin/chips/$id.tsx

import {
  createFileRoute,
  useRouter,
} from '@tanstack/react-router'

import {
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  BuildingOffice2Icon,
  GiftIcon,
  ClockIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline'

import { getChipById }
  from '../../../../server/chip/getChipById'

import { approveChip }
  from '../../../../server/chip/approveChip'

import { rejectChip }
  from '../../../../server/chip/rejectChip'

import { useMutation }
  from '../../../../hooks/useMutation'

import {
  Card,
  CardContent,
} from '~/components/ui/Card'

import { Button }
  from '~/components/ui/Button'

export const Route =
  createFileRoute(
    '/_authed/admin/chip/$id',
  )({
    loader: async ({
      params,
    }) => {
      return await getChipById({
        data: {
          id: params.id,
        },
      })
    },

    component: ChipDetailPage,
  })

function ChipDetailPage() {
  const chip =
    Route.useLoaderData()

  const router = useRouter()

  const isPending =
    chip.status === 'pending'

  const approveMutation =
    useMutation({
      fn: approveChip,

      onSuccess:
        async () => {
          router.navigate({
            to: '/admin/chip',
          })
        },
    })

  const rejectMutation =
    useMutation({
      fn: rejectChip,

      onSuccess:
        async () => {
          router.navigate({
            to: '/admin/chip',
          })
        },
    })

  const statusConfig = {
    pending: {
      label: 'Pendiente',
      className:
        'border-yellow-500/20 bg-yellow-500/10 text-yellow-400',
    },

    approved: {
      label: 'Aprobada',
      className:
        'border-green-500/20 bg-green-500/10 text-green-400',
    },

    rejected: {
      label:
        'Rechazada',
      className:
        'border-red-500/20 bg-red-500/10 text-red-400',
    },
  }

  const status =
    statusConfig[
    chip.status as keyof typeof statusConfig
    ]

  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
              >
                <ClockIcon className="h-4 w-4" />

                {status.label}
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  Procesar solicitud
                  de fichas
                </h1>

                <p className="mt-2 text-muted-foreground">
                  Revisá la
                  información antes
                  de aprobar o
                  rechazar la
                  solicitud.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card px-5 py-4">
              <div className="text-sm text-muted-foreground">
                Coste
              </div>

              <div className="mt-1 text-3xl font-bold tracking-tight">
                {
                  chip.reward
                    ?.cost ??
                  0
                }{' '}
                pts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* DETAILS */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Información de
                    la solicitud
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Datos enviados
                    por el usuario.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <InfoItem
                    icon={
                      <UserIcon className="h-5 w-5" />
                    }
                    label="Usuario"
                    value={
                      chip
                        .profile
                        ?.email ??
                      '-'
                    }
                  />

                  <InfoItem
                    icon={
                      <IdentificationIcon className="h-5 w-5" />
                    }
                    label="Usuario casino"
                    value={
                      chip.casino_username
                    }
                  />

                  <InfoItem
                    icon={
                      <BuildingOffice2Icon className="h-5 w-5" />
                    }
                    label="Casino"
                    value={
                      chip
                        .casino
                        ?.name ??
                      '-'
                    }
                  />
                </div>

                {/* OPERATOR */}
                {chip.operator && (
                  <div className="mt-6 rounded-2xl border border-border bg-card p-4">
                    <div className="text-sm text-muted-foreground">
                      Operador
                    </div>

                    <div className="mt-1 font-medium">
                      {
                        chip
                          .operator
                          ?.email
                      }
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* REWARD */}
            {chip.reward && (
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                      <GiftIcon className="h-7 w-7" />
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-400">
                        Reward
                        asociada
                      </div>

                      <h3 className="mt-1 text-xl font-semibold">
                        {
                          chip
                            .reward
                            .title
                        }
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Coste:{' '}
                        <span className="font-semibold text-foreground">
                          {
                            chip
                              .reward
                              .cost
                          }{' '}
                          pts
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {!isPending && (
              <Card>
                <CardContent className="p-6">
                  <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                    Esta solicitud
                    ya fue
                    procesada.
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ACTIONS */}
            {isPending && (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Acciones
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Confirmá la
                        solicitud.
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      disabled={
                        approveMutation.status ===
                        'pending'
                      }
                      onClick={() =>
                        approveMutation.mutate(
                          {
                            data: {
                              chipId:
                                chip.id,
                            },
                          },
                        )
                      }
                    >
                      <CheckCircleIcon className="mr-2 h-5 w-5" />

                      {approveMutation.status ===
                        'pending'
                        ? 'Procesando...'
                        : 'Aprobar solicitud'}
                    </Button>

                    <Button
                      className="w-full"
                      disabled={
                        rejectMutation.status ===
                        'pending'
                      }
                      onClick={() =>
                        rejectMutation.mutate(
                          {
                            data: {
                              chipId:
                                chip.id,
                            },
                          },
                        )
                      }
                    >
                      <XCircleIcon className="mr-2 h-5 w-5" />

                      {rejectMutation.status ===
                        'pending'
                        ? 'Procesando...'
                        : 'Rechazar solicitud'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

type InfoItemProps = {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="text-primary">
          {icon}
        </span>

        {label}
      </div>

      <div className="mt-2 break-words text-base font-medium">
        {value}
      </div>
    </div>
  )
}