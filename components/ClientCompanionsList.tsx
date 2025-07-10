import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
// import { Button } from '@/components/ui/button'
import React from 'react'

export const PopularCompanions = async () => {
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
}

export const RecentCompanionSessions = async () => {
    const recentSessions = await getRecentSessions(10)

    return (
        <CompanionsList
            title="Recently completed sessions"
            companions={recentSessions}
            classNames="w-2/3 max-lg:w-full"
        />
    )
}
