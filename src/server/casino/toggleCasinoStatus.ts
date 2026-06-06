// src/server/toggleCasinoStatus.ts

import { createServerFn } from '@tanstack/react-start'

import { requireAdmin } from '../auth'

import { getSupabaseServerClient } from '~/utils/supabase.server'

export const toggleCasinoStatus =
    createServerFn({
        method: 'POST',
    })
        .inputValidator(
            (data: {
                casinoId: string
                active: boolean
            }) => data,
        )
        .handler(async ({ data }) => {
            const supabase =
                getSupabaseServerClient()

            await requireAdmin(
                supabase,
            )

            const { error } =
                await supabase
                    .from('casinos')
                    .update({
                        active: data.active,
                    })
                    .eq(
                        'id',
                        data.casinoId,
                    )

            if (error) {
                throw error
            }

            return true
        })