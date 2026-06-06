import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../../utils/supabase.server'
import { requireAdmin } from '../auth'

export const togglePaymentDestinationStatus =
    createServerFn({ method: 'POST' })
        .inputValidator((data: { destinationId: string, active:boolean }) => data)
        .handler(async ({ data }) => {
            const supabase = getSupabaseServerClient()

            await requireAdmin(supabase)


            const { error: updateError } =
                await supabase
                    .from('payment_destinations')
                    .update({
                        active: data.active,
                    })
                    .eq('id', data.destinationId)

            if (updateError) throw updateError

            return {
                success: true,
                active: data.active,
            }
        })