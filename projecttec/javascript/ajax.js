let allData = []; 

fetch("../data/destinations.json")
  .then(response => response.json())
  .then(data => {
    allData = data;
    displayCards(allData);
    setupFilters();
  });
    displayCards(data);

    let buttons = document.querySelectorAll(".filters button");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        let filter = btn.dataset.type;
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

function setupFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      let type = btn.dataset.type; 
      if (type === "All") {
        displayCards(allData); 
      } else {
        let filtered = allData.filter(item => item.type === type);
        displayCards(filtered); 
      }
    });
  });
}
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
        <button class="fav-btn" data-id="${item.id}">🤍</button>
      </div>
    `;
  });

  setupFavorites();
}
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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