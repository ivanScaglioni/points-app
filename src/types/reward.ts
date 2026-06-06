// src/types/reward.ts

export type Reward = {
    id: string

    title: string

    description: string | null

    cost: number

    image_url: string | null

    active: boolean

    type: 'recharge' | 'chips'

    created_at: string
}

export type User = {
    id: string
    email: string | null
}