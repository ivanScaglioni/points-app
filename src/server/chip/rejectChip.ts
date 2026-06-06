// src/server/chip/rejectChip.ts

import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient }
    from '../../utils/supabase.server'

import { requireWorkerOrAdmin }
    from '../auth'

export const rejectChip =
    createServerFn()
        .inputValidator(
            (data: {
                chipId: string
            }) => data
        )
        .handler(async ({ data }) => {
            const supabase =
                getSupabaseServerClient()

            await requireWorkerOrAdmin(
                supabase
            )

            const { error } =
                await supabase.rpc(
                    'reject_chip',
                    {
                        p_chip_id:
                            data.chipId,
                    }
                )

            if (error) throw error

            return true
        })