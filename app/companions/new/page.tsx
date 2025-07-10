import CompanionForm from '@/components/CompanionForm'
import { newCompanionPermissions } from '@/lib/actions/companion.actions'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const NewCompanion = async () => {
    const { userId } = await auth()
    if (!userId) redirect('sign-in')

    const canCreateCompanion = await newCompanionPermissions()

    return (
        <main className="min-lg:w-2/4 min-md:w2/3 items-center justify-center py-20">
            {canCreateCompanion ? (
                <article className="w-full gap-4 flex flex-col">
                    <h1 className="text-2xl font-bold mb-4">Companion Builder</h1>
                    <CompanionForm />
                </article>
            ) : (
                <article className="companion-limit">
                    <Image
                        src="/images/limit.svg"
                        alt="Companion Limit Reached"
                        width={360}
                        height={230}
                        className="mx-auto mb-4"
                    />
                    <div className="cta-badge">
                        Upgrade your plan
                    </div>
                    <h1 className="text-xl font-bold">Companion Limit Reached</h1>
                    <p>You have reached the limit for creating new companions. Please upgrade your plan to create more.</p>
                    <Link href="/subscription" className="btn-primary w-full justify-center">Upgrade My Plan</Link>
                </article>
            )}
        </main>
    )
}

export default NewCompanion