// Get modal elements
const resumeModal = document.getElementById("resume-modal");
const openModalButton = document.querySelector(".resume-cta-button"); // Button to open the modal
const closeModalButton = document.querySelector(".resume-modal__close-button"); // Close button inside the modal

// Open modal function
function openModal() {
    resumeModal.style.display = "flex"; // Display the modal
    document.body.classList.add("no-scroll"); // Optional: prevent background scrolling
}

// Close modal function
function closeModal() {
    resumeModal.style.display = "none"; // Hide the modal
    document.body.classList.remove("no-scroll"); // Optional: re-enable background scrolling
}

// Event listeners
openModalButton.addEventListener("click", openModal); // Open modal on button click
closeModalButton.addEventListener("click", closeModal); // Close modal on close button click

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === resumeModal) {
        closeModal();
    }
});

// Optional: Close modal with the Escape key
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});
