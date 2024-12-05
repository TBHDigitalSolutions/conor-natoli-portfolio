document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.form-step');
    const progressBars = document.querySelectorAll('.progress-bar .progress');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const form = document.querySelector('#multi-step-form');
    let currentStep = 0;

    // Function to update the active step and progress bar
    const updateProgressBar = () => {
        const progressPercent = ((currentStep + 1) / steps.length) * 100;

        // Update progress bar width
        progressBars.forEach((bar) => {
            bar.style.width = `${progressPercent}%`;
        });

        // Show only the current step
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
    };

    // Function to move to the next step
    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateProgressBar();
        }
    };

    // Function to move to the previous step
    const prevStep = () => {
        if (currentStep > 0) {
            currentStep--;
            updateProgressBar();
        }
    };

    // Add event listeners for "Next" buttons
    nextButtons.forEach((button) => {
        button.addEventListener('click', nextStep);
    });

    // Add event listeners for "Previous" buttons
    prevButtons.forEach((button) => {
        button.addEventListener('click', prevStep);
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form successfully submitted!');
        form.reset();
        currentStep = 0;
        updateProgressBar();
    });

    // Add keyboard navigation for steps
    form.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA')) {
            e.preventDefault();
            nextStep();
        } else if (e.key === 'ArrowLeft') {
            prevStep();
        }
    });

    // Initialize progress bar and form UI
    updateProgressBar();
});

document.addEventListener('DOMContentLoaded', () => {
    const heading = document.querySelector('.campaign-header h1');
    const text = heading.textContent;
    let index = 0;

    // Clear existing text for typing effect
    heading.textContent = '';

    // Typing effect
    function typeEffect() {
        if (index < text.length) {
            heading.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100); // Adjust typing speed
        }
    }

    typeEffect();

    // Add dynamic "scroll down" indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.textContent = '⬇ Scroll Down ⬇';
    scrollIndicator.style.position = 'absolute';
    scrollIndicator.style.bottom = '20px';
    scrollIndicator.style.left = '50%';
    scrollIndicator.style.transform = 'translateX(-50%)';
    scrollIndicator.style.color = '#ffffff';
    scrollIndicator.style.fontFamily = '"Acumin Pro", sans-serif';
    scrollIndicator.style.fontSize = '1.2rem';
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.animation = 'fade-in 2s ease-in-out 3s, pulse 2s infinite';
    document.querySelector('.campaign-header').appendChild(scrollIndicator);
});
