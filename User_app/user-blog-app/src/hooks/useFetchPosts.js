import { useState, useEffect } from "react";

const useFetchPosts = (url) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        console.log(jsonData.posts);
        setPosts(Array.from(jsonData.posts));
      } catch (err) {
        console.error("error fetching posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [url]);

  return { posts, loading };
};

export default useFetchPosts;
