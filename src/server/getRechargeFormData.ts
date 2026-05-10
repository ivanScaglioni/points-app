import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'
import { requireAuth } from './auth'

export const getRechargeFormData =
    createServerFn()
        .inputValidator(
            (data?: {
                rewardId?: string
            }) => data
        )
        .handler(async ({ data }) => {
            const supabase =
                getSupabaseServerClient()

            const auth = await requireAuth(
                supabase
            )

            // casinos
            const { data: casinos, error: casinosError } =
                await supabase
                    .from('casinos')
                    .select('*')
                    .eq('active', true)
                    .order('name')

            if (casinosError)
                throw casinosError

            // payment destinations
            const {
                data: destinations,
                error: destinationsError,
            } = await supabase
                .from('payment_destinations')
                .select('*')
                .eq('active', true)

            if (destinationsError)
                throw destinationsError

            // current points
            const {
                data: transactions,
                error: txError,
            } = await supabase
                .from('point_transactions')
                .select('amount,type')
                .eq('user_id', auth.user.id)

            if (txError) throw txError

            const currentPoints =
                transactions.reduce((acc, tx) => {
                    if (tx.type === 'earn')
                        return acc + tx.amount

                    if (tx.type === 'redeem')
                        return acc - tx.amount

                    return acc
                }, 0)

            let reward = null

            // optional reward
            if (data?.rewardId) {
                const {
                    data: rewardData,
                    error: rewardError,
                } = await supabase
                    .from('rewards')
                    .select('*')
                    .eq('id', data.rewardId)
                    .eq('active', true)
                    .single()

                if (rewardError) {
                    throw new Error(
                        'Reward not found'
                    )
                }

                if (
                    currentPoints < rewardData.cost
                ) {
                    throw new Error(
                        'Not enough points'
                    )
                }

                reward = rewardData
            }

            return {
                casinos,
                destinations,
                reward,
                currentPoints,
            }
        })