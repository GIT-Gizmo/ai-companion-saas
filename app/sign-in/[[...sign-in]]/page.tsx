import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    return (
        <main className="flex justify-center items-center min-h-screen">
            <SignIn />
        </main>
    )
}

export default page