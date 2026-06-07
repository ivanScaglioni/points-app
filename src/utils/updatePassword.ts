// src/utils/updatePassword.client.ts

import { createClientOnlyFn } from '@tanstack/react-start'

export const updatePasswordClient = createClientOnlyFn(
    async (password: string) => {
        const { supabase } = await import('~/utils/supabase.client')

        const { error } = await supabase.auth.updateUser({
            password,
        })

        if (error) throw error

        return { success: true }
    },
)