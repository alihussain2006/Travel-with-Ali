/* ==========================================================
   TRAVEL WITH ALI — ENHANCEMENTS JS
   Separate from script.js on purpose — only runs the new
   Gallery / Packages / Destinations features.
   Every block below checks the element exists before running,
   so this file is safe to load on every page.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       1. GALLERY — FILTER BUTTONS
       ====================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {

            // highlight the active button
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.dataset.filter; // e.g. "beach", or "all"

            galleryItems.forEach((item) => {
                const matches = category === "all" || item.dataset.category === category;
                item.classList.toggle("hidden", !matches);
            });
        });
    });


    /* ======================================================
       2. GALLERY — LIGHTBOX (click photo, browse with </>)
       ====================================================== */

    const lightbox = document.getElementById("lightbox");

    if (lightbox && galleryItems.length) {

        const lightboxImg = document.getElementById("lightboxImg");
        const lightboxCaption = document.getElementById("lightboxCaption");
        const lightboxCounter = document.getElementById("lightboxCounter");
        const closeBtn = document.getElementById("lightboxClose");
        const prevBtn = document.getElementById("lightboxPrev");
        const nextBtn = document.getElementById("lightboxNext");

        // Build a simple list of { src, caption } from every gallery item
        const allItems = Array.from(galleryItems);
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            showSlide();
            lightbox.classList.add("open");
        }

        function showSlide() {
            const item = allItems[currentIndex];
            const img = item.querySelector("img");
            const title = item.querySelector(".overlay")?.textContent || "";

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = title;
            lightboxCounter.textContent = `${currentIndex + 1} / ${allItems.length}`;
        }

        function closeLightbox() {
            lightbox.classList.remove("open");
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % allItems.length;
            showSlide();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
            showSlide();
        }

        allItems.forEach((item, index) => {
            item.addEventListener("click", () => openLightbox(index));
        });

        closeBtn.addEventListener("click", closeLightbox);
        nextBtn.addEventListener("click", showNext);
        prevBtn.addEventListener("click", showPrev);

        // click outside the photo closes it
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // keyboard support
        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("open")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
        });
    }


    /* ======================================================
       3. PACKAGES — VIEW ITINERARY (expand/collapse)
       Note: the itinerary trigger is a <div>, not a <button> —
       on purpose, so it doesn't get accidentally grabbed by
       script.js's ".package-content button" selector, which
       is meant only for the real Book Now buttons.
       ====================================================== */

    const itineraryButtons = document.querySelectorAll(".itinerary-btn");

    function toggleItinerary(btn) {
        const details = btn.nextElementSibling; // the .itinerary-details right after the button
        if (!details) return;

        details.classList.toggle("show");
        btn.textContent = details.classList.contains("show")
            ? "Hide Itinerary"
            : "View Itinerary";
    }

    itineraryButtons.forEach((btn) => {
        btn.addEventListener("click", () => toggleItinerary(btn));

        // keyboard accessibility since this is a <div>, not a real <button>
        btn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleItinerary(btn);
            }
        });
    });


    /* ======================================================
       4. PACKAGES — PAGINATION (show 3 cards, </> for more)
       This works automatically no matter how many
       .package-card elements you add to packages.html —
       it recalculates the number of pages itself.
       ====================================================== */

    const pkgContainer = document.querySelector(".package-container");
    const pkgPrevBtn = document.getElementById("pkgPrev");
    const pkgNextBtn = document.getElementById("pkgNext");
    const pkgIndicator = document.getElementById("pkgPageIndicator");

    if (pkgContainer && pkgPrevBtn && pkgNextBtn) {

        const CARDS_PER_PAGE = 3;
        const pkgCards = Array.from(pkgContainer.querySelectorAll(".package-card"));
        const totalPages = Math.ceil(pkgCards.length / CARDS_PER_PAGE);
        let currentPage = 0;

        function showPackagePage(page) {
            currentPage = page;

            pkgCards.forEach((card, index) => {
                const cardPage = Math.floor(index / CARDS_PER_PAGE);
                card.classList.toggle("hidden", cardPage !== currentPage);
            });

            if (pkgIndicator) {
                pkgIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
            }

            // disable buttons at the start/end instead of wrapping around
            pkgPrevBtn.disabled = currentPage === 0;
            pkgNextBtn.disabled = currentPage === totalPages - 1;
        }

        pkgNextBtn.addEventListener("click", () => {
            if (currentPage < totalPages - 1) showPackagePage(currentPage + 1);
        });

        pkgPrevBtn.addEventListener("click", () => {
            if (currentPage > 0) showPackagePage(currentPage - 1);
        });

        // hide pagination controls entirely if there's only 1 page
        if (totalPages <= 1) {
            document.querySelector(".package-pagination")?.classList.add("hidden");
        }

        showPackagePage(0);
    }


    /* ======================================================
       5. DESTINATIONS — EXPLORE MODAL
       ====================================================== */

    const destModal = document.getElementById("destModal");

    if (destModal) {

        const exploreButtons = document.querySelectorAll(".card-btn[data-modal]");
        const modalImg = document.getElementById("destModalImg");
        const modalTitle = document.getElementById("destModalTitle");
        const modalDesc = document.getElementById("destModalDesc");
        const modalHighlights = document.getElementById("destModalHighlights");
        const modalClose = document.getElementById("destModalClose");

        exploreButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();

                const card = btn.closest(".card");
                const img = card.querySelector("img");

                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modalTitle.textContent = btn.dataset.title;
                modalDesc.textContent = btn.dataset.desc;

                // highlights come in as one string separated by "|"
                const highlights = (btn.dataset.highlights || "").split("|");
                modalHighlights.innerHTML = highlights
                    .map((h) => `<li><i class="fas fa-check"></i>${h}</li>`)
                    .join("");

                destModal.classList.add("open");
            });
        });

        modalClose.addEventListener("click", () => destModal.classList.remove("open"));

        destModal.addEventListener("click", (e) => {
            if (e.target === destModal) destModal.classList.remove("open");
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") destModal.classList.remove("open");
        });
    }

});