import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../../utils/supabase.server'
import { requireAdmin } from '../auth'

export const getRewardCreateData =
    createServerFn().handler(
        async () => {
            const supabase =
                getSupabaseServerClient()

            await requireAdmin(
                supabase
            )

            const {
                data: casinos,
                error,
            } = await supabase
                .from('casinos')
                .select('id,name')
                .eq('active', true)
                .order('name')

            if (error) throw error

            return {
                casinos:
                    casinos ?? [],
            }
        }
    )