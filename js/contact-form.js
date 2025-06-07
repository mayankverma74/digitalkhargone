document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim() || null,
                websiteType: document.getElementById('websiteType').value,
                budget: document.getElementById('budget').value,
                timestamp: new Date().toISOString()
            };

            const response = await fetch('https://digitalkhargone-687413132546.us-central1.run.app/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Show success message
            alert('Form submitted successfully!');
            contactForm.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            alert('Failed to submit form. Please try again.');
        }
    });
});