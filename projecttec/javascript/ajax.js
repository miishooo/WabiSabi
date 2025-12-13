console.log("AJAX FILE IS WORKING");

fetch("data/destinations.json")
  .then(res => res.json())
  .then(data => {
    displayCards(data);

    let buttons = document.querySelectorAll(".filters button");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        let filter = btn.dataset.filter;

        if (filter === "All") {
          displayCards(data);
        } else {
          let filtered = data.filter(item => item.type === filter);
          displayCards(filtered);
        }
      });
      });
    });
  });

function displayCards(arr) {
  let gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  arr.forEach(item => {
    gallery.innerHTML += `
      <div class="card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.type}</p>
        <p>${item.desc}</p>
      </div>
    `;
  });
}
