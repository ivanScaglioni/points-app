import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../../utils/supabase.server'
import { requireWorkerOrAdmin } from '../auth'

export const getRechargeById =
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

            const { data: recharge, error } =
                await supabase
                    .from('recharges')
                    .select(`
            *,
                profile:profiles!user_id (
                id,
                email
                ),
                casino:casinos (
                id,
                name
                ),
                payment_destination:payment_destinations (
                id,
                alias,
                owner_name
                ),
                reward:rewards (
                id,
                title,
                cost
                ),
                operator:profiles!operator_id (
                id,
                email
                )
            `)
                    .eq('id', data.id)
                    .single()

            if (error) throw error

            if (!recharge) {
                throw new Error(
                    'Recharge not found'
                )
            }

            // si ya está tomada por otro operador
            if (
                recharge.operator_id &&
                recharge.operator_id !==
                auth.user.id
            ) {
                throw new Error(
                    'Recharge already taken'
                )
            }

            return recharge
        })