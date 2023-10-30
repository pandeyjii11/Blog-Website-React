import { createContext, useState } from "react";

import {baseUrl} from "../baseUrl"
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

function AppContextProvider ({children}) {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [posts, setPosts] = useState([]);

    const navigation = useNavigate();

    async function fetchBlogPost(page = 1, tag=null, category) {
        setLoading(true);

        let url = `${baseUrl}?page=${page}`;
        
        if(tag) {
            url+=`&tag=${tag}`;
        }

        if(category) {
            url+=`&category=${category}`;
        }

        try {

            const response = await fetch(url);


            const data = await response.json();

            if(!data.posts || data.posts.length === 0)
            {
                throw new Error("Something went wrong");
            }
            
            setPage(data.page);

            setPosts(data.posts);

            setTotalPage(data.totalPages);
        }
        catch(error) {
            console.log("Error in Fetching Data");
            setPage(1);
            setPage([]);
            setTotalPage(null);
        }
        setLoading(false);
    }

    function pageChangeHandle(page) {
        setPage(page);
        navigation({search: `?page=${page}`});
    }

    const value ={
        loading,
        setLoading,
        page,
        setPage,
        totalPage,
        setTotalPage,
        posts,
        setPosts,
        fetchBlogPost,
        pageChangeHandle
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;