// Open Video Modal
function openVideoModal(item) {
    const videoSrc = item.getAttribute('data-video-src');
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');

    modalVideo.src = videoSrc;
    modal.style.display = 'flex';
}

// Open Image Modal
function openImageModal(item) {
    const imageSrc = item.getAttribute('data-image-src');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');

    modalImage.src = imageSrc;
    modal.style.display = 'flex';
}

// Open Website Modal
function openWebsiteModal(item) {
    const websiteSrc = item.getAttribute('data-website-src');
    const modal = document.getElementById('website-modal');
    const modalIframe = document.getElementById('modal-iframe');

    modalIframe.src = websiteSrc;
    modal.style.display = 'flex';
}

// Close Modal Function (shared across all modals)
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
        if (modal.querySelector('video')) modal.querySelector('video').pause(); // Pause video if any
        if (modal.querySelector('iframe')) modal.querySelector('iframe').src = ''; // Clear iframe src
    });
}

// Close modal when clicking outside the content area
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
};

// Hero Video Autoplay
document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo && heroVideo.paused) heroVideo.play();

    // Service Card Hover Effects
    const serviceCards = document.querySelectorAll('.service-card, .card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hovered'));
        card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
    });

    // Modal for Contact Form
    function openContactModal() {
        const modal = document.getElementById('popup-modal');
        modal.style.display = 'flex';
        document.body.classList.add('no-scroll');
    }

    function closeContactModal() {
        const modal = document.getElementById('popup-modal');
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }

    document.querySelectorAll('.open-form').forEach(button => button.addEventListener('click', openContactModal));
    document.querySelectorAll('.close-button').forEach(button => button.addEventListener('click', closeModal));
});
let activeIndex = 0;

function setActiveItem(element) {
    const videoSrc = element.getAttribute('data-video-src');
    const title = element.getAttribute('data-title');
    const activeVideo = document.getElementById('active-video');
    const activeTitle = document.getElementById('active-title');

    activeVideo.src = videoSrc;
    activeTitle.textContent = title;

    // Highlight selected thumbnail
    document.querySelectorAll('.thumbnail-item').forEach(item => {
        item.classList.remove('thumbnail-active');
    });
    element.classList.add('thumbnail-active');
}

function moveCarousel(direction) {
    const items = document.querySelectorAll('.thumbnail-item');
    const numItems = items.length;

    // Reset the carousel position for infinite loop
    activeIndex = (activeIndex + direction + numItems) % numItems;
    setActiveItem(items[activeIndex]);
}

// Initialize first item as active
document.addEventListener('DOMContentLoaded', () => {
    const initialThumbnail = document.querySelectorAll('.thumbnail-item')[0];
    if (initialThumbnail) setActiveItem(initialThumbnail);
});
// Set the active image display based on the clicked thumbnail
function setActiveImage(thumbnail) {
    const imageSrc = thumbnail.getAttribute('data-image-src');
    const title = thumbnail.getAttribute('data-title');
    document.getElementById('active-image').src = imageSrc;
    document.getElementById('active-image-title').textContent = title;
}

// Carousel Navigation
let currentIndex = 0;

function moveImageCarousel(direction) {
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const totalThumbnails = thumbnails.length;
    currentIndex = (currentIndex + direction + totalThumbnails) % totalThumbnails;

    // Adjust visibility and display only 4 thumbnails at a time
    thumbnails.forEach((thumbnail, index) => {
        if (index >= currentIndex && index < currentIndex + 4) {
            thumbnail.style.display = 'block';
        } else {
            thumbnail.style.display = 'none';
        }
    });
}

// Initial display of first 4 thumbnails
document.addEventListener('DOMContentLoaded', () => moveImageCarousel(0));
