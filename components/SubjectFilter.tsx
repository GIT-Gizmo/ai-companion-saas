'use client'

import { subjects } from '@/constants'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const SubjectFilter = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('subject') || ''

    const [subject, setSubject] = useState(query)

    useEffect(() => {
        if (subject) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            })

            router.push(newUrl, { scroll: false })
        } else {
            if (pathname === '/companions') {
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['subject'],
                })
                router.push(newUrl, { scroll: false })
            }
        }
    }, [subject, router, searchParams, pathname])

    return (
        <div>
            <Select
                value={subject}
                onValueChange={(value) => setSubject(value)}
                defaultValue="all"
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">
                        All Subjects
                    </SelectItem>
                    {subjects.map((subject) => (
                        <SelectItem
                            key={subject}
                            value={subject}
                            className='capitalize'
                        >
                            {subject.charAt(0).toUpperCase() + subject.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SubjectFilter