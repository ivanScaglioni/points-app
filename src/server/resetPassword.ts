import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '~/utils/supabase.server'

export const resetPassword = createServerFn()
    .inputValidator((data: { email: string }) => data)
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        const { error } =
            await supabase.auth.resetPasswordForEmail(data.email, {
                redirectTo: 'http://localhost:3000/update-password',
            })

        return { error: error?.message ?? null }
    })