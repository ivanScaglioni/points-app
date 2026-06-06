// src/server/chip/getPendingChips.ts

import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient }
    from '../../utils/supabase.server'

import { requireWorkerOrAdmin }
    from '../auth'

export const getPendingChips =
    createServerFn().handler(
        async () => {
            const supabase =
                getSupabaseServerClient()

            await requireWorkerOrAdmin(
                supabase
            )

            const { data, error } =
                await supabase
                    .from('chips')
                    .select(`
                        *,
                        profile:profiles!user_id (
                            email
                        ),
                        casino:casinos (
                            id,
                            name
                        ),
                        reward:rewards (
                            id,
                            title,
                            cost,
                            type
                        )
                    `)
                    .eq(
                        'status',
                        'pending'
                    )
                    .is(
                        'operator_id',
                        null
                    )
                    .order(
                        'created_at',
                        {
                            ascending:
                                true,
                        }
                    )

            if (error)
                throw error

            return data ?? []
        }
    )