import { useState, useEffect } from "react";
import "./App.css";

// //getting posts
// const { posts } = (async () => {
//   const data = await fetch("http://localhost:3000/api/posts");
//   const jsonData = await data.json();
//   console.log(jsonData.posts);
//   return jsonData.posts;
// })();

function App() {
  //getting posts
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts/");
        const jsonData = await response.json();
        console.log(jsonData.posts);
        setPosts(Array.from(jsonData.posts));
      } catch (err) {
        console.error("error fetching posts", err);
      }
    };

    // calls above defined function
    fetchPosts();
    // ensure effect is called only when page loads.
  }, []);

  return (
    <>
      <h1>Project Blog API</h1>

      <h2>Posts List:</h2>

      <ul>
        <li>placeholder</li>
        {posts ? (
          posts.map((post, index) => {
            return <li key={index}>{post.title}</li>;
          })
        ) : (
          <li>Loading Posts...</li>
        )}
      </ul>

      <footer>
        <span>
          Creator: Alex N.
          <a target="blank" href="https://github.com/Neo319">
            {" "}
            (github)
          </a>
        </span>
      </footer>
    </>
  );
}

export default App;
