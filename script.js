// =========================================
// DOM ELEMENTS
// =========================================

const header = document.querySelector(".header");

const progressBar = document.querySelector(".scroll-progress");

const scrollTopButton = document.querySelector(".scroll-top");

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("section");


// =========================================
// SCROLL EFFECTS
// =========================================

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    // Scroll Progress

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = progress + "%";


    // Navbar Background

    if (scrollTop > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    // Scroll To Top Button

    if (scrollTop > 500) {

        scrollTopButton.classList.add("show");

    } else {

        scrollTopButton.classList.remove("show");

    }


    // Active Navigation

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            scrollTop >= sectionTop &&
            scrollTop < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


// =========================================
// MOBILE MENU
// =========================================

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");


    const icon =
        menuToggle.querySelector("i");


    if (navLinks.classList.contains("open")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


// Close Mobile Menu

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");


        const icon =
            menuToggle.querySelector("i");


        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


// =========================================
// SCROLL REVEAL
// =========================================

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


// =========================================
// SCROLL TO TOP
// =========================================

scrollTopButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// =========================================
// TYPING ANIMATION
// =========================================

const typingElement =
    document.getElementById("typing-text");


const roles = [

    "Software Developer",
    "AI & ML Enthusiast",
    "Problem Solver",
    "Computer Technology Student"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;

        }

    } else {

        typingElement.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    const speed =
        deleting ? 45 : 85;


    setTimeout(typeEffect, speed);

}


// Start Typing Animation

typeEffect();