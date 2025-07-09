import CompanionForm from '@/components/CompanionForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const NewCompanion = async () => {
    const { userId } = await auth()
    if (!userId) redirect('sign-in')

    return (
        <main className="min-lg:w-1/3 min-md:w2/3 items-center justify-center">
            <article className="w-full gap-4 flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Companion Builder</h1>
            </article>

            <CompanionForm />
        </main>
    )
}

export default NewCompanion