document.addEventListener("DOMContentLoaded", function () {

  if (document.body.classList.contains("home")) {
    initHome();
  }

  if (document.body.classList.contains("destinations")) {
    initDestinations();
  }

  if (document.body.classList.contains("contact")) {
    initContact();
  }

});
function initHome() {
  var btn = document.getElementById("ctaBtn");
  var box = document.getElementById("welcomeBox");

  if (!btn || !box) return;

  btn.addEventListener("click", function () {
    box.innerHTML = "<p>🎉 أهلاً بك! استعد لاكتشاف أفضل الوجهات السياحية</p>";
  });
}

function initDestinations() {}function initContact() {
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

    if (name === "") errors.push("الاسم مطلوب");
    if (email === "") errors.push("الإيميل مطلوب");
    if (email && !isValidEmail(email)) errors.push("صيغة الإيميل غير صحيحة");
    if (subject === "") errors.push("اختاري الموضوع");
    if (comment === "") errors.push("التعليق مطلوب");
    if (comment.length > 0 && comment.length < 10)
      errors.push("التعليق لازم يكون 10 أحرف أو أكثر");

    if (errors.length > 0) {
      msgBox.innerHTML =
        "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
      return;
    }

    msgBox.innerHTML = "<p>✅ تم إرسال التعليق بنجاح</p>";
    form.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("JS شغال ✅");
  console.log("Body class =", document.body.className);
});
