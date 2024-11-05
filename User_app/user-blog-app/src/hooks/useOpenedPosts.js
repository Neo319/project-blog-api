import { useState, useEffect } from "react";

const useFetchPosts = (url, postId) => {
  const [post, setPost] = useState(null);
  const [loadingPost, setLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const response = await fetch(url + "/" + postId);
          const jsonData = await response.json();

          setPost(jsonData);
        } catch (err) {
          console.error("error fetching posts", err);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [url, postId]);

  return { post, loadingPost };
};

export default useFetchPosts;
