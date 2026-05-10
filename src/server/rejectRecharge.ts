// src/server/rejectRecharge.ts

import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'
import { requireWorkerOrAdmin } from './auth'

export const rejectRecharge = createServerFn()
    .inputValidator(
        (data: {
            rechargeId: string
        }) => data
    )
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        await requireWorkerOrAdmin(supabase)

        const { error } = await supabase.rpc(
            'reject_recharge',
            {
                p_recharge_id:
                    data.rechargeId,
            }
        )

        if (error) throw error

        return true
    })