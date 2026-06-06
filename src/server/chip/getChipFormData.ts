// src/server/chip/getChipFormData.ts

import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient }
    from '../../utils/supabase.server'

import { requireAuth }
    from '../auth'

export const getChipFormData =
    createServerFn()
        .inputValidator(
            (data?: {
                rewardId?: string
            }) => data
        )
        .handler(async ({ data }) => {
            const supabase =
                getSupabaseServerClient()

            const auth =
                await requireAuth(
                    supabase
                )

            if (!data?.rewardId) {
                throw new Error(
                    'Reward requerida'
                )
            }

            // casinos activos
            const {
                data: casinos,
                error: casinosError,
            } = await supabase
                .from('casinos')
                .select('*')
                .eq('active', true)
                .order('name')

            if (casinosError) {
                throw casinosError
            }

            // saldo usuario
            const {
                data: currentPoints,
                error: balanceError,
            } = await supabase.rpc(
                'get_user_balance',
                {
                    uid: auth.user.id,
                }
            )

            if (balanceError) {
                throw balanceError
            }

            const balance =
                currentPoints ?? 0

            const {
                data: reward,
                error: rewardError,
            } = await supabase
                .from('rewards')
                .select('*')
                .eq(
                    'id',
                    data.rewardId
                )
                .eq(
                    'active',
                    true
                )
                .eq(
                    'type',
                    'chips'
                )
                .single()

            if (
                rewardError ||
                !reward
            ) {
                throw new Error(
                    'Reward not found'
                )
            }

            if (
                balance <
                reward.cost
            ) {
                throw new Error(
                    'Not enough points'
                )
            }

            return {
                casinos,
                reward,
                currentPoints:
                    balance,
            }
        })