$(document).ready(function () {
        // Initialize Slick on each carousel-slide
        $('.carousel-slide').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: false,
            arrows: true
        });
    });

document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to each "View Example" button
    document.querySelector('.portfolio-cards-container .portfolio-card:nth-child(1) button').addEventListener('click', () => {
        toggleAccordion('video-portfolio');
    });

    document.querySelector('.portfolio-cards-container .portfolio-card:nth-child(2) button').addEventListener('click', () => {
        toggleAccordion('image-portfolio');
    });

    document.querySelector('.portfolio-cards-container .portfolio-card:nth-child(3) button').addEventListener('click', () => {
        toggleAccordion('web-portfolio');
    });
});

// Function to toggle the accordion for a given section
function toggleAccordion(sectionId) {
    // Hide all other accordion sections
    document.querySelectorAll('.accordion-content').forEach(section => {
        if (section.id !== sectionId) {
            section.style.display = 'none';
        }
    });

    // Toggle the display of the specified section
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === 'block' ? 'none' : 'block';

    // Reposition the Slick carousel for smooth display
    $(`#${sectionId} .carousel-slide`).slick('setPosition');
}

function openVideoModal(videoUrl) {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    modalVideo.src = videoUrl;
    modal.style.display = 'flex';

    // Add event listener for clicks outside the modal content
    window.addEventListener('click', outsideVideoClickListener);
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = ''; // Clear source

    // Remove the event listener when the modal is closed
    window.removeEventListener('click', outsideVideoClickListener);
}

// Function to handle outside click detection for video modal
function outsideVideoClickListener(event) {
    const modal = document.getElementById('video-modal');
    const modalContent = modal.querySelector('.modal-content');

    // Check if the click target is outside the modal content
    if (event.target === modal && !modalContent.contains(event.target)) {
        closeVideoModal();
    }
}

function openImageModal(imageUrl) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.src = imageUrl;
    modal.style.display = 'flex';

    // Add event listener for clicks outside the modal content
    window.addEventListener('click', outsideImageClickListener);
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    modal.style.display = 'none';
    modalImage.src = ''; // Clear source

    // Remove the event listener when the modal is closed
    window.removeEventListener('click', outsideImageClickListener);
}

// Function to handle outside click detection for image modal
function outsideImageClickListener(event) {
    const modal = document.getElementById('image-modal');
    const modalContent = modal.querySelector('.modal-content');

    // Check if the click target is outside the modal content
    if (event.target === modal && !modalContent.contains(event.target)) {
        closeImageModal();
    }
}

function openIframeModal(iframeUrl) {
    const modal = document.getElementById('iframe-modal');
    const modalIframe = document.getElementById('modal-iframe');
    modalIframe.src = iframeUrl;
    modal.style.display = 'flex';

    // Add event listener for clicks outside the modal content
    window.addEventListener('click', outsideIframeClickListener);
}

function closeIframeModal() {
    const modal = document.getElementById('iframe-modal');
    const modalIframe = document.getElementById('modal-iframe');
    modal.style.display = 'none';
    modalIframe.src = ''; // Clear source

    // Remove the event listener when the modal is closed
    window.removeEventListener('click', outsideIframeClickListener);
}

// Function to handle outside click detection for iframe modal
function outsideIframeClickListener(event) {
    const modal = document.getElementById('iframe-modal');
    const modalContent = modal.querySelector('.modal-content');

    // Check if the click target is outside the modal content
    if (event.target === modal && !modalContent.contains(event.target)) {
        closeIframeModal();
    }
}
