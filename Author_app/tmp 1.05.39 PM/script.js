const postList = document.getElementById("postList");

// ---- Check for existing login token
const isLoggedIn = localStorage.getItem("token");

const login_div = document.getElementById("login_div");

// logging out functionality
if (isLoggedIn) {
  //TODO: fetch user name when token exists

  login_div.innerHTML = `
    <span>You are logged in!</span>
    <br />
    <button id="logout_button">Log Out</button>`;

  const logoutButton = document.getElementById("logout_button");
  logoutButton.addEventListener("click", () => {
    console.log("logout");
    localStorage.removeItem("token");
  });
}

if (!isLoggedIn) {
  // Login functionality - placing login token in local storage

  const loginButton = document.getElementById("login_submit");
  const loginForm = document.getElementById("login_form");

  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("login plz");

    // get credentials entered
    const username = loginForm.elements[0].value;
    const password = loginForm.elements[1].value;

    // send request
    const loginResult = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await loginResult.json();

    // validate request result
    if (loginResult.ok) {
      console.log("request is ok.");
      console.log(data);
    } else {
      console.log("login failed.");
    }

    // save to local storage
    localStorage.setItem("token", data.token);
    window.location.reload();
  });
}

// ---- Listing posts functionality ----
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

  console.log(posts);

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
      <br />
      <b>public: </b>${post.isPublic}
    </p>
    <button id="update_post_${post.id}">Update Post...</button>`;

    // todo: add link to article,

    liElement.appendChild(liContent);
    postList.appendChild(liElement);
  });
})();

// NOTE: INFO REQUIRED FOR POSTING...
// curl -X POST -H "Authorization: Bearer >token<" -H "Content-Type: application/json" -d \
// '{"authorId": 1, "title": "newPost", "text": "{"article": "Hello! This is a sample post."}}' http://localhost:3000/api/posts/
