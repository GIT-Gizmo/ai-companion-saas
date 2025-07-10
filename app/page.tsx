import CallToAction from '@/components/CTA'
import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import components that use server-side data
const PopularCompanions = dynamic(
  () => import('@/components/ClientCompanionsList').then(mod => ({ default: mod.PopularCompanions })),
  { 
    ssr: false, // Disable SSR to prevent prerendering issues
    loading: () => (
      <section className="home-section">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-48 w-full" />
        ))}
      </section>
    )
  }
)

const RecentCompanionSessions = dynamic(
  () => import('@/components/ClientCompanionsList').then(mod => ({ default: mod.RecentCompanionSessions })),
  { 
    ssr: false, // Disable SSR to prevent prerendering issues
    loading: () => (
      <div className="w-2/3 max-lg:w-full">
        <div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full" />
      </div>
    )
  }
)

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