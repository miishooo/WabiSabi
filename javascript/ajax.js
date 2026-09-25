let allData = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

fetch("../data/destinations.json")
  .then(response => response.json())
  .then(data => {
    allData = data;
    displayCards(allData);
    setupFilters();
  })
  .catch(err => console.log(err));

function setupFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      let type = btn.dataset.type;

      if (type === "All") {
        displayCards(allData);
      }
      else if (type === "Favorites") {
        let favItems = allData.filter(item => favorites.includes(item.id));
        displayCards(favItems);
      }
      else {
        let filtered = allData.filter(item => item.type === type);
        displayCards(filtered);
      }
    });
  });
}
function displayCards(arr) {
  let gallery = document.getElementById("gallery");
  if (!gallery) return;

  gallery.innerHTML = "";

  arr.forEach(item => {
    gallery.innerHTML += `
      <div class="card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.type}</p>
        <p>${item.desc}</p>
        <button class="fav-btn" data-id="${item.id}">🤍</button>
      </div>
    `;
  });

  setupFavorites();
}

function setupFavorites() {
  document.querySelectorAll(".fav-btn").forEach(btn => {
    let id = btn.dataset.id;

    if (favorites.includes(id)) {
      btn.textContent = "❤️";
    }

    btn.addEventListener("click", () => {
      if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
        btn.textContent = "🤍";
      } else {
        favorites.push(id);
        btn.textContent = "❤️";
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });
}
