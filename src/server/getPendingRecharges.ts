import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'
import { requireWorkerOrAdmin } from './auth'

export const getPendingRecharges =
    createServerFn().handler(
        async () => {
            const supabase =
                getSupabaseServerClient()

            await requireWorkerOrAdmin(
                supabase
            )

            const { data, error } =
                await supabase
                    .from('recharges')
                    .select(`
                            *,
                            profile:profiles!user_id (
                                email
                            ),
                            casino:casinos (
                                id,
                                name
                            ),
                            payment_destination:payment_destinations (
                                id,
                                alias,
                                owner_name
                            ),
                            reward:rewards (
                                id,
                                title,
                                cost
                            )
                            `)
                    .eq('status', 'pending')
                    .is('operator_id', null)
                    .order('created_at', {
                        ascending: true,
                    })

            if (error) throw error

            return data
        }
    )