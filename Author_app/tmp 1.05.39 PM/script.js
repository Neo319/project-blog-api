const postList = document.getElementById("postList");

const getPosts = async function () {
  console.log("getPosts Runs");

  try {
    await fetch("http://localhost:3000/api", {
      mode: "cors",
    }).then((response) => {
      console.log(response.json());
    });
  } catch (err) {
    console.log(err);
  }
};

getPosts();
