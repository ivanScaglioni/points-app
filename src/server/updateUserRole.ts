// src/server/user/updateUserRole.ts

import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient }
    from '../utils/supabase.server'

import { requireAdmin }
    from './auth'

export const updateUserRole =
    createServerFn()
        .inputValidator(
            (data: {
                userId: string
                role:
                    | 'user'
                    | 'worker'
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
                    .from('profiles')
                    .update({
                        role: data.role,
                    })
                    .eq(
                        'id',
                        data.userId,
                    )

            if (error) throw error

            return true
        })