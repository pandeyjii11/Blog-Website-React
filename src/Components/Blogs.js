import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Spinner from "./Spinner";
import BlogDetails from "./BlogDetails";

const Blogs = () => {

    const { posts, loading } = useContext(AppContext);

    return(
        <div className="my-[100px] flex flex-col gap-y-10 my-4">
            {
                loading? 
                (<Spinner/>): 
                (
                    posts.length === 0? 
                    (<div>
                        <p className="font-bold text-3xl text-center my-[200px]">
                            No Post Available
                        </p>
                    </div> ): 
                    (
                        posts.map( (post) => {
                            return <BlogDetails key={post.id} post={post}/>
                        })
                    )
                )
            }
        </div>
    )
}

export default Blogs;