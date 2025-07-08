import CompanionForm from '@/components/CompanionForm'

const page = () => {
    return (
        <main className="min-lg:w1/3 min-md:w2/3 items-center justify-center">
            <article className="w-full gap-4 flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Companion Builder</h1>
            </article>

            <CompanionForm />
        </main>
    )
}

export default page