// src/server/getWorkerDashboardData.ts

import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient } from '../utils/supabase.server'

import { requireWorkerOrAdmin } from './auth'

export const getWorkerDashboardData =
    createServerFn().handler(
        async () => {
            const supabase =
                getSupabaseServerClient()

            await requireWorkerOrAdmin(
                supabase,
            )

            const today = new Date()

            today.setHours(
                0,
                0,
                0,
                0,
            )

            const [
                pendingRechargesResult,
                pendingChipsResult,
                processedRechargesResult,
                processedChipsResult,
            ] = await Promise.all([
                // Recargas pendientes
                supabase
                    .from('recharges')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    })
                    .eq(
                        'status',
                        'pending',
                    ),

                // Chips pendientes
                supabase
                    .from('chips')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    })
                    .eq(
                        'status',
                        'pending',
                    ),

                // Recargas procesadas hoy
                supabase
                    .from('recharges')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    })
                    .gte(
                        'reviewed_at',
                        today.toISOString(),
                    )
                    .in('status', [
                        'approved',
                        'rejected',
                    ]),

                // Chips procesados hoy
                supabase
                    .from('chips')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    })
                    .gte(
                        'reviewed_at',
                        today.toISOString(),
                    )
                    .in('status', [
                        'approved',
                        'rejected',
                    ]),
            ])

            const pendingRecharges =
                pendingRechargesResult.count ??
                0

            const pendingChips =
                pendingChipsResult.count ??
                0

            const todayProcessed =
                (processedRechargesResult.count ??
                    0) +
                (processedChipsResult.count ??
                    0)

            return {
                pendingRecharges,

                pendingChips,

                totalPending:
                    pendingRecharges +
                    pendingChips,

                todayProcessed,
            }
        },
    )