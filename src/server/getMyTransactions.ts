import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../utils/supabase.server'
import { redirect } from '@tanstack/react-router'




export const getMyTransactions = createServerFn()
  .inputValidator((data: { page: number; pageSize: number }) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw redirect({ to: '/login' })
    }

    const from = data.page * data.pageSize
    const to = from + data.pageSize - 1

    const { data: transactions, error, count } = await supabase
      .from('point_transactions')
      .select(
        `
        id,
        amount,
        type,
        description,
        created_at,
        reward:rewards (
          id,
          title
        )
      `,
        { count: 'exact' }
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    return {
      transactions: transactions ?? [],
      total: count ?? 0,
    }
  })