let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  const toyCollection = document.getElementById("toy-collection");
  const baseURL = "http://localhost:3000/toys";

  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => appendToDOM(data));

  function appendToDOM(data) {
    // debugger
    for (toy of data) {
      let div = document.createElement("div");
      div.setAttribute("class", "card");

      let h2 = document.createElement("h2");
      h2.innerHTML = toy["name"];

      div.appendChild(h2);

      let img = document.createElement("img");
      img.setAttribute("src", toy["image"]);
      img.setAttribute("class", "toy-avatar");
      div.appendChild(img);

      let p = document.createElement("p");
      p.innerHTML = toy["likes"];
      div.appendChild(p);

      let button = document.createElement("button");
      button.setAttribute("class", "like-btn");
      button.setAttribute("id", toy["id"]);

      button.innerHTML = "Like <3";
      button.addEventListener("click", (event) => {
        // debugger;
        let toyID = event.target.id;
        let toyLikes = parseInt(event.target.previousSibling.innerText);
        const configToy = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            likes: `${toyLikes + 1}`,
          }),
        };
        fetch(`${baseURL}/${toyID}`, configToy)
          .then((response) => response.json())
          .then((data) => p.innerHTML = data["likes"]);
      });
      div.appendChild(button);

      toyCollection.appendChild(div);
    }
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyForm.addEventListener("submit", (event) => {
    let name = event.target.name.value;
    let image = event.target.image.value;
    // debugger;

    const configData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0,
      }),
    };
    fetch(baseURL, configData)
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
});
