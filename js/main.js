/**
 * KeyBrothers Tech - Ana JavaScript Dosyası
 * Görevler: Mobil menü aç/kapa, footer'da güncel yılı gösterme
 */

(function () {
  "use strict";

  // ---------- DOM elemanlarını seçiyoruz (sayfa yüklendiğinde kullanacağız) ----------
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector(".nav-menu");
  var navLinks = document.querySelectorAll(".nav-menu a");
  var yearEl = document.getElementById("yil");

  // ---------- Footer'daki yılı güncelle (© 2025 gibi) ----------
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Mobil menü: butona tıklanınca menüyü aç/kapat ----------
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("is-open");
      // Erişilebilirlik: butonun açık/kapalı durumunu belirtmek için
      var isOpen = navMenu.classList.contains("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Menüde bir linke tıklanınca menüyü kapat (mobilde sayfa içi atlama sonrası)
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
