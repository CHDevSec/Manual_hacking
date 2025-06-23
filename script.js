// Matrix Effect with Blue/Purple Colors (No Green)
class MatrixEffect {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.colors = [
            'rgba(65, 105, 225, 0.8)',   // Royal Blue
            'rgba(138, 43, 226, 0.8)',   // Blue Violet
            'rgba(147, 112, 219, 0.8)',  // Medium Slate Blue
            'rgba(123, 104, 238, 0.8)',  // Medium Slate Blue
            'rgba(72, 61, 139, 0.8)',    // Dark Slate Blue
            'rgba(106, 90, 205, 0.8)',   // Slate Blue
        ];

        this.init();
        this.animate();
        this.handleResize();
    }

    init() {
        this.resizeCanvas();
        this.columns = Math.floor(this.canvas.width / this.fontSize);

        // Initialize drops array
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.columns = Math.floor(this.canvas.width / this.fontSize);
            this.drops = [];
            for (let i = 0; i < this.columns; i++) {
                this.drops[i] = Math.random() * -100;
            }
        });
    }

    draw() {
        // Create trailing effect
        this.ctx.fillStyle = 'rgba(10, 10, 35, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];

            // Random color from blue/purple palette
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.ctx.fillStyle = color;

            // Draw character
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

            // Reset drop to top randomly
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            // Move drop down
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Purchase function
function purchaseEbook() {
    // Redireciona o usuário para o link de pagamento
    window.location.href = 'https://payfast.greenn.com.br/123320';
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Matrix Effect
    const matrix = new MatrixEffect();

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.content-card, .feature-item, .offer-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add typing effect to terminal
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        let isVisible = true;
        setInterval(() => {
            typingElement.style.opacity = isVisible ? '0' : '1';
            isVisible = !isVisible;
        }, 500);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add glow effect to terminal on hover
    const terminal = document.querySelector('.terminal-window');
    if (terminal) {
        terminal.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 0 50px rgba(65, 105, 225, 0.8)';
        });

        terminal.addEventListener('mouseleave', function () {
            this.style.boxShadow = '0 0 30px rgba(65, 105, 225, 0.5)';
        });
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

