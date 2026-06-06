import { createFileRoute } from '@tanstack/react-router'

import { getLatestRewards } from '../server/reward/getLatestRewards'

import type { Reward, User } from '../types/reward'

import { HeroSection } from '../components/HeroSection'
import { RewardsPreview } from '../components/RewardsPreview'
import { AboutSection } from '../components/About'
import { Faqs } from '../components/Faqs'
import { Step } from '../components/Step'

export const Route = createFileRoute('/')({
  loader: async () => {
    return await getLatestRewards()
  },
  component: Home,
})

function Home() {
  const { rewards, user } = Route.useLoaderData() as {
    rewards: Reward[]
    user: User | null
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* Rewards */}
      <section className="container-app py-16 md:py-24">
        <RewardsPreview rewards={rewards} user={user} />
      </section>

      {/* Steps */}
      <section className="border-y border-border bg-muted/30">
        <div className="container-app py-16 md:py-24">
          <Step />
        </div>
      </section>

      {/* FAQ */}
      <section className="container-app py-16 md:py-24">
        <Faqs />
      </section>

      {/* CTA */}
      <section className="container-app pb-20">
        <AboutSection />
      </section>
    </main>
  )
}