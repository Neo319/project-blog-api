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
    var liElement = document.createElement("li");
    var liContent = document.createElement("p");

    //converting date
    var isoDate = new Date(post.date);

    liContent.innerHTML = `<p>
      ${post.title} 
      <br /> 
      <b>author: </b>${post.User.username} 
      <br />
      <b>posted: </b>${isoDate.toLocaleString()}
    </p>`;
    // todo: add link to article,

    liElement.appendChild(liContent);
    postList.appendChild(liElement);
  });
})();
