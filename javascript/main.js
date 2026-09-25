document.addEventListener("DOMContentLoaded", function () {
 
  console.log("✅ Welcome feature loaded");

  if (document.getElementById("overlay") && document.getElementById("backBox") && document.getElementById("backBtn")) {
    showWelcomeAlert();
  }
});

function showWelcomeAlert() {
  var overlay = document.getElementById("overlay");
  var box = document.getElementById("backBox");
  var btn = document.getElementById("backBtn");
  if (!overlay || !box || !btn) return;

  var enter = window.confirm("🎉 Welcome to Wabi-Sabi!\n\nPress OK to enter ✈️");

  if (enter) {
    overlay.style.display = "none";
    box.onmouseenter = null;
    return;
  }

  overlay.style.display = "block";
  moveBoxRandom(box);

  box.onmouseenter = function () {
    moveBoxRandom(box);
  };

  btn.onclick = function () {
    overlay.style.display = "none";
    showWelcomeAlert();
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

if (typeof initTheme === "function") initTheme();
if (typeof initScrollTop === "function") initScrollTop();
if (typeof initWelcomeBack === "function") initWelcomeBack();
if (typeof initWeather === "function") initWeather();
if (typeof initClocks === "function") initClocks();

if (document.body.classList.contains("home") && typeof initHome === "function") {
  initHome();
  showWelcomeAlert();
}

if (document.body.classList.contains("contact")) {
  initFlowerRating();
}

if (document.body.classList.contains("destinations") && typeof initDestinations === "function") {
  initDestinations();
  if (typeof initWcCard === "function") initWcCard();
}

if (typeof initContact === "function") initContact();


function initContact() {
  var form = document.getElementById("contactForm");
  var msg = document.getElementById("formMsg");
  var error = document.getElementById("emailError");

  if (!form || !msg) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var nameEl = document.getElementById("name");
    var emailEl = document.getElementById("email");
    var confirmEl = document.getElementById("confirmEmail");
    var subjectEl = document.getElementById("subject");
    var commentEl = document.getElementById("comment");

    var name = nameEl ? nameEl.value.trim() : "";
    var email1 = emailEl ? emailEl.value.trim() : "";
    var email2 = confirmEl ? confirmEl.value.trim() : email1;
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
    setTimeout(function () {
      msg.innerHTML = "";
    }, 3000);

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

  box.onmouseenter = function () {
    moveBoxRandom(box);
  };

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

function initWeather() {
  var sa = document.getElementById("weatherSA");
  var jp = document.getElementById("weatherJP");
  if (!sa || !jp) return;

  fetch("https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true")
    .then(res => res.json())
    .then(data => {
      var t = data.current_weather.temperature;
      var w = data.current_weather.windspeed;
      jp.textContent = t + "°C | Wind " + w + " km/h";
    });

  fetch("https://api.open-meteo.com/v1/forecast?latitude=24.7136&longitude=46.6753&current_weather=true")
    .then(res => res.json())
    .then(data => {
      var t = data.current_weather.temperature;
      var w = data.current_weather.windspeed;
      sa.textContent = t + "°C | Wind " + w + " km/h";
    });
}

function initClocks() {
  if (existsAll(["jpHour", "jpMinute", "jpSecond", "jpDigital"])) {
    initAnalogDigitalClock("Asia/Tokyo", "jpHour", "jpMinute", "jpSecond", "jpDigital");
  }

  if (existsAll(["saHour", "saMinute", "saSecond", "saDigital"])) {
    initAnalogDigitalClock("Asia/Riyadh", "saHour", "saMinute", "saSecond", "saDigital");
  }
}

function initAnalogDigitalClock(timeZone, hourId, minuteId, secondId, digitalId) {
  var hEl = document.getElementById(hourId);
  var mEl = document.getElementById(minuteId);
  var sEl = document.getElementById(secondId);
  var dEl = document.getElementById(digitalId);
  if (!hEl || !mEl || !sEl || !dEl) return;

  function update() {
    var now = new Date();

    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).formatToParts(now);

    var H = Number(parts.find(p => p.type === "hour").value);
    var M = Number(parts.find(p => p.type === "minute").value);
    var S = Number(parts.find(p => p.type === "second").value);

    dEl.textContent =
      String(H).padStart(2, "0") + ":" +
      String(M).padStart(2, "0") + ":" +
      String(S).padStart(2, "0");

    var hourDeg = (H % 12) * 30 + M * 0.5;
    var minDeg = M * 6 + S * 0.1;
    var secDeg = S * 6;

    hEl.style.transform = "translateX(-50%) rotate(" + hourDeg + "deg)";
    mEl.style.transform = "translateX(-50%) rotate(" + minDeg + "deg)";
    sEl.style.transform = "translateX(-50%) rotate(" + secDeg + "deg)";
  }

  update();
  setInterval(update, 1000);
}

function existsAll(ids) {
  return ids.every(id => document.getElementById(id));
}
let stars = document.querySelectorAll(".star");
let ratingInput = document.getElementById("ratingValue");

stars.forEach(star => {
  star.addEventListener("click", () => {
    let value = star.dataset.value;
    ratingInput.value = value;

    stars.forEach(s => {
      if (s.dataset.value <= value) {
        s.textContent = "⭐";
      } else {
        s.textContent = "☆";
      }
    });
  });
});
function initFlowerRating() {
  var box = document.getElementById("flowerRating");
  var msg = document.getElementById("ratingMsg");
  if (!box || !msg) return;

  var flowers = box.querySelectorAll(".flower");
  var selected = 0;

  function paint(n) {
    flowers.forEach(function (f, i) {
      f.textContent = (i < n) ? "✿" : "❀";
    });
  }

  flowers.forEach(function (flower, index) {

    flower.addEventListener("mouseenter", function () {
      paint(index + 1);
    });

    flower.addEventListener("mouseleave", function () {
      paint(selected);
    });

    flower.addEventListener("click", function () {
      selected = index + 1;
      paint(selected);
      msg.textContent = "Thanks! You rated us " + selected + "/5 ✿";
      localStorage.setItem("flowerRating", selected);
    });
  });

  var saved = Number(localStorage.getItem("flowerRating") || 0);
  if (saved > 0) {
    selected = saved;
    paint(selected);
  }
}

