// src/server/chip/takeChip.ts
import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient }
    from '../../utils/supabase.server'

import { requireWorkerOrAdmin }
    from '../auth'

export const takeChip =
    createServerFn()
        .inputValidator(
            (data: { id: string }) => data,
        )
        .handler(async ({ data }) => {
            const supabase =
                getSupabaseServerClient()

            const auth =
                await requireWorkerOrAdmin(
                    supabase,
                )

            const {
                data: chip,
                error: chipError,
            } = await supabase
                .from('chips')
                .select(`
                    id,
                    operator_id,
                    status
                `)
                .eq('id', data.id)
                .single()

            if (chipError || !chip) {
                throw new Error(
                    'Chip request not found',
                )
            }

            if (
                chip.status !== 'pending'
            ) {
                throw new Error(
                    'Chip request already processed',
                )
            }

            if (chip.operator_id) {
                throw new Error(
                    'Chip request already taken',
                )
            }

            const { error } =
                await supabase
                    .from('chips')
                    .update({
                        operator_id:
                            auth.user.id,
                        taken_at:
                            new Date().toISOString(),
                    })
                    .eq('id', data.id)
                    .is(
                        'operator_id',
                        null,
                    )

            if (error) throw error

            return true
        })