const postUrl = "http://localhost:3000/api/posts";
const newPostUrl = "http://localhost:3000/api/posts/new";

function getPosts() {
  fetch(postUrl)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        let outerList = document.getElementById("outerList");
        let post = document.createElement("li");
        post.innerHTML = data[i].post;
        let line = document.createElement("hr");
        outerList.appendChild(post);
        outerList.appendChild(line);
      }
    });
}

function newPost() {
  const url = "http://localhost:3000/api/posts/new";
  let newPostElement = document.getElementById("new-post");
  let post = newPostElement.value;
  const userData = {
    post: post,
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((userData) => {
      console.log(userData);
      let outerList = document.getElementById("outerList");
      let post = document.createElement("li");
      post.innerHTML = userData;
      outerList.appendChild(post);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Your Session Expired");
      document.location.href = "/login";
    });
  newPostElement.value = "";
}

function logout() {
  const url = "http://localhost:3000/api/clear";
  fetch(url, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((serverResponse) => {
      console.log(serverResponse);
      document.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
