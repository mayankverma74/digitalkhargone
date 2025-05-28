document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const websiteType = urlParams.get('type');
    const budget = urlParams.get('budget');

    // Set name attributes immediately when page loads
    document.getElementById('fullName').setAttribute('name', 'fullName');
    document.getElementById('phone').setAttribute('name', 'phone');
    document.getElementById('email').setAttribute('name', 'email');
    document.getElementById('websiteType').setAttribute('name', 'websiteType');
    document.getElementById('budget').setAttribute('name', 'budget');

    // Pre-select the options if parameters exist
    if (websiteType) {
        const websiteTypeSelect = document.getElementById('websiteType');
        websiteTypeSelect.value = websiteType;
    }

    if (budget) {
        const budgetSelect = document.getElementById('budget');
        budgetSelect.value = budget;
    }

    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                // Validate form data before submission
                const fullName = document.getElementById('fullName').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                const websiteType = document.getElementById('websiteType').value;
                const budget = document.getElementById('budget').value;

                // Check if any field is empty
                if (!fullName || !phone || !websiteType || !budget) {
                    throw new Error('Please fill all fields');
                }

                const data = {
                    fullName,
                    phone,
                    email,
                    websiteType,
                    budget
                };

                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Form submitted successfully:', result);
                
                // Show success modal
                successModal.style.display = 'flex';
                setTimeout(() => {
                    successModal.style.opacity = '1';
                }, 10);

                // Reset form
                contactForm.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                alert(error.message || 'Failed to submit form. Please try again.');
            }
        });
    }
});