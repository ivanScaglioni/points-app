// src/server/searchUsers.ts

import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'
import { requireWorkerOrAdmin } from './auth'

export type SearchUser = {
    id: string
    email: string | null
}

export const searchUsers = createServerFn()
    .inputValidator((query: string) => query)
    .handler(async ({ data: query }): Promise<SearchUser[]> => {
        const supabase = getSupabaseServerClient()

        await requireWorkerOrAdmin(supabase)

        const cleanQuery = query?.trim()

        if (!cleanQuery || cleanQuery.length < 3) {
            return []
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('id, email')
            .ilike('email', `%${cleanQuery}%`)
            .limit(10)

        if (error) throw error

        return (data ?? []).map((u) => ({
            id: u.id,
            email: u.email,
        }))
    })