import { PopularCompanions, RecentCompanionSessions } from '@/components/ClientCompanionsList'
import CallToAction from '@/components/CTA'
import React from 'react'

const Page = () => {

  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <PopularCompanions />

      <section className="home-section">
        <RecentCompanionSessions />
        <CallToAction />
      </section>
    </main>
  )
}

export default Page