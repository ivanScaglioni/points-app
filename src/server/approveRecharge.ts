import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'
import { requireWorkerOrAdmin } from './auth'

export const approveRecharge = createServerFn()
    .inputValidator(
        (data: {
            rechargeId: string
            points: number
        }) => data
    )
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        await requireWorkerOrAdmin(supabase)

        if (data.points < 0) {
            throw new Error('Invalid points')
        }

        const { error } = await supabase.rpc(
            'approve_recharge',
            {
                p_recharge_id:
                    data.rechargeId,
                p_points: data.points,
            }
        )

        if (error) throw error

        return true
    })