import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '~/utils/supabase.server'

export const loginFn = createServerFn()
    .inputValidator((data: { email: string; password: string }) => data)
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        const { data: result, error } =
            await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })

        if (error) {
            return { error: error.message }
        }

        return { user: result.user }
    })