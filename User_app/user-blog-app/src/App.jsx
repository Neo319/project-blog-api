// import { useState, useEffect } from "react";
import "./App.css";
import useFetchPosts from "./hooks/useFetchPosts";
("./hooks/useFetchPosts");

function App() {
  //getting posts
  const { posts, loading } = useFetchPosts("http://localhost:3000/api/posts");

  // TODO:
  // -place posts list in a dropdown list
  // -render main article or landing page using state
  // -stylize article content

  return (
    <>
      <h1>Project Blog API</h1>
      <p>
        A part of The Odin Project Curriculum, this project integrates a backend
        app that serves request made through this frontend app. Users can view
        and comment on blog posts, and registered authors can create, read,
        update, and delete blog posts.{" "}
      </p>
      <ul>
        {/* TODO: place links in nav dropdown list */}
        <li>
          <a target="blank" href="https://theodinproject.com">
            The Odin Project homepage
          </a>
        </li>
        <a
          target="blank"
          href="https://www.theodinproject.com/lessons/node-path-nodejs-blog-api"
        >
          Link to relevant lesson
        </a>
      </ul>

      {/* TEMP: list posts before placing in nav dropdown list */}
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

      {/* TODO: render selected post through state, or 'landing page' for blog */}

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
