// src/server/getAdminDashboardData.ts

import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient } from '../utils/supabase.server'

import { requireAdmin } from './auth'

export const getAdminDashboardData =
    createServerFn().handler(
        async () => {
            const supabase =
                getSupabaseServerClient()

            await requireAdmin(
                supabase
            )

            // recargas pendientes

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

            // total usuarios

            const {
                count: totalUsers,
            } = await supabase
                .from('profiles')
                .select('*', {
                    count: 'exact',
                    head: true,
                })

            // total transacciones

            const {
                count:
                totalTransactions,
            } = await supabase
                .from(
                    'point_transactions'
                )
                .select('*', {
                    count: 'exact',
                    head: true,
                })

            // total recargas

            const {
                count:
                totalRecharges,
            } = await supabase
                .from('recharges')
                .select('*', {
                    count: 'exact',
                    head: true,
                })

            // rewards activas

            const {
                count: activeRewards,
            } = await supabase
                .from('rewards')
                .select('*', {
                    count: 'exact',
                    head: true,
                })
                .eq('active', true)

            return {
                pendingRecharges:
                    pendingRecharges ??
                    0,

                totalUsers:
                    totalUsers ?? 0,

                totalTransactions:
                    totalTransactions ??
                    0,

                totalRecharges:
                    totalRecharges ??
                    0,

                activeRewards:
                    activeRewards ?? 0,
            }
        }
    )