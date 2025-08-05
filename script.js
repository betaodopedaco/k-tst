// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Animação do Hero Section
    const heroTimeline = gsap.timeline();
    heroTimeline
        .to('.hero-subtitle', {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        })
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1.2")
        .to('.hero-text', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1.2")
        .to('.hero-buttons', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=1.0");

    // Efeito de scroll no header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Animações ao scroll com GSAP ScrollTrigger
    gsap.utils.toArray('.reveal').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none none"
            },
            ease: "power3.out"
        });
    });

    // Efeitos hover nos cards
    document.querySelectorAll('.portfolio-item, .feature-card, .portfolio-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.03,
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    // Efeitos hover nos botões
    document.querySelectorAll('.cta-button, .btn, .portfolio-btn, .portfolio-btn-new, .science-proof-btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Solicitação enviada com sucesso! Entraremos em contato em breve para oferecer nossa solução premium.');
            form.reset();
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Inicializa o player de vídeo do Cloudinary (se necessário)
    if(document.getElementById('player')) {
        const player = cloudinary.videoPlayer('player', {
            cloud_name: 'your-cloud-name',
            publicId: 'your-video-id',
            autoplay: true,
            muted: true,
            loop: true,
            controls: false
        });
    }
});
