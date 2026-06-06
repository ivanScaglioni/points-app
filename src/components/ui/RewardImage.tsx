// src/components/ui/reward-image.tsx

type RewardImageProps = {
    src?: string | null
    alt: string
    overlay?: boolean
    className?: string
}

export function RewardImage({
    src,
    alt,
    overlay = false,
    className = '',
}: RewardImageProps) {
    return (
        <div
            className={`
                relative
                aspect-[16/10]
                overflow-hidden
                bg-secondary
                ${className}
            `}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="
                        h-full
                        w-full
                        object-scale
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />
            ) : (
                <div
                    className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        text-sm
                        text-muted-foreground
                    "
                >
                    Sin imagen
                </div>
            )}

            {overlay && (
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-background
                        via-background/20
                        to-transparent
                    "
                />
            )}
        </div>
    )
}