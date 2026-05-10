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
                supabase
            )

            const {
                count:
                    pendingRecharges,
            } = await supabase
                .from('recharges')
                .select('*', {
                    count: 'exact',
                    head: true,
                })
                .eq('status', 'pending')

            const today =
                new Date()

            today.setHours(
                0,
                0,
                0,
                0
            )

            const {
                count:
                    todayProcessed,
            } = await supabase
                .from('recharges')
                .select('*', {
                    count: 'exact',
                    head: true,
                })
                .gte(
                    'reviewed_at',
                    today.toISOString()
                )
                .in('status', [
                    'approved',
                    'rejected',
                ])

            return {
                pendingRecharges:
                    pendingRecharges ??
                    0,

                todayProcessed:
                    todayProcessed ??
                    0,
            }
        }
    )