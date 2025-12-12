document.addEventListener("DOMContentLoaded", function () {

  initTheme();
  if (document.body.classList.contains("home")) initHome();
  if (document.body.classList.contains("destinations")) initDestinations();
  if (document.body.classList.contains("contact")) initContact();
});

function initHome() {
  var btn = document.getElementById("ctaBtn");
  var box = document.getElementById("welcomeBox");

  if (!btn || !box) return;

  box.innerHTML = "<p>🎉 أهلاً بك! استعد لاكتشاف أفضل الوجهات السياحية</p>";

  btn.addEventListener("click", function () {
    window.location.href = "pages/destinations.html";
  });
}

function initDestinations() {
}

function initContact() {
  var form = document.getElementById("contactForm");
  var msgBox = document.getElementById("formMsg");

  if (!form || !msgBox) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var nameEl = document.getElementById("name");
    var emailEl = document.getElementById("email");
    var subjectEl = document.getElementById("subject");
    var commentEl = document.getElementById("comment");

    var name = nameEl ? nameEl.value.trim() : "";
    var email = emailEl ? emailEl.value.trim() : "";
    var subject = subjectEl ? subjectEl.value : "";
    var comment = commentEl ? commentEl.value.trim() : "";

    var errors = [];

    if (name === "") errors.push("الاسم مطلوب");
    if (email === "") errors.push("الإيميل مطلوب");
    if (email && !isValidEmail(email)) errors.push("صيغة الإيميل غير صحيحة");
    if (subject === "") errors.push("اختاري الموضوع");
    if (comment === "") errors.push("التعليق مطلوب");
    if (comment.length > 0 && comment.length < 10) errors.push("التعليق لازم يكون 10 أحرف أو أكثر");

    if (errors.length > 0) {
      msgBox.innerHTML = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
      return;
    }

    msgBox.innerHTML = "<p>✅ تم إرسال التعليق بنجاح</p>";
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
