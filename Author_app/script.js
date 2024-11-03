const postList = document.getElementById("postList");

// ---- Check for existing login token
const loginToken = localStorage.getItem("token");
const login_div = document.getElementById("login_div");
let userData = {};
let userIsAuthor = false;

// logging out functionality
async function getUser() {
  console.log("getting user");

  const response = await fetch(`http://localhost:3000/api/user`, {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
    mode: "cors",
  });

  if (response.ok) return response;
  else {
    console.log("login failed -- ", response);
    return false;
  }
}

if (loginToken) {
  (async () => {
    //TODO: fetch user name when token exists
    const data = await getUser();
    const jsonData = await data.json();
    console.log(jsonData.data.user);

    if (!data) {
      console.log("login failed");
      localStorage.clear("token");
      return false;
    }

    userData = jsonData.data.user;

    // this controls permissions
    userIsAuthor = userData.isAuthor;

    login_div.innerHTML = `
    <span>User <b> ${userData.username} </b>, you are logged in!</span>
    <br />
    <button id="logout_button">Log Out</button>`;

    const logoutButton = document.getElementById("logout_button");
    logoutButton.addEventListener("click", () => {
      console.log("logout");
      localStorage.removeItem("token");
      window.location.reload();
    });
  })();
}

if (!loginToken) {
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
        "Content-type": "application/json",
      },
    });
    const data = await loginResult.json();

    // validate request result
    if (loginResult.ok) {
      console.log("request is ok.");
      console.log(data);
    } else {
      console.log("login failed.");
      return false;
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

// --- CREATE NEW POST FUNCTIONALITY ---
async function sendPost(data) {
  // collect & format data correctly
  const postBody = {
    authorId: userData.id,
    title: data[0],
    text: { article: data[1] },
  };

  const result = await fetch("http://localhost:3000/api/posts/", {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      Authorization: `Bearer ${loginToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
    mode: "cors",
  });

  console.log(result);
}

const sendPostForm = document.getElementById("post_form");
const sendPostButton = document.getElementById("send_post");

sendPostButton.addEventListener("click", (e) => {
  e.preventDefault();

  //manipulate data
  let elements = Array.from(sendPostForm.elements);
  let data = [elements[0].value, elements[1].value];

  sendPost(data);
});
