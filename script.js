document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const modal = document.getElementById('widget-modal');
    const openButton = document.querySelector('[data-text="Expand to Fullscreen View"]');
    const closeButton = document.getElementById('close-modal');
    const slider = document.querySelector('.sliderz'); // Updated to target correct slider class
    const prevButton = document.querySelector('[data-text="Previous"]');
    const nextButton = document.querySelector('[data-text="Next"]');
    const sliderButtons = [prevButton, nextButton];
    let isScrolling = false; // Flag to prevent concurrent scrolls

    // Utility function: Scroll slider
    function scrollSlider(direction) {
        if (slider && !isScrolling) {
            const card = slider.querySelector('.cardz');
            if (card) {
                const slideWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight || 0, 10);
                isScrolling = true;

                // Scroll by the width of one card
                slider.scrollBy({
                    left: direction * slideWidth,
                    behavior: 'smooth',
                });

                // Disable buttons temporarily during scroll
                disableButtonsDuringScroll();

                // Reset isScrolling after animation duration
                setTimeout(() => {
                    isScrolling = false;
                    updateButtonStates();
                }, 400); // Match the scroll duration
            }
        }
    }

    // Utility function: Disable navigation buttons temporarily
    function disableButtonsDuringScroll() {
        sliderButtons.forEach((button) => {
            if (button) button.disabled = true;
        });
        setTimeout(() => {
            sliderButtons.forEach((button) => {
                if (button) button.disabled = false;
            });
        }, 400); // Match the scroll duration
    }

    // Utility function: Update button states
    function updateButtonStates() {
        if (!slider) return;

        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        const currentScrollLeft = slider.scrollLeft;

        if (prevButton) prevButton.disabled = currentScrollLeft <= 0;
        if (nextButton) nextButton.disabled = currentScrollLeft >= maxScrollLeft;
    }

    // Event listeners for slider navigation buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => scrollSlider(-1));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => scrollSlider(1));
    }

    // Update button states on load, scroll, and resize
    if (slider) {
        slider.addEventListener('scroll', updateButtonStates);
        window.addEventListener('resize', updateButtonStates);
        updateButtonStates(); // Initial state update
    }

    // Event listener: Open modal
    if (openButton && modal) {
        openButton.addEventListener('click', () => {
            modal.classList.add('visible');
            document.body.classList.add('no-scroll'); // Prevent background scrolling
        });
    }

    // Event listener: Close modal
    if (closeButton && modal) {
        closeButton.addEventListener('click', () => closeModal());
    }

    // Close modal when clicking outside the content
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('visible')) {
            closeModal();
        }
    });

    // Utility function: Close modal
    function closeModal() {
        modal.classList.remove('visible');
        document.body.classList.remove('no-scroll'); // Re-enable background scrolling
    }
});