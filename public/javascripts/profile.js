function getData() {
  fetch("http://localhost:3000/api/userprofile")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("firstName").innerHTML = data[0].firstName;
      document.getElementById("lastName").innerHTML = data[0].lastName;
    });
}
