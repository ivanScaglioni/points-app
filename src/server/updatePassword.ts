import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '~/utils/supabase.server'
import { redirect } from '@tanstack/react-router'

export const updatePassword = createServerFn()
    .inputValidator((data: { password: string }) => data)
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
            throw redirect({ to: '/login' })
        }

        const { error } = await supabase.auth.updateUser({
            password: data.password,
        })

        if (error) throw error

        return { success: true }
    })