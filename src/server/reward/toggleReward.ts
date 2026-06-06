// src/server/toggleReward.ts

import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../../utils/supabase.server'
import { requireAdmin } from '../auth'

export const toggleReward = createServerFn()
    .inputValidator((data: { id: string; active: boolean }) => data)
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        await requireAdmin(supabase)

        const { error } = await supabase
            .from('rewards')
            .update({ active: data.active })
            .eq('id', data.id)

        if (error) throw error

        return true
    })