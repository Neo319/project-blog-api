const postList = document.getElementById("postList");

const getPosts = async function () {
  console.log("getPosts Runs");

  try {
    const result = await fetch("http://localhost:3000/api/posts/", {
      mode: "cors",
    });
    return result.json();
  } catch (err) {
    console.log(err);
  }
};

const populateList = (async function () {
  const data = await getPosts();
  const posts = data.posts;

  posts.map((post) => {
    console.log(post);

    var liElement = document.createElement("li");
    liElement.textContent = post.title;

    postList.appendChild(liElement);
  });
})();
