// src/server/chip/getChipById.ts

import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient }
    from '../../utils/supabase.server'

import { requireWorkerOrAdmin }
    from '../auth'

export const getChipById =
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

            const {
                data: chip,
                error,
            } = await supabase
                .from('chips')
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
                    reward:rewards (
                        id,
                        title,
                        cost,
                        type
                    ),
                    operator:profiles!operator_id (
                        id,
                        email
                    )
                `)
                .eq('id', data.id)
                .single()

            if (error) {
                throw error
            }

            if (!chip) {
                throw new Error(
                    'Chip request not found'
                )
            }

            // ya tomada por otro operador
            if (
                chip.operator_id &&
                chip.operator_id !==
                auth.user.id
            ) {
                throw new Error(
                    'Chip request already taken'
                )
            }

            return chip
        })