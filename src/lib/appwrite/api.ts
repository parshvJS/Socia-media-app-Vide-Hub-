import { INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";
import { useUserContext } from "@/context/authContext";

export const result = avatars.getInitials();

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

export async function checkForCurrentUser() {
try {
        const userDetails = await account.get() 
        return userDetails
} catch (error) {
    console.log(error)
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
        if (!currentUser) throw Error


        //returns all data of user 
        return currentUser.documents[0];

    } catch (error) {
        console.log(error)
    }
}


// appwrite function to sign out the existing user

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    // Log the error details
    console.error('Error signing out:', error);

}
}



// Posts Services



export async function uploadFile(file: File) {
    try {
        const fileUpload = storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )
        return fileUpload
    } catch (error) {
        console.log(error)
        return error
    }
}

// get file preview with appwrite

export function getFilePreview(fileId: string) {
    try {
        const filePreview = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            'top',
            100
        )
        if (!filePreview) throw Error;
        return filePreview
    } catch (error) {
        console.log(error)
    }
}

export async function createNewPost(post: INewPost) {
    try {

        // upload file to appwrite storage
        const uploadImage = await uploadFile(post.file[0])
        if (!uploadImage) throw Error;

        //get file url from getfilePrevier
        const imageUrlByPreview = getFilePreview(uploadImage.$id)
        if (!imageUrlByPreview) {
            await storage.deleteFile(appwriteConfig.storageId, uploadImage.$id)
        }
        if (!getFilePreview) throw Error;
        const tags = post.tags?.replace(/ /g, "").split(",") || [];
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.post_bucketId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: imageUrlByPreview,
                imageId: uploadImage.$id,
                location: post.location,
                tags: tags,
            })

            if (!newPost) {
                await storage.deleteFile(appwriteConfig.storageId,uploadImage.$id);
                throw Error;
              }
          

    }
    catch (error) {
        console.log(error);

    }
}

export async function getRecentPost(){
    const posts=await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.post_bucketId,
        [Query.orderDesc('$createdAt'),Query.limit(30)]
    )
    if(!posts) throw Error;
    return posts
}

