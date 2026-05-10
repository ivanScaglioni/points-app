// src/components/ui/Button.tsx

import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'

import {
    cva,
    type VariantProps,
} from 'class-variance-authority'

import { cn } from '~/lib/cn'

const buttonVariants = cva(
    [
        'inline-flex items-center justify-center gap-2',
        'whitespace-nowrap rounded-xl',
        'text-sm font-medium',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary focus-visible:ring-offset-2',
        'ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none',
        '[&_svg]:h-4 [&_svg]:w-4',
        'active:scale-[0.98]',
    ],
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:opacity-90',

                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',

                ghost:
                    'hover:bg-secondary hover:text-foreground',

                outline:
                    'border border-border bg-background hover:bg-secondary',

                destructive:
                    'bg-red-500 text-white hover:bg-red-400',

                success:
                    'bg-emerald-500 text-black hover:bg-emerald-400',
            },

            size: {
                default: 'h-11 px-5 py-2',

                sm: 'h-9 rounded-lg px-3 text-xs',

                lg: 'h-12 rounded-xl px-6 text-base',

                icon: 'h-11 w-11 p-0',
            },

            fullWidth: {
                true: 'w-full',

                false: '',
            },
        },

        defaultVariants: {
            variant: 'default',

            size: 'default',

            fullWidth: false,
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<
        typeof buttonVariants
    > {
    asChild?: boolean
}

export function Button({
    className,
    variant,
    size,
    fullWidth,
    asChild = false,
    ...props
}: ButtonProps) {
    const Comp = asChild
        ? Slot
        : 'button'

    return (
        <Comp
            className={cn(
                buttonVariants({
                    variant,
                    size,
                    fullWidth,
                }),
                className,
            )}
            {...props}
        />
    )
}

export {
    buttonVariants,
}