// src/server/chip/createChip.ts

import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient }
    from '../../utils/supabase.server'

import { requireAuth }
    from '../auth'

export const createChip =
    createServerFn()
        .inputValidator(
            (data: {
                reward_id: string
                casino_id: string
                casino_username: string
            }) => data,
        )
        .handler(async ({ data }) => {
            const supabase =
                getSupabaseServerClient()

            await requireAuth(
                supabase,
            )

            if (
                !data.casino_username ||
                data.casino_username
                    .trim()
                    .length < 3
            ) {
                throw new Error(
                    'Invalid casino username',
                )
            }

            const { error } =
                await supabase.rpc(
                    'create_chip',
                    {
                        p_reward_id:
                            data.reward_id,

                        p_casino_id:
                            data.casino_id,

                        p_casino_username:
                            data.casino_username,
                    },
                )

            if (error) throw error

            return true
        })