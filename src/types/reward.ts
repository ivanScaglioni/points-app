// src/types/reward.ts

export type Reward = {
    id: string

    title: string

    description: string | null

    cost: number

    image_url: string | null

    active: boolean

    created_at: string

    casino_id: string | null

    casino?: {
        id: string
        name: string
    } | null
}

export type User = {
    id: string
    email: string | null
}