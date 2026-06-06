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

            const [
                pendingRechargesResult,
                pendingChipsResult,
                totalUsersResult,
                totalTransactionsResult,
                totalRechargesResult,
                totalChipsResult,
                activeRewardsResult,
            ] = await Promise.all([
                supabase
                    .from('recharges')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    })
                    .eq('status', 'pending'),

                supabase
                    .from('chips')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    })
                    .eq('status', 'pending'),

                supabase
                    .from('profiles')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    }),

                supabase
                    .from(
                        'point_transactions',
                    )
                    .select('*', {
                        count: 'exact',
                        head: true,
                    }),

                supabase
                    .from('recharges')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    }),

                supabase
                    .from('chips')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    }),

                supabase
                    .from('rewards')
                    .select('*', {
                        count: 'exact',
                        head: true,
                    })
                    .eq('active', true),
            ])

            return {
                pendingRecharges:
                    pendingRechargesResult.count ??
                    0,

                pendingChips:
                    pendingChipsResult.count ??
                    0,

                totalUsers:
                    totalUsersResult.count ??
                    0,

                totalTransactions:
                    totalTransactionsResult.count ??
                    0,

                totalRecharges:
                    totalRechargesResult.count ??
                    0,

                totalChips:
                    totalChipsResult.count ??
                    0,

                activeRewards:
                    activeRewardsResult.count ??
                    0,
            }
        },
    )