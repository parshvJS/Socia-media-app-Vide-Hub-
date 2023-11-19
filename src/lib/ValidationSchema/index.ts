import * as z from "zod"

export const signUpForm  = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8,{message : 'Password Must Be 8 characters' }).max(50),
    username: z.string().min(2).max(50),
  })
  
export const signInForm  = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message : 'Password Must Be 8 characters' }).max(50),
  })
  