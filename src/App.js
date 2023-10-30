
import { useContext, useEffect } from 'react';
import './App.css';
import Blogs from './Components/Blogs';
import Header from './Components/Header';
import Pagination from './Components/Pagination';
import { AppContext } from './Context/AppContext';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import Home from './Pages/Home';
import TagPage from './Pages/TagPage';
import BlogPage from './Pages/BlogPage';
import CategoryPage from './Pages/CategoryPage';

function App() {
 
  const {fetchBlogPost} = useContext(AppContext);
  const [searchParameter, setSearchParameter] = useSearchParams();
  const location = useLocation();

  useEffect( () => {
    const page = searchParameter.get("page") ?? 1;

    if(location.pathname.includes("tags")) {
      // iska matlab tag wala page show krna hai
      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPost(Number(page), tag);
    }
    else if(location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPost(Number(page), null,  category);
    }
    else {
      fetchBlogPost(Number(page));
    }

  }, [location.pathname, location.search]);
  
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tags/:tag' element={<TagPage/>}/>
      <Route path='/blog/:blogId' element={<BlogPage/>}/>
      <Route path='/categories/:category' element={<CategoryPage/>}/>
    </Routes>
  );
}

export default App;
