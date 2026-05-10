import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'
import { requireAdmin } from './auth'

export const togglePaymentDestinationStatus =
    createServerFn({ method: 'POST' })
        .inputValidator((data: { destinationId: string }) => data)
        .handler(async ({ data }) => {
            const supabase = getSupabaseServerClient()

            await requireAdmin(supabase)

            // primero obtenemos estado actual
            const { data: current, error: fetchError } =
                await supabase
                    .from('payment_destinations')
                    .select('active')
                    .eq('id', data.destinationId)
                    .single()

            if (fetchError) throw fetchError

            const { error: updateError } =
                await supabase
                    .from('payment_destinations')
                    .update({
                        active: !current.active,
                    })
                    .eq('id', data.destinationId)

            if (updateError) throw updateError

            return {
                success: true,
                active: !current.active,
            }
        })