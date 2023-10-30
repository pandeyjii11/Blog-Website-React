import React, { useContext, useEffect, useState } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { baseUrl } from "../baseUrl";
import Header from "../Components/Header";
import Spinner from "../Components/Spinner";
import BlogDetails from "../Components/BlogDetails";

const BlogPage = () => {

    const [blog, setBlog] = useState(null);
    const [relatedBlog, setRelatedBlog] = useState([]);

    const location = useLocation();
    const blogId = location.pathname.split("/").at(-1);

    const navigation = useNavigate();


    const {loading, setLoading} = useContext(AppContext);

    const newBaseUrl = "https://codehelp-apis.vercel.app/api/get-blog"

    async function fetchRelatedBlogs() {
        setLoading(true);

        let url = `${newBaseUrl}?blogId=${blogId}`;

        try {
            const response = await fetch(url);
            const output = await response.json();
            setBlog(output.blog);
            setRelatedBlog(output.relatedBlogs);
        }
        catch(error) {
            console.log("Something went wrong");
            setBlog(null);
            setRelatedBlog([]);
        }
        setLoading(false);
    }

    useEffect( () => {
        if(blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname]);

    return(
        <div  className="my-[100px]">
            <Header/>
            <div className="w-11/12 mx-auto">
                <button
                className="border-2 border-gray-300 py-1 px-4 rounded-md mb-6"
                onClick={() => navigation(-1)}
                >
                    Back
                </button>
            </div>

            {
                loading? <Spinner/> :
                blog? 
                <div>
                    <BlogDetails post = {blog}/>

                    <h2 className="text-2xl font-bold my-10 flex justify-center">
                        Related Blogs
                    </h2>

                    <div className="flex flex-col gap-y-8">
                        {
                            relatedBlog.map( (post) => {
                                return <div><BlogDetails key={post.id} post={post}/></div>
                            })
                        }
                    </div>



                </div>
                : 
                <p>No Post Available</p>
            }

            
        </div>
    )
}

export default BlogPage;