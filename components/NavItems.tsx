'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
    const pathname = usePathname()

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Companions', href: '/companions' },
        { label: 'My Journey', href: '/my-journey' },
    ]

    return (
        <div className='flex items-center gap-4'>
            {navLinks.map(({ label, href }) => (
                <Link
                    key={label}
                    href={href}
                    className={cn(pathname === href && 'text-primary font-semobold')}
                >
                    {label}
                </Link>
            ))}
        </div>
    )
}

export default NavItems