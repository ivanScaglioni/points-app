// src/server/chip/getMyChips.ts

import { redirect } from '@tanstack/react-router'

import { createServerFn } from '@tanstack/react-start'

import { getSupabaseServerClient }
    from '../../utils/supabase.server'

const PAGE_SIZE = 10

export const getMyChips =
    createServerFn()
        .inputValidator(
            (data: {
                page?: number
            }) => data,
        )
        .handler(
            async ({ data }) => {
                const supabase =
                    getSupabaseServerClient()

                const {
                    data: { user },
                } =
                    await supabase.auth.getUser()

                if (!user) {
                    throw redirect({
                        to: '/login',
                    })
                }

                const page =
                    data.page ?? 1

                const from =
                    (page - 1) *
                    PAGE_SIZE

                const to =
                    from +
                    PAGE_SIZE -
                    1

                const {
                    data: chips,
                    error,
                    count,
                } = await supabase
                    .from('chips')
                    .select(
                        `
                        *,
                        casino:casinos (
                            id,
                            name
                        ),
                        reward:rewards (
                            id,
                            title,
                            cost,
                            type
                        )
                        `,
                        {
                            count: 'exact',
                        },
                    )
                    .eq(
                        'user_id',
                        user.id,
                    )
                    .order(
                        'created_at',
                        {
                            ascending:
                                false,
                        },
                    )
                    .range(from, to)

                if (error) {
                    throw error
                }

                const total =
                    count ?? 0

                return {
                    chips:
                        chips ?? [],

                    pagination: {
                        page,

                        pageSize:
                            PAGE_SIZE,

                        total,

                        totalPages:
                            Math.max(
                                1,
                                Math.ceil(
                                    total /
                                    PAGE_SIZE,
                                ),
                            ),
                    },
                }
            },
        )