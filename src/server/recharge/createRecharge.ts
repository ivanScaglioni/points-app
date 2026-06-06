import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient } from '../../utils/supabase.server'

import { requireAuth } from '../auth'

export const createRecharge =
    createServerFn()
        .inputValidator(
            (data: {
                casino_id: string
                destination_id: string
                casino_username: string
                amount: number
                transaction_id: string
                reward_id?: string
            }) => data
        )
        .handler(async ({ data }) => {
            const supabase =
                getSupabaseServerClient()

            await requireAuth(supabase)

            if (
                !data.casino_username ||
                data.casino_username.length < 3
            ) {
                throw new Error(
                    'Invalid casino username'
                )
            }

            const { error } =
                await supabase.rpc(
                    'create_recharge',
                    {
                        p_casino_id:
                            data.casino_id,

                        p_payment_destination_id:
                            data.destination_id,

                        p_casino_username:
                            data.casino_username,

                        p_amount: data.amount,

                        p_transaction_id:
                            data.transaction_id,

                        p_reward_id:
                            data.reward_id ??
                            null,
                    }
                )

            if (error) throw error

            return true
        })