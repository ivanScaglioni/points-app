// src/server/getUserDashboardData.ts

import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'
import { redirect } from '@tanstack/react-router'
import { getMyRole } from './auth'

export const getUserDashboardData = createServerFn().handler(async () => {
    const supabase = getSupabaseServerClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    const userRole = await getMyRole(supabase)

    if (userRole === 'admin') throw 'ADMIN'
    if (userRole === 'worker') throw 'WORKER'

    const { data: balance, error: balanceError } =
        await supabase.rpc('get_user_balance', {
            uid: user.id,
        })

    if (balanceError) throw balanceError

    const { data: transactions, error: txError } =
        await supabase
            .from('point_transactions')
            .select(`
                id,
                amount,
                type,
                description,
                created_at,
                reward:rewards (
                    id,
                    title
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5)

    if (txError) throw txError

    const normalized = (transactions ?? []).map(tx => ({
        ...tx,
        reward: Array.isArray(tx.reward)
            ? tx.reward[0] ?? null
            : tx.reward ?? null,
    }))

    return {
        user: {
            id: user.id,
            email: user.email,
        },
        balance: balance ?? 0,
        transactions: normalized,
    }
})