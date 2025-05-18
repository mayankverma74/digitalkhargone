document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const websiteType = urlParams.get('type');
    const budget = urlParams.get('budget');

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
                const formData = new FormData(contactForm);
                const data = {
                    fullName: formData.get('fullName'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    websiteType: formData.get('websiteType'),
                    budget: formData.get('budget')
                };

                // Add name attributes to match FormData
                document.getElementById('fullName').setAttribute('name', 'fullName');
                document.getElementById('phone').setAttribute('name', 'phone');
                document.getElementById('email').setAttribute('name', 'email');
                document.getElementById('websiteType').setAttribute('name', 'websiteType');
                document.getElementById('budget').setAttribute('name', 'budget');

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
                alert('Failed to submit form. Please try again.');
            }
        });
    }
});