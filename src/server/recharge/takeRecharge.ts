import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient }
    from '../../utils/supabase.server'

import { requireWorkerOrAdmin }
    from '../auth'

export const takeRecharge =
    createServerFn()
        .inputValidator(
            (data: { id: string }) => data
        )
        .handler(async ({ data }) => {
            const supabase =
                getSupabaseServerClient()

            const auth =
                await requireWorkerOrAdmin(
                    supabase
                )

            // check recharge
            const {
                data: recharge,
                error: rechargeError,
            } = await supabase
                .from('recharges')
                .select(`
                    id,
                    operator_id,
                    status
                `)
                .eq('id', data.id)
                .single()

            if (
                rechargeError ||
                !recharge
            ) {
                throw new Error(
                    'Recharge not found'
                )
            }

            if (
                recharge.status !==
                'pending'
            ) {
                throw new Error(
                    'Recharge already processed'
                )
            }

            if (recharge.operator_id) {
                throw new Error(
                    'Recharge already taken'
                )
            }

            const { error } =
                await supabase
                    .from('recharges')
                    .update({
                        operator_id:
                            auth.user.id,

                        taken_at:
                            new Date().toISOString(),
                    })
                    .eq('id', data.id)
                    .is('operator_id', null)

            if (error) throw error

            return true
        })