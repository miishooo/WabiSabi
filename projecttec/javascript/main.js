document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initScrollTop();
  initWelcomeBack();

  if (document.body.classList.contains("home")) {
    initHome();
    showWelcomeAlert();
  }

  if (document.body.classList.contains("destinations")) {
    initDestinations();
    initWcCard(); 
  }

  if (document.body.classList.contains("contact")) {
    initContact();
  }
});

function initHome() {
}

function initContact() {
  var form = document.getElementById("contactForm");
  var msg = document.getElementById("formMsg");
  var error = document.getElementById("emailError");

  if (!form || !msg) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var nameEl = document.getElementById("name");
    var emailEl = document.getElementById("email");
    var confirmEl = document.getElementById("confirmEmail"); // لو موجود
    var subjectEl = document.getElementById("subject");
    var commentEl = document.getElementById("comment");

    var name = nameEl ? nameEl.value.trim() : "";
    var email1 = emailEl ? emailEl.value.trim() : "";
    var email2 = confirmEl ? confirmEl.value.trim() : email1; // إذا ما عندك confirmEmail خليه نفس email
    var subject = subjectEl ? subjectEl.value : "";
    var comment = commentEl ? commentEl.value.trim() : "";

    if (error) error.style.display = "none";
    msg.innerHTML = "";

    if (email1 !== email2) {
      if (error) error.style.display = "inline";
      return;
    }

    var errors = [];
    if (!name) errors.push("Name is required");
    if (!email1) errors.push("Email is required");
    if (email1 && !isValidEmail(email1)) errors.push("Invalid email format");
    if (!subject) errors.push("Please select a subject");
    if (!comment) errors.push("Comment is required");
    if (comment && comment.length < 10) errors.push("Comment must be at least 10 characters");

    if (errors.length > 0) {
      msg.innerHTML = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
      return;
    }

    msg.innerHTML = "<p style='color:green;'>✅ Your form has been successfully submitted</p>";
    setTimeout(function () { msg.innerHTML = ""; }, 3000);
    form.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
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

function showWelcomeAlert() {
  var overlay = document.getElementById("overlay");
  var box = document.getElementById("backBox");
  var btn = document.getElementById("backBtn");
  if (!overlay || !box || !btn) return;

  var enter = confirm("🎉 Welcome to our project!\n\nClick OK to enter and explore.");
  if (enter) {
    overlay.style.display = "none";
    box.onmouseenter = null;
    return;
  }

  overlay.style.display = "block";
  moveBoxRandom(box);

  box.onmouseenter = function () { moveBoxRandom(box); };
  btn.onclick = function () {
    overlay.style.display = "none";
    box.onmouseenter = null;
  };
}

function moveBoxRandom(box) {
  var maxX = window.innerWidth - box.offsetWidth;
  var maxY = window.innerHeight - box.offsetHeight;
  var x = Math.random() * Math.max(0, maxX);
  var y = Math.random() * Math.max(0, maxY);
  box.style.left = x + "px";
  box.style.top = y + "px";
}

function initWcCard() {
  initWcWeather();
}

function initWcWeather() {
  fetchWeather(24.7136, 46.6753, "weatherSA"); // Riyadh
  fetchWeather(35.6895, 139.6917, "weatherJP"); // Tokyo
}

function fetchWeather(lat, lon, elementId) {
  var el = document.getElementById(elementId);
  if (!el) return;

  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +
            "&longitude=" + lon + "&current_weather=true";

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var w = data.current_weather;
      el.textContent = w.temperature + "°C | Wind " + w.windspeed + " km/h";
    })
    .catch(function () { el.textContent = "N/A"; });
}
