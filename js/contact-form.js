document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    // Get URL parameters for pre-filling form
    const urlParams = new URLSearchParams(window.location.search);
    const websiteType = urlParams.get('type');
    const budget = urlParams.get('budget');

    // Pre-fill form if parameters exist
    if (websiteType) {
        document.getElementById('websiteType').value = websiteType;
    }
    if (budget) {
        document.getElementById('budget').value = budget;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            try {
                // Get form data
                const formData = {
                    fullName: document.getElementById('fullName').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    websiteType: document.getElementById('websiteType').value,
                    budget: document.getElementById('budget').value
                };

                // Validate required fields
                for (const [key, value] of Object.entries(formData)) {
                    if (!value) {
                        throw new Error(`${key} is required`);
                    }
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    throw new Error('Please enter a valid email address');
                }

                // Determine API URL based on environment
                const API_URL = window.location.hostname === 'localhost' 
                    ? 'http://localhost:5000/api/contact'
                    : 'https://digitalkhargone.in/api/contact';

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Form submission failed');
                }

                // Show success modal
                if (successModal) {
                    successModal.style.display = 'flex';
                    successModal.style.opacity = '1';
                    contactForm.reset();
                } else {
                    alert('Form submitted successfully!');
                    contactForm.reset();
                }

            } catch (error) {
                console.error('Form submission error:', error);
                alert(error.message || 'Failed to submit form. Please try again or contact us directly.');
            }
        });
    }
});