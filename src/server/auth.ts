import { redirect } from '@tanstack/react-router'
import type { SupabaseClient } from '@supabase/supabase-js'

export type AppRole =
    | 'admin'
    | 'worker'
    | 'user'

export async function requireAuth(
    supabase: SupabaseClient
) {
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw redirect({ to: '/login' })
    }

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (error) throw error

    if (!profile) {
        throw redirect({ to: '/' })
    }

    return {
        user: {
            id: user.id,
            email: user.email ?? null,
            role: profile.role as AppRole,
        },
    }
}

export async function requireAdmin(
    supabase: SupabaseClient
) {
    const auth = await requireAuth(supabase)

    if (auth.user.role !== 'admin') {
        throw redirect({ to: '/' })
    }

    return auth
}

export async function requireWorkerOrAdmin(
    supabase: SupabaseClient
) {
    const auth = await requireAuth(supabase)

    if (
        !['admin', 'worker'].includes(
            auth.user.role
        )
    ) {
        throw redirect({ to: '/' })
    }

    return auth
}

export async function getMyRole(
    supabase: SupabaseClient
) {
    const auth = await requireAuth(supabase)

    return auth.user.role
}