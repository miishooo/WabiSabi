document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initScrollTop();
  initWelcomeBack();

  if (document.body.classList.contains("home")) {
    initHome();
    showWelcomeAlert();
	initWeather();
initDeviceAndJapanTime();

  }

  if (document.body.classList.contains("destinations")) initDestinations();
  if (document.body.classList.contains("contact")) initContact();
});

function initContact() {
  var form = document.getElementById("contactForm");
  var msgBox = document.getElementById("formMsg");
  if (!form || !msgBox) return;

  var nameEl = document.getElementById("name");
  var emailEl = document.getElementById("email");
  var subjectEl = document.getElementById("subject");
  var commentEl = document.getElementById("comment");

  if (!nameEl || !emailEl || !subjectEl || !commentEl) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = nameEl.value.trim();
    var email = emailEl.value.trim();
    var subject = subjectEl.value;
    var comment = commentEl.value.trim();

    var errors = [];

    if (!name) errors.push("Name is required");
    if (!email) errors.push("Email is required");
    if (email && !isValidEmail(email)) errors.push("Invalid email format");
    if (!subject) errors.push("Please select a subject");
    if (!comment) errors.push("Comment is required");
    if (comment.length < 10) errors.push("Comment must be at least 10 characters");

    if (errors.length > 0) {
      msgBox.innerHTML = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
      return;
    }

    msgBox.innerHTML = "<p>✅ Comment sent successfully!</p>";
    form.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function initHome() {
  var box = document.getElementById("welcomeBox");
  if (!box) return;
}

function showWelcomeAlert() {
  var overlay = document.getElementById("overlay");
  var box = document.getElementById("backBox");
  var btn = document.getElementById("backBtn");
  if (!overlay || !box || !btn) return;

  var enter = confirm("🎉 Welcome to our project!\n\nClick OK to enter and explore.");

  if (enter) {
    overlay.style.display = "none";
    box.onmouseenter = null;
  } else {
    overlay.style.display = "block";
    moveBoxRandom(box);

    box.onmouseenter = function () {
      moveBoxRandom(box);
    };

    btn.onclick = function () {
      overlay.style.display = "none";
      box.onmouseenter = null;
    };
  }
}

function moveBoxRandom(box) {
  var maxX = window.innerWidth - box.offsetWidth;
  var maxY = window.innerHeight - box.offsetHeight;

  var x = Math.random() * Math.max(0, maxX);
  var y = Math.random() * Math.max(0, maxY);

  box.style.left = x + "px";
  box.style.top = y + "px";
}

function initDestinations() {}

function initTheme() {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;

  function updateIcon() {
    var isDark = document.body.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
  }

  var saved = localStorage.getItem("theme");
  if (saved === "dark") document.body.setAttribute("data-theme", "dark");
  else document.body.removeAttribute("data-theme");

  updateIcon();

  btn.addEventListener("click", function () {
    var isDark = document.body.getAttribute("data-theme") === "dark";

    if (isDark) {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }

    updateIcon();
  });
}
function initScrollTop() {
  var btn = document.getElementById("toTop");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initWelcomeBack() {
  var visited = localStorage.getItem("visited");
  if (!visited) {
    localStorage.setItem("visited", "yes");
    console.log("First visit 🌸");
  } else {
    console.log("Welcome back 💗");
  }
}
function initWeather() {
  var box = document.getElementById("weatherBox");
  if (!box) return;

  var url =
    "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true";

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var temp = data.current_weather.temperature;
      var wind = data.current_weather.windspeed;

      box.innerHTML =
        "<h3>Tokyo Weather 🌤️</h3>" +
        "<p>Temperature: " + temp + "°C</p>" +
        "<p>Wind: " + wind + " km/h</p>";
    })
    .catch(function () {
      box.textContent = "Weather data not available";
    });
}
function initDeviceAndJapanTime() {
  var local = document.getElementById("localTime");
  var japan = document.getElementById("japanTime");
  if (!local || !japan) return;

  function updateTime() {
    var now = new Date();

    local.textContent =
      now.getHours().toString().padStart(2, "0") + ":" +
      now.getMinutes().toString().padStart(2, "0") + ":" +
      now.getSeconds().toString().padStart(2, "0");
    japan.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(now);
  }

  updateTime();
  setInterval(updateTime, 1000);
}
