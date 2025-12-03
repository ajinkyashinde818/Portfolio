document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Footer Year ---------- */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile Menu ---------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile nav if clicked outside
  document.addEventListener("click", (event) => {
    if (navLinks.classList.contains("active") && !event.target.closest("nav")) {
      navLinks.classList.remove("active");
    }
  });

  /* ---------- Tabs Functionality ---------- */
  const tabTriggers = document.querySelectorAll(".tab-trigger");

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const tabsContainer = this.closest(".tabs, .stats-tabs");

      tabsContainer.querySelectorAll(".tab-trigger").forEach((t) => {
        t.classList.remove("active");
      });

      this.classList.add("active");

      const tabId = this.getAttribute("data-tab");

      tabsContainer.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });

      document.getElementById(tabId).classList.add("active");
    });
  });

  /* ---------- Smooth Scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  /* ---------- Fade-in Animation ---------- */
  const animateOnScroll = () => {
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("fade-in");
      }
    });
  };

  document.head.insertAdjacentHTML(
    "beforeend",
    `
    <style>
        .section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .section.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
    `
  );

  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  /* ---------- EmailJS Integration ---------- */

  // Initialize EmailJS (use your real public key)
  emailjs.init("x2BwXio3bpf4xXCYL");

  const contactForm = document.getElementById("contact-form");
  const statusBox = document.createElement("p");
  statusBox.id = "status-message";
  statusBox.style.marginTop = "10px";
  contactForm.appendChild(statusBox);

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      statusBox.textContent = "Sending message...";
      statusBox.style.color = "#ffd369";

      emailjs
        .sendForm("service_ey0fh0k", "template_g405plb", this)
        .then(() => {
          statusBox.textContent = "✔ Your message has been sent successfully!";
          statusBox.style.color = "#4ade80";
          contactForm.reset();
        })
        .catch((error) => {
          statusBox.textContent = "❌ Failed to send message. Try again.";
          statusBox.style.color = "#ff6b6b";
        });
    });
  }
});
