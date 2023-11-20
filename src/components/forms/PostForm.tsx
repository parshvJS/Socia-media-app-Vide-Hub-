import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import FileUploder from '../shared/FileUploder'

const formSchema = z.object({
    username: z.string().min(2).max(50),
})





const PostForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }


    return (
        // <div className="flex w-full justify-center items-center">
        <Form {...form}>


            <form className='flex flex-col items-center w-full gap-9 justify-center max-w-4xl' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem className='w-[90%]'>
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <Textarea className='bg-slate-800 border-gray-700' placeholder="Caption Of Post" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="File"
                    render={({ field }) => (
                        <FormItem className='w-[90%]'>
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <FileUploder />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Location"
                    render={({ field }) => (
                        <FormItem className='w-[90%]'>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input className='bg-slate-800 border-gray-700' placeholder="USA ,Russia Etc." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Location"
                    render={({ field }) => (
                        <FormItem className='w-[90%]'>
                            <FormLabel>Add Tags  (Sapreted By Comma " , ")</FormLabel>
                            <FormControl>
                                <Input className='bg-slate-800 border-gray-700' placeholder="Art,Recipe,Creative Etc." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <div className="flex justify-end w-full max-w-[50rem] gap-4 ">
                    <TooltipProvider>
                        <Tooltip  delayDuration={100}>
                            <TooltipTrigger> <Button type="button" className='bg-slate-800 border-gray-700 w-[80px] hover:bg-slate-700 h-10'>draft</Button></TooltipTrigger>
                            <TooltipContent>
                                <p>Save all data to draft</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button type="submit" className='bg-primary-500 whitespace-nowrap w-[80px] hover:bg-primary-600 h-10'>Submit</Button>


                </div>
            </form>
        </Form>

        // </div>

    )
}

export default PostForm