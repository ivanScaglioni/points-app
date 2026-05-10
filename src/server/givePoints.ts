// src/server/givePoints.ts

import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'
import { requireWorkerOrAdmin } from './auth'

type GivePointsInput = {
    userId: string
    amount: number
    description?: string
}

export const givePoints = createServerFn()
    .inputValidator((data: GivePointsInput) => data)
    .handler(async ({ data }) => {
        const supabase = getSupabaseServerClient()

        await requireWorkerOrAdmin(supabase)

        const { error } = await supabase.rpc('give_points', {
            target_user_id: data.userId,
            amount: data.amount,
            description: data.description ?? 'Manual adjustment',
        })

        if (error) throw error

        return { success: true }
    })