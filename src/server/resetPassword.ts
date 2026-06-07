import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '~/utils/supabase.server'

export const resetPassword = createServerFn()
    .inputValidator((data: { email: string }) => data)
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        const { error } =
            await supabase.auth.resetPasswordForEmail(data.email, {
                redirectTo: `${process.env.PUBLIC_APP_URL}/update-password`,
            })

        if (error) {
            throw new Error(error.message)
        }

        return { success: true }
    })