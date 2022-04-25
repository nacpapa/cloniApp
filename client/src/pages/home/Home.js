import { useEffect, useState } from 'react';

import Posts from '../../components/posts/Posts';

import './home.css';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);

  // BUSCAMOS EN LA DB A TRAVES DE AXIOS
  // TODOS LOS POSTS A RENDERIZAR Y SE LOS PASAMOS COMO
  // PARAMETRO A <Posts/>

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
