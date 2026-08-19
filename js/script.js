document.addEventListener("DOMContentLoaded", () => {
    /* ===========================
            BOOK BUTTON
    =========================== */

    const bookButtons = document.querySelectorAll(".package-content button");

    bookButtons.forEach((button) => {
        button.addEventListener("click", () => {
            alert("Thank you for choosing Travel with Ali! Online booking is coming soon.");
        });
    });

    /* ===========================
            READ MORE (Class Toggle)
    =========================== */

    const reviewButtons = document.querySelectorAll(".read-more-btn");

    reviewButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const reviewBox = this.closest(".review-box");
            const moreText = reviewBox?.querySelector(".more-text");

            if (!moreText) return;

            moreText.classList.toggle("show");
            this.textContent = moreText.classList.contains("show") ? "Show Less" : "Read More";
        });
    });

    /* ===========================
            CONTACT FORM
    =========================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you! Your message has been sent successfully.");
            contactForm.reset();
        });
    }

    /* ===========================
            NEWSLETTER
    =========================== */

    const subscribeForm = document.getElementById("subscribeForm");

    if (subscribeForm) {
        subscribeForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("🎉 Thank you for subscribing to Travel with Ali!");
            subscribeForm.reset();
        });
    }
});

/* ===========================
        HERO IMAGE SLIDER
=========================== */

const hero = document.querySelector(".hero");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");

const heroSlides = [

    {
        image: "images/hero1.jpg",
        title: "Explore Beyond Horizons",
        description: "Discover breathtaking destinations, unforgettable experiences, and carefully planned journeys with Travel with Ali."
    },

    {
        image: "images/hero2.jpg",
        title: "Escape to <span>Paradise</span>",
        description: "Relax on beautiful beaches, enjoy crystal-clear waters, and create unforgettable memories with Travel with Ali."
    },

    {
        image: "images/hero3.jpg",
        title: "Discover <span>Timeless Beauty</span>",
        description: "Experience the perfect blend of culture, history, and stunning views in the world's most beautiful destinations."
    }

];


/* ===========================
   PRELOAD HERO IMAGES
   =========================== */

heroSlides.forEach((slide) => {

    const image = new Image();

    image.src = slide.image;

});


/* ===========================
   INITIAL HERO IMAGE
   =========================== */

hero.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)),
     url('${heroSlides[0].image}')`;


/* ===========================
   CHANGE HERO SLIDE
   =========================== */

let currentSlide = 0;

function changeHeroSlide() {

    currentSlide++;

    if (currentSlide >= heroSlides.length) {

        currentSlide = 0;

    }

    const slide = heroSlides[currentSlide];

    hero.classList.add("hero-changing");


    setTimeout(() => {

        hero.style.backgroundImage =
            `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)),
             url('${slide.image}')`;

        heroTitle.innerHTML = slide.title;

        heroDescription.textContent = slide.description;

        hero.classList.remove("hero-changing");

    }, 100);

}


setInterval(changeHeroSlide, 2500);
/* ===========================
        STICKY NAVBAR
=========================== */

const header = document.querySelector("header");

/* Apply scroll effect ONLY on Home page */

if(!header.classList.contains("inner-page")){

    window.addEventListener("scroll",()=>{

        if(window.scrollY>50){

            header.classList.add("scrolled");

        }

        else{

            header.classList.remove("scrolled");

        }

    });

}
