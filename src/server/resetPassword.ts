import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '~/utils/supabase.server'


const isProd = process.env.NODE_ENV === "production"

const redirectTo = isProd
    ? "https://fenixfichas.com/update-password"
    : "http://localhost:3000/update-password"


export const resetPassword = createServerFn()
    .inputValidator((data: { email: string }) => data)
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        const { error } =
            await supabase.auth.resetPasswordForEmail(data.email, {
                redirectTo
            })

        return { error: error?.message ?? null }
    })