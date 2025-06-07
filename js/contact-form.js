document.addEventListener('DOMContentLoaded', () => {
    // Add notification container to body
    document.body.insertAdjacentHTML('beforeend', `
        <div class="notification-container" id="notificationContainer">
            <div class="notification">
                <div class="notification-header">
                    <div class="notification-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3 class="notification-title">Thank You!</h3>
                </div>
                <p class="notification-message">
                    We've received your details. Our team will contact you shortly via WhatsApp or phone call.
                </p>
                <div class="notification-actions">
                    <a href="index.html" class="back-to-home">
                        <i class="fas fa-arrow-left"></i>
                        Back to Home
                    </a>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    `);

    const contactForm = document.getElementById('contactForm');
    const notificationContainer = document.getElementById('notificationContainer');

    if (!contactForm) return;

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form elements
        const fullName = document.getElementById('fullName');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const websiteType = document.getElementById('websiteType');
        const budget = document.getElementById('budget');
        const submitBtn = document.querySelector('.submit-btn');

        // Disable submit button
        if (submitBtn) submitBtn.disabled = true;

        try {
            // Create form data object
            const formData = {
                fullName: fullName.value.trim(),
                phone: phone.value.trim(),
                email: email.value.trim() || null,
                websiteType: websiteType.value,
                budget: budget.value,
                timestamp: new Date().toISOString()
            };

            // Validate form data
            if (!formData.fullName || !formData.phone || !formData.websiteType || !formData.budget) {
                throw new Error('Please fill in all required fields');
            }

            // Send form data
            const response = await fetch('https://digitalkhargone-687413132546.us-central1.run.app/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            // Show success notification
            const notification = notificationContainer.querySelector('.notification');
            notificationContainer.style.transform = 'translateX(0)';
            notification.classList.add('show');

            // Reset form
            contactForm.reset();

            // Auto hide notification after 5 seconds
           

        } catch (error) {
            console.error('Form submission error:', error);
            alert(error.message || 'Failed to submit form. Please try again.');
        } finally {
            // Re-enable submit button
            if (submitBtn) submitBtn.disabled = false;
        }
    });

    // Close notification on button click
    const closeBtn = document.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notificationContainer.classList.remove('show');
        });
    }

    // Close notification when clicking "Back to Home"
    const backHomeBtn = document.querySelector('.back-to-home');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', () => {
            notificationContainer.classList.remove('show');
        });
    }
});