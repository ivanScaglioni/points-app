// src/components/ui/modal.tsx

import type { ReactNode } from 'react'

type ModalProps = {
    open: boolean
    onClose: () => void
    children: ReactNode
}

export function Modal({
    open,
    onClose,
    children,
}: ModalProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl">
                {children}

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground transition hover:text-foreground"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}