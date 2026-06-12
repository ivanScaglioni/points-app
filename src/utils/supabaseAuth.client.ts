import { supabase } from './supabase.client'

export async function updatePassword(password: string) {
    return supabase.auth.updateUser({
        password,
    })
}

export async function resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.PUBLIC_APP_URL}/update-password`,
    })
}