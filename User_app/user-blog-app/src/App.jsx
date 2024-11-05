import { useState } from "react";
import "./App.css";

// hooks
import useFetchPosts from "./hooks/useFetchPosts";
import useOpenedPosts from "./hooks/useOpenedPosts";

// components
import articleWindow from "./components/articleWindow";

function App() {
  const [postId, setPostId] = useState(null);

  //getting posts
  const { posts, loading } = useFetchPosts("http://localhost:3000/api/posts");
  // track opened post
  const { post, loadingPost } = useOpenedPosts(
    "http://localhost:3000/api/posts",
    postId
  );

  // TODO:
  // -place posts list in a dropdown list
  // -render main article or landing page using state
  // -stylize article content

  // components to create:
  //-nav component: general links and links to posts
  //-viewing articles link

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
        <li>
          <a
            target="blank"
            href="https://www.theodinproject.com/lessons/node-path-nodejs-blog-api"
          >
            Link to relevant lesson
          </a>
        </li>
      </ul>

      {/* TEMP: list posts before placing in nav dropdown list */}
      <h2>Posts List:</h2>

      <ul>
        {loading ? (
          <li> Loading Posts... </li>
        ) : (
          posts.map((post, index) => {
            return (
              <li key={index}>
                <a
                  id={"open" + post.id}
                  onClick={() => {
                    setPostId(post.id);
                  }}
                >
                  {post.title}
                </a>
              </li>
            );
          })
        )}
      </ul>

      {/* TODO: render selected post through state, or 'landing page' for blog */}

      <div id="content">{articleWindow(post, loadingPost)}</div>

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
