import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../../utils/supabase.server'
import { requireAdmin } from '../auth'

export const getPaymentDestinations =
    createServerFn()
        .inputValidator(
            (data?: { includeInactive?: boolean }) =>
                data ?? {},
        )
        .handler(async ({ data }) => {
            const supabase = getSupabaseServerClient()

            await requireAdmin(supabase)

            let query = supabase
                .from('payment_destinations')
                .select('*')


            const { data: destinations, error } =
                await query.order('created_at', {
                    ascending: false,
                })

            if (error) throw error

            return destinations as {
                id: string
                alias: string
                owner_name: string | null
                type: string
                active: boolean
                created_at: string
            }[]
        })