import { INewPost, INewUser } from '@/types'
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createNewUser, signInAccount, signOutAccount } from '../appwrite/api'


// Sign up user
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createNewUser(user),
    })
}

// log in / sign in user
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string,
            password: string
        }) => signInAccount(user),
    })
}

// SignOut User
export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: () => signOutAccount(),
    })
}







