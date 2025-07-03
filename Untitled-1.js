// Add this to your existing script
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            
            // Animate service items sequentially
            if (entry.target.classList.contains('pricing-card')) {
                const items = entry.target.querySelectorAll('.service-item, .service-cta');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-in, .pricing-card').forEach(el => observer.observe(el));