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
                    email: document.getElementById('email').value.trim() || '', // Email is optional
                    websiteType: document.getElementById('websiteType').value,
                    budget: document.getElementById('budget').value
                };

                // Validate required fields (excluding email)
                const requiredFields = ['fullName', 'phone', 'websiteType', 'budget'];
                for (const field of requiredFields) {
                    if (!formData[field]) {
                        throw new Error(`${field} is required`);
                    }
                }

                // Only validate email if provided
                if (formData.email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(formData.email)) {
                        throw new Error('Please enter a valid email address');
                    }
                }

                // Update API endpoint with correct Cloud Run URL
                const apiUrl = 'https://digitalkhargone-687413132546.us-central1.run.app/api/contact';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData),
                    mode: 'cors'
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to submit form');
                }

                // Show success message
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
                alert(`Failed to submit form: ${error.message}. Please try again or contact us directly at +91 6266 413268`);
            }
        });
    }
});