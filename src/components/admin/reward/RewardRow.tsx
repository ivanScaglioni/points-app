// src/components/admin/RewardRow.tsx

import { useState } from 'react'
import { toggleReward } from '../../../server/toggleReward'
import type { Reward } from '../../../types/reward'

type Props = {
    reward: Reward
    onUpdated: () => Promise<void>
}

export function RewardRow({ reward, onUpdated }: Props) {
    const [loading, setLoading] = useState(false)

    const handleToggle = async () => {
        try {
            setLoading(true)

            await toggleReward({
                data: {
                    id: reward.id,
                    active: !reward.active,
                },
            })

            await onUpdated()
        } finally {
            setLoading(false)
        }
    }

    return (
        <tr>
            <td>
                {reward.image_url ? (
                    <img
                        src={reward.image_url}
                        style={{ width: 60, height: 60, objectFit: 'cover' }}
                    />
                ) : (
                    <div
                        style={{
                            width: 60,
                            height: 60,
                            background: '#eee',
                        }}
                    />
                )}
            </td>

            <td>{reward.title}</td>
            <td>{reward.cost}</td>
            <td>{reward.casino?.name}</td>

            <td>
                {reward.active ? 'Activo' : 'Inactivo'}
            </td>

            <td>
                <button onClick={handleToggle} disabled={loading}>
                    {loading
                        ? '...'
                        : reward.active
                            ? 'Desactivar'
                            : 'Activar'}
                </button>
            </td>
        </tr>
    )
}