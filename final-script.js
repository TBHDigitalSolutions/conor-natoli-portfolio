document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const modal = document.getElementById('widget-modal');
    const openButton = document.querySelector('[data-text="Expand to Fullscreen View"]');
    const closeButton = document.getElementById('close-modal');
    const slider = document.querySelector('.sliderz');
    const prevButton = document.querySelector('[data-text="Previous"]');
    const nextButton = document.querySelector('[data-text="Next"]');
    const sliderButtons = [prevButton, nextButton];
    let isScrolling = false;

    // Utility function: Scroll slider
    function scrollSlider(direction) {
        if (slider && !isScrolling) {
            const card = slider.querySelector('.cardz');
            if (card) {
                const slideWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight || 0, 10);
                isScrolling = true;

                slider.scrollBy({
                    left: direction * slideWidth,
                    behavior: 'smooth',
                });

                disableButtonsDuringScroll();
                setTimeout(() => {
                    isScrolling = false;
                    updateButtonStates();
                }, 400);
            }
        }
    }

    // Utility function: Disable buttons temporarily
    function disableButtonsDuringScroll() {
        sliderButtons.forEach((button) => {
            if (button) button.disabled = true;
        });
        setTimeout(() => {
            sliderButtons.forEach((button) => {
                if (button) button.disabled = false;
            });
        }, 400);
    }

    // Utility function: Update button states
    function updateButtonStates() {
        if (!slider) return;
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        const currentScrollLeft = slider.scrollLeft;

        if (prevButton) prevButton.disabled = currentScrollLeft <= 0;
        if (nextButton) nextButton.disabled = currentScrollLeft >= maxScrollLeft;
    }

    // Event listeners for slider navigation
    if (prevButton) prevButton.addEventListener('click', () => scrollSlider(-1));
    if (nextButton) nextButton.addEventListener('click', () => scrollSlider(1));
    if (slider) {
        slider.addEventListener('scroll', updateButtonStates);
        window.addEventListener('resize', updateButtonStates);
        updateButtonStates();
    }

    // Modal handling
    if (openButton && modal) {
        openButton.addEventListener('click', () => {
            modal.classList.add('visible');
            document.body.classList.add('no-scroll');
        });
    }
    if (closeButton && modal) {
        closeButton.addEventListener('click', closeModal);
    }
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('visible')) {
            closeModal();
        }
    });
    function closeModal() {
        modal.classList.remove('visible');
        document.body.classList.remove('no-scroll');
    }

    // Hero video autoplay
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo && heroVideo.paused) heroVideo.play();

    // Slick carousel initialization
    $('.carousel-slide').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: true,
    });

    // Accordion toggle
    function toggleAccordion(sectionId) {
        document.querySelectorAll('.accordion-content').forEach(section => {
            if (section.id !== sectionId) {
                section.style.display = 'none';
            }
        });

        const section = document.getElementById(sectionId);
        section.style.display = section.style.display === 'block' ? 'none' : 'block';

        $(`#${sectionId} .carousel-slide`).slick('setPosition');
    }

    document.querySelector('.portfolio-cards-container .portfolio-card:nth-child(1) button').addEventListener('click', () => {
        toggleAccordion('video-portfolio');
    });
    document.querySelector('.portfolio-cards-container .portfolio-card:nth-child(2) button').addEventListener('click', () => {
        toggleAccordion('image-portfolio');
    });
    document.querySelector('.portfolio-cards-container .portfolio-card:nth-child(3) button').addEventListener('click', () => {
        toggleAccordion('web-portfolio');
    });

    // Modal handling for video, image, and iframe
    function openVideoModal(videoUrl) {
        const modal = document.getElementById('video-modal');
        const modalVideo = document.getElementById('modal-video');
        modalVideo.src = videoUrl;
        modal.style.display = 'flex';
        window.addEventListener('click', outsideVideoClickListener);
    }
    function closeVideoModal() {
        const modal = document.getElementById('video-modal');
        const modalVideo = document.getElementById('modal-video');
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
        window.removeEventListener('click', outsideVideoClickListener);
    }
    function outsideVideoClickListener(event) {
        const modal = document.getElementById('video-modal');
        const modalContent = modal.querySelector('.modal-content');
        if (event.target === modal && !modalContent.contains(event.target)) closeVideoModal();
    }
});

// Initialize carousel thumbnails
document.addEventListener('DOMContentLoaded', () => {
    const initialThumbnail = document.querySelector('.thumbnail-item');
    if (initialThumbnail) setActiveItem(initialThumbnail);
    moveImageCarousel(0); // Display first thumbnails
});
