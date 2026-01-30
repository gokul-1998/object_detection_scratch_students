document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add some delay/easing to the outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Theme Toggle
    const themeBtn = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Check local storage for preference
    if (localStorage.getItem('theme') === 'light') {
        html.setAttribute('data-theme', 'light');
    }

    themeBtn.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'light') {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .section-title, .about-text, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Inject CSS for animation class
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .animate-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Modal Interaction
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    const viewBtns = document.querySelectorAll('.view-project-btn');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default if it's inside a link
            const card = btn.closest('.project-card');
            const title = card.querySelector('.project-title').innerText;
            const desc = card.querySelector('.project-desc').innerText;
            const imgSrc = card.querySelector('img').src;
            
            modalBody.innerHTML = `
                <img src="${imgSrc}" style="width:100%; border-radius:12px; margin-bottom:20px;">
                <h3 style="font-size:2rem; margin-bottom:10px; color:var(--accent-color);">${title}</h3>
                <p style="margin-bottom:20px;">${desc}</p>
                <p>This is a placeholder for more detailed project information.</p>
                <div style="margin-top:20px;">
                     <button class="btn btn-primary" onclick="alert('Demo placeholder')">Live Demo</button>
                </div>
            `;
            
            modal.style.display = 'flex';
            // slight delay to allow display flex to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Contact Form Submission
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = 'Message Sent!';
            btn.style.background = '#00c853';
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
});
