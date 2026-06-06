// src/server/createReward.ts
import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../../utils/supabase.server'
import { requireAdmin } from '../auth'

export const createReward = createServerFn()
    .inputValidator(
        (data: {
            title: string
            cost: number
            type: 'chips' | 'recharge'
            description?: string
            image_url: string
        }) => data,
    )
    .handler(async ({ data }) => {
        const supabase =
            getSupabaseServerClient()

        await requireAdmin(supabase)

        if (
            !data.image_url.startsWith(
                'http',
            )
        ) {
            throw new Error(
                'Invalid image URL',
            )
        }

        const { error } =
            await supabase
                .from('rewards')
                .insert({
                    title: data.title,
                    cost: data.cost,
                    type: data.type,
                    description:
                        data.description ?? null,
                    image_url:
                        data.image_url ?? null,
                    active: true,
                })

        if (error) throw error

        return true
    })