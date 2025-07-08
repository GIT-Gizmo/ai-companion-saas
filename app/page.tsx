import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CallToAction from '@/components/CTA'
import { recentSessions } from '@/constants'
// import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="1"
          name="Albert Relativestein the Theorist"
          topic="Theory of Relativity"
          subject="science"
          duration={45}
          color="#4A90E2"
        />
        <CompanionCard
          id="2"
          name="Alge-Brah the Math Extraordinaire"
          topic="Advanced Algebra"
          subject="maths"
          duration={45}
          color="#F39C12"
        />
        <CompanionCard
          id="3"
          name="Napoleon Dynamite the Historian"
          topic="French Revolution"
          subject="history"
          duration={60}
          color="#D35400"
        />
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed companions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CallToAction />
      </section>
    </main>
  )
}

export default Page