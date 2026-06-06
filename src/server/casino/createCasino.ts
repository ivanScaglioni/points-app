// src/server/createCasino.ts

import { createServerFn } from '@tanstack/react-start'

import { requireAdmin } from '../auth'

import { getSupabaseServerClient } from '~/utils/supabase.server'

export const createCasino =
    createServerFn({
        method: 'POST',
    })
        .inputValidator(
            (data: {
                name: string
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
                    .insert({
                        name: data.name.trim(),
                    })

            if (error) {
                throw error
            }

            return true
        })