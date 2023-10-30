import React from "react";
import { NavLink } from "react-router-dom";

const BlogDetails = ({post}) => {
    return(
        <div className="max-w-3xl mx-auto w-11/12">
            <NavLink to={`blog/${post.id}`}>
                <span className="font-bold text-lg cursor-pointer hover:underline">{post.title}</span>
            </NavLink>

            <p className="text-sm my-1">
                By <span className="italic">{post.author}</span> on {" "}
                <span>
                    <NavLink to={`/categories/${post.category.replaceAll(" ", "-")}`}>
                        <span className="font-semibold underline cursor-pointer">{post.category}</span>
                    </NavLink>
                </span>
            </p>
            <p className="text-sm">
                Posted on <span>{post.date}</span>
            </p>
            <p className="mt-4 mb-2">
                {post.content}
            </p>
            <div>
                {
                    post.tags.map( (tag, index) => {
                        return <NavLink key={index} to={`tags/${tag.replaceAll(" ", "-")}`}>
                            <span className="text-blue-700 font-semibold text-xs underline cursor-pointer">{`#${tag} `}</span>
                        </NavLink>
                    })
                }
            </div>
        </div>
    )
}

export default BlogDetails;