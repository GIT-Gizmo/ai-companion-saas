import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import React, { Suspense } from 'react'

// Fallback components for loading states
const PopularCompanionsLoading = () => (
    <section className="home-section">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-48 w-full" />
        ))}
    </section>
)

const RecentSessionsLoading = () => (
    <div className="w-2/3 max-lg:w-full">
        <div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full" />
    </div>
)

// Async components wrapped in error boundaries
const PopularCompanionsContent = async () => {
    try {
        const companions = await getAllCompanions({ limit: 3 })
        return (
            <section className="home-section">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
        )
    } catch (error) {
        console.error('Error loading popular companions:', error)
        return (
            <section className="home-section">
                <div className="text-center text-gray-500">
                    Failed to load popular companions
                </div>
            </section>
        )
    }
}

const RecentCompanionSessionsContent = async () => {
    try {
        const recentSessions = await getRecentSessions(10)
        return (
            <CompanionsList
                title="Recently completed sessions"
                companions={recentSessions}
                classNames="w-2/3 max-lg:w-full"
            />
        )
    } catch (error) {
        console.error('Error loading recent sessions:', error)
        return (
            <div className="w-2/3 max-lg:w-full">
                <div className="text-center text-gray-500">
                    Failed to load recent sessions
                </div>
            </div>
        )
    }
}

// Exported components with Suspense
export const PopularCompanions = () => (
    <Suspense fallback={<PopularCompanionsLoading />}>
        <PopularCompanionsContent />
    </Suspense>
)

export const RecentCompanionSessions = () => (
    <Suspense fallback={<RecentSessionsLoading />}>
        <RecentCompanionSessionsContent />
    </Suspense>
)
