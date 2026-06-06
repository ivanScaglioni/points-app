// src/components/ui/action-card.tsx

import { Link } from '@tanstack/react-router'

import { ArrowRightIcon } from '@heroicons/react/24/outline'

import {
    Card,
    CardContent,
} from '~/components/ui/Card'

type ActionCardProps = {
    title: string
    description: string
    icon: React.ReactNode
    to: string
    search?: Record<string, unknown>
}

export function ActionCard({
    title,
    description,
    icon,
    to,
    search,
}: ActionCardProps) {
    return (
        <Link
            to={to}
            search={search}
        >
            <Card
                className="
                    group
                    h-full

                    transition-all

                    hover:-translate-y-1
                    hover:border-primary/30
                    hover:shadow-xl
                    hover:shadow-primary/5
                "
            >
                <CardContent
                    className="
                        flex
                        h-full
                        flex-col

                        p-6
                    "
                >
                    {/* ICON */}

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center

                            rounded-2xl

                            bg-primary/10

                            text-primary

                            transition-all

                            group-hover:bg-primary
                            group-hover:text-primary-foreground
                        "
                    >
                        {icon}
                    </div>

                    {/* CONTENT */}

                    <div className="mt-5">
                        <h3
                            className="
                                text-lg
                                font-semibold
                                tracking-tight
                            "
                        >
                            {title}
                        </h3>

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-muted-foreground
                            "
                        >
                            {description}
                        </p>
                    </div>

                    {/* FOOTER */}

                    <div className="mt-auto pt-6">
                        <div
                            className="
                                inline-flex
                                items-center

                                text-sm
                                font-medium

                                text-primary
                            "
                        >
                            Abrir

                            <ArrowRightIcon
                                className="
                                    ml-2
                                    h-4
                                    w-4

                                    transition-transform

                                    group-hover:translate-x-1
                                "
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}