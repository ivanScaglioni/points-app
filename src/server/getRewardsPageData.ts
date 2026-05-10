import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'

export const getRewardsPageData = createServerFn().handler(async () => {
    const supabase = getSupabaseServerClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: rewards, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('active', true)
        .order('cost', { ascending: true })

    if (error) throw error

    let points = 0

    if (user) {
        const { data: balance, error: balanceError } =
            await supabase.rpc('get_user_balance', {
                uid: user.id,
            })

        if (balanceError) throw balanceError

        points = balance ?? 0
    }

    return {
        user: user
            ? {
                id: user.id,
                email: user.email ?? null,
            }
            : null,

        rewards: rewards ?? [],

        points,
    }
})