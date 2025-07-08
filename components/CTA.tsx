import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CallToAction = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge">
                Start learning your way.
            </div>
            <h2 className="text-3xl font-bold">
                Create and Personalize Your AI Companion
            </h2>
            <p>Pick a name, subject, voice, & personality - and start learning through voice conversations that feel natural and fun.</p>
            <Image
                src="/images/cta.svg"
                alt="Call to Action"
                width={500}
                height={300}
            />
            <button className="btn-primary">
                <Image
                    src="/icons/plus.svg"
                    alt="Add Icon"
                    width={12}
                    height={12}
                />
                <Link href="/companions/new">
                    Create a New Companion
                </Link>
            </button>
        </section>
    )
}

export default CallToAction