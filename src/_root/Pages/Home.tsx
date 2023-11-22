import LoadingPrompt from "@/components/shared/loadingPrompt"
import { useGetRecentPosts } from "@/lib/React-Query/querysAndMutation"
import { Models } from "appwrite"
import { useEffect, useState } from "react"
import { HashLoader } from "react-spinners"

function Home() {
  const { data: posts, isPending: isPostsLoading, isError: isPostError } = useGetRecentPosts()
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    if(!isPostsLoading){
      console.log(posts)

    }
  },[])
  return (

    <div className="home-container flex">
      <h1 className=" w-full h3-bold text-left md:h2-bold">Home Feed</h1>
      <div className={`${loading ? ('h-[80%] flex justify-center items-center flex-col') : ('flex')} `}>
        {
          isPostsLoading ? (
            // hashloader
            <>
              <div className="">
                <HashLoader
                  color={"#fff"}
                  loading={loading}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
              <p className="mt-5"><LoadingPrompt /></p>
            </>

          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  {post.caption}
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>

  )
}

export default Home