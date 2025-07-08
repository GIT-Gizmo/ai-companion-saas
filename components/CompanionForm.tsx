'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { subjects } from '@/constants';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
    name: z.string().min(2, { message: 'Companion name is required' }).max(30),
    subject: z.string().min(2, { message: 'Subject title is required' }).max(20),
    topic: z.string().min(2, { message: 'Topic is required' }).max(50),
    voice: z.string().min(2, { message: 'Voice type is required' }).max(10),
    style: z.string().min(2, { message: 'Conversation style is required' }).max(50),
    duration: z.coerce.number().min(2, { message: 'Duration is required' }).max(50),
})

const NewCompanion = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 10, // Default duration set to 10 minutes
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <h1 className="text-2xl font-bold mb-4">Companion Builder</h1>

                {/* Name field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion name</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex. Alge-Brah the Math Guru" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Subject field */}
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                key={subject}
                                                value={subject}
                                                className="capitalize">
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Topic field */}
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What will your companion help with?</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Ex. Derivatives & Integrals" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Voice field */}
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What voice would you like your companion to have?</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the voice you prefer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            value="male"
                                        >
                                            Male
                                        </SelectItem>
                                        <SelectItem
                                            value="female"
                                        >
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Style field */}
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                What style of conversation would you like?
                                <span className="text-xs text-muted-foreground"> (e.g. casual, formal, fun)</span>
                            </FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the style you prefer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            value="formal"
                                        >
                                            Formal
                                        </SelectItem>
                                        <SelectItem
                                            value="casual"
                                        >
                                            Casual
                                        </SelectItem>
                                        <SelectItem
                                            value="fun"
                                        >
                                            Fun
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Duration field */}
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated session duration in minutes</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="e.g 10" {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full cursor-pointer'>Create companion</Button>
            </form>
        </Form>
    )
}

export default NewCompanion