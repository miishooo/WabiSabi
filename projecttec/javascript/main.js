document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initScrollTop();

  if (document.body.classList.contains("home")) {
    initHome();
    showWelcomeAlert();
  }

  if (document.body.classList.contains("destinations")) initDestinations();
  if (document.body.classList.contains("contact")) initContact();
});

function initHome() {
  var box = document.getElementById("welcomeBox");
  if (!box) return;


}
function showWelcomeAlert() {
  var overlay = document.getElementById("overlay");
  var box = document.getElementById("backBox");
  var btn = document.getElementById("backBtn");

  if (!overlay || !box || !btn) return;

  var enter = confirm(
    "🎉 Welcome to our project!\n\nClick OK to enter and explore."
  );

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

  var x = Math.random() * maxX;
  var y = Math.random() * maxY;

  box.style.left = x + "px";
  box.style.top = y + "px";
}

function initDestinations() {}

function initContact() {
  var form = document.getElementById("contactForm");
  var msgBox = document.getElementById("formMsg");
  if (!form || !msgBox) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var subject = document.getElementById("subject").value;
    var comment = document.getElementById("comment").value.trim();

    var errors = [];

    if (!name) errors.push("Name is required");
    if (!email) errors.push("Email is required");
    if (email && !isValidEmail(email)) errors.push("Invalid email format");
    if (!subject) errors.push("Please select a subject");
    if (!comment) errors.push("Comment is required");
    if (comment && comment.length < 10)
      errors.push("Comment must be at least 10 characters");

    if (errors.length > 0) {
      msgBox.innerHTML = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
      return;
    }

    msgBox.innerHTML = "<p>✅ Comment sent successfully</p>";
    form.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

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
