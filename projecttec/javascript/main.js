document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    const email1 = document.getElementById("email").value.trim();
    const email2 = document.getElementById("confirmEmail").value.trim();
    const error = document.getElementById("emailError");

    if (email1 !== email2) {
      e.preventDefault();   
      error.style.display = "inline";
    } else {
      error.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initScrollTop();
  initWelcomeBack();
initWcCard();

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
function initWcCard() {
  initSaudiJapanClockBlock();
  initWcWeather();
}

function initSaudiJapanClockBlock() {
  var saEl = document.getElementById("timeSA");
  var jpEl = document.getElementById("japanTime");

  var hHand = document.getElementById("japanHour");
  var mHand = document.getElementById("japanMinute");
  var sHand = document.getElementById("japanSecond");

  if (!saEl || !jpEl) return;

  function pad(n){ return String(n).padStart(2,"0"); }

  function update() {
    var now = new Date();

    saEl.textContent =
      pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());

    // Japan text (24h)
    jpEl.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(now);

    // Japan analog
    if (hHand && mHand && sHand) {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).formatToParts(now);

      var H = Number(parts.find(p => p.type === "hour").value);
      var M = Number(parts.find(p => p.type === "minute").value);
      var S = Number(parts.find(p => p.type === "second").value);

      hHand.style.transform = "translateX(-50%) rotate(" + ((H%12)*30 + M*0.5) + "deg)";
      mHand.style.transform = "translateX(-50%) rotate(" + (M*6 + S*0.1) + "deg)";
      sHand.style.transform = "translateX(-50%) rotate(" + (S*6) + "deg)";
    }
  }

  update();
  setInterval(update, 1000);
}

function initWcWeather() {
  fetchWeather(24.7136, 46.6753, "weatherSA"); 
  fetchWeather(35.6895, 139.6917, "weatherJP"); 

  setInterval(function () {
    fetchWeather(24.7136, 46.6753, "weatherSA");
    fetchWeather(35.6895, 139.6917, "weatherJP");
  }, 10 * 60 * 1000);
}

function fetchWeather(lat, lon, elementId) {
  var el = document.getElementById(elementId);
  if (!el) return;

  var url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    lat + "&longitude=" + lon + "&current_weather=true";

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var w = data.current_weather;
      el.textContent = w.temperature + "°C | Wind " + w.windspeed + " km/h";
    })
    .catch(function () {
      el.textContent = "N/A";
    });
}
