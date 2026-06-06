import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../../utils/supabase'

export const getLatestRewards = createServerFn({ method: 'GET' }).handler(
    async () => {
        const supabase = getSupabaseServerClient()

        //  usuario (puede ser null)
        const {
            data: { user },
        } = await supabase.auth.getUser()


        const { data, error } = await supabase
            .from('rewards')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false })
            .limit(4) // 👈 cambiá esto por X

        if (error) throw error

        return {
            user: user
                ? {
                    id: user.id,
                    email: user.email ?? null,
                }
                : null,
            rewards: data ?? [],
        }
    }
)