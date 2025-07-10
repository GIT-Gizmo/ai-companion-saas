'use client'

import React, { useEffect, useState } from 'react'
import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'

// Loading components
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

// Error components
const PopularCompanionsError = () => (
    <section className="home-section">
        <div className="text-center text-gray-500">
            Failed to load popular companions
        </div>
    </section>
)

const RecentSessionsError = () => (
    <div className="w-2/3 max-lg:w-full">
        <div className="text-center text-gray-500">
            Failed to load recent sessions
        </div>
    </div>
)

export const PopularCompanions = () => {
    const [companions, setCompanions] = useState<Companion[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCompanions = async () => {
            try {
                setLoading(true)
                const data = await getAllCompanions({ limit: 3 })
                setCompanions(data)
            } catch (err) {
                console.error('Error loading popular companions:', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchCompanions()
    }, [])

    if (loading) return <PopularCompanionsLoading />
    if (error) return <PopularCompanionsError />

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

export const RecentCompanionSessions = () => {
    const [sessions, setSessions] = useState<Companion[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true)
                const data = await getRecentSessions(10)
                setSessions(data)
            } catch (err) {
                console.error('Error loading recent sessions:', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchSessions()
    }, [])

    if (loading) return <RecentSessionsLoading />
    if (error) return <RecentSessionsError />

    return (
        <CompanionsList
            title="Recently completed sessions"
            companions={sessions}
            classNames="w-2/3 max-lg:w-full"
        />
    )
}
