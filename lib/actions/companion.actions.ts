'use server'

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth()
    const supabase = createSupabaseClient()

    const { data, error } = await supabase
        .from('companions')
        .insert({ ...formData, author })
        .select()

    if (error || !data) throw new Error(error?.message || 'Failed to create companion')

    return data[0];
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient()

    let query = supabase.from('companions').select()

    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1).order('created_at', { ascending: false })

    const { data: companions, error } = await query

    if (error) throw new Error(error.message)

    return companions;
}

export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient()
    if (!id) throw new Error('Companion ID is required')
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('id', id)

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || 'Companion not found')
    }

    return data[0];
}

export const addToSessionHistory = async (companionId: string, messages: SavedMessage[]) => {
    const { userId } = await auth()
    const supabase = createSupabaseClient()

    if (!userId) throw new Error('User ID is required')

    const { data, error } = await supabase
        .from('session_history')
        .insert({
            user_id: userId,
            companion_id: companionId,
            messages: messages.map(({ content, role }) => ({
                content: content,
                role
            }))
        })

    if (error) throw new Error(error.message)

    return data;
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if (error) throw new Error(error.message)

    return data.map(({ companions }) => companions).flat();

    // Uncomment the following lines if you want to transform the data structure
    // return data.map(({ id, user_id, companion_id, content, role, created_at }) => ({
    //     id,
    //     userId: user_id,
    //     companionId: companion_id,
    //     content,
    //     role,
    //     createdAt: created_at
    // }));
}

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if (error) throw new Error(error.message)

    return data.map(({ companions }) => companions).flat();

}

export const getUserCompanions = async (userId: string, limit = 10, page = 1) => {
    const supabase = createSupabaseClient()
    if (!userId) throw new Error('User ID is required')

    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || 'No companions found for this user')
    }

    return data;
}
// Uncomment if you need to implement delete and update functionality


// export const getCompanionByAuthor = async (author: string) => {
//     const supabase = createSupabaseClient()
//     if (!author) throw new Error('Author ID is required')

//     const { data, error } = await supabase
//         .from('companions')
//         .select()
//         .eq('author', author)

//     if (error || !data || data.length === 0) {
//         throw new Error(error?.message || 'No companions found for this author')
//     }

//     return data;
// }

// export const deleteCompanion = async (id: string) => {
//     const supabase = createSupabaseClient()
//     if (!id) throw new Error('Companion ID is required')

//     const { data, error } = await supabase
//         .from('companions')
//         .delete()
//         .eq('id', id)
//         .select()

//     if (error || !data || data.length === 0) {
//         throw new Error(error?.message || 'Failed to delete companion')
//     }

//     return data[0];
// }

// export const updateCompanion = async (id: string, formData: UpdateCompanion) => {
//     const supabase = createSupabaseClient()
//     if (!id) throw new Error('Companion ID is required')

//     const { data, error } = await supabase
//         .from('companions')
//         .update(formData)
//         .eq('id', id)
//         .select()

//     if (error || !data || data.length === 0) {
//         throw new Error(error?.message || 'Failed to update companion')
//     }

//     return data[0];
// }