const url = "http://localhost:3000/api/auth";
function authenticate() {
  let usernameValue = document.getElementById("username").value;
  let passwordValue = document.getElementById("password").value;
  let userData = {
    userName: usernameValue,
    password: passwordValue,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((serverResponse) => {
      if (serverResponse.valid === true) {
        document.location.href = "display.html";
      }
    })
    .catch((error) => {
      alert("Wrong Credentials !");
    });
}
