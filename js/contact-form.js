document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    
    // Check if we're on the contact page
    if (!contactForm) {
        console.log('Contact form not found - not on contact page');
        return;
    }

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

            // Show success message
            alert('Form submitted successfully!');
            contactForm.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            alert(error.message || 'Failed to submit form. Please try again.');
        } finally {
            // Re-enable submit button
            if (submitBtn) submitBtn.disabled = false;
        }
    });
});