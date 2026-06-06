import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../../utils/supabase.server'
import { requireAdmin } from '../auth'

export const getCasinos = createServerFn()
    .handler(async () => {
        const supabase = getSupabaseServerClient()

        await requireAdmin(supabase)

        const { data, error } = await supabase
            .from('casinos')
            .select('*')
            .order('created_at', {
                ascending: false,
            })

        if (error) throw error

        return data
    })