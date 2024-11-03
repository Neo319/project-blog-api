// import { useState, useEffect } from "react";
import "./App.css";
import useFetchPosts from "./hooks/useFetchPosts";
("./hooks/useFetchPosts");

function App() {
  //getting posts
  const { posts, loading } = useFetchPosts("http://localhost:3000/api/posts");

  return (
    <>
      <h1>Project Blog API</h1>

      <h2>Posts List:</h2>

      <ul>
        <li>placeholder</li>
        {loading ? (
          <li> Loading Posts... </li>
        ) : (
          posts.map((post, index) => {
            return <li key={index}>{post.title}</li>;
          })
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
