import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID, Query } from "appwrite";

export async function createNewUser(user: INewUser) {
    try {
        const newUser = await account.create(ID.unique(), user.email, user.password, user.name)

        if (!newUser) return Error;

        const userAvatar = avatars.getInitials(user.name)
        const dbUser = await saveUserToDb({
            accountId: newUser.$id,
            name: newUser.name,
            email: newUser.email,
            imageUrl: userAvatar,
            username: user.username
        })

        return dbUser;
    } catch (error) {
        console.log('createNewUser :: error : ', error);
        return error
    }
}

export async function saveUserToDb(user: {
    accountId: string,
    name: string,
    email: string,
    imageUrl: URL,
    username?: string
}) {
    try {
        const storeInDbUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.user_bucketId,
            ID.unique(),
            user,
        )
        return storeInDbUser
    } catch (error) {
        console.log(error)
    }
}

export async function signInAccount(user: { email: string, password: string }) {
    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session;

    } catch (error) {
        console.log(error)
        return error;
    }
}



export async function getCurrentUser() {
    try {
        const userDetails = await account.get()
        if (!userDetails) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.user_bucketId,
            [Query.equal('accountId', userDetails.$id)]
            )
         if(!currentUser) throw Error
            
            
            //returns all data of user 
        return currentUser.documents[0];

    } catch (error) {
        console.log(error)
    }
}


// appwrite function to sign out the existing user

export async function signOutAccount() {
    try {
        const session = await account.deleteSession('current')
        return session;
    } catch (error) {
        console.log(error)
    }
}