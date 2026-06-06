import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../../utils/supabase.server'
import { requireAdmin } from '../auth'

export const createPaymentDestination = createServerFn()
    .inputValidator((data: {
        alias: string
        owner_name?: string
        type?: string
    }) => data)
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        await requireAdmin(supabase)

        const { error } = await supabase
            .from('payment_destinations')
            .insert({
                alias: data.alias,
                owner_name: data.owner_name ?? null,
                type: data.type ?? 'alias',
            })

        if (error) throw error

        return true
    })