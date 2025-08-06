// script.js completo com todas as correções
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa AOS apenas em desktop
    if (window.innerWidth >= 768) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }

    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mobileBackdrop = document.querySelector('.mobile-menu-backdrop');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        if (mobileBackdrop) {
            mobileBackdrop.style.display = navLinks.classList.contains('active') ? 'block' : 'none';
        }
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', toggleMenu);
    }

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggleMenu();
            }
        });
    });

    // Detecta mudanças no tamanho da tela
    function handleResize() {
        if (window.innerWidth >= 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    }

    window.addEventListener('resize', handleResize);

    // Detecta se é um dispositivo touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.documentElement.classList.add('touch-device');
    }

    // Animação do Hero Section
    gsap.to('.hero-subtitle', {
        opacity: 1,
        duration: 1.2,
        delay: 0.2
    });

    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out"
    });

    gsap.to('.hero-text', {
        opacity: 1,
        y: 0,
        duration: 1.0,
        delay: 0.6,
        ease: "power3.out"
    });

    gsap.to('.hero-buttons', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out"
    });

    // Efeito de scroll no header
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled-up', 'scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll down
            header.classList.remove('scrolled');
            header.classList.add('scrolled-up');
        } else if (currentScroll < lastScroll) {
            // Scroll up
            header.classList.add('scrolled');
            header.classList.remove('scrolled-up');
        }
        
        lastScroll = currentScroll;
    });

    // Animações ao scroll com GSAP ScrollTrigger
    gsap.utils.toArray('.reveal').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: "top bottom-=100px",
            end: "bottom top+=100px",
            onEnter: () => {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            },
            once: true
        });
    });

    // Efeitos hover condicionais
    if (!document.documentElement.classList.contains('touch-device')) {
        // Aplica efeitos hover apenas em não-touch
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
    }

    // Carregamento otimizado de imagens
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                    }
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            lazyImageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores antigos
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Inicializa o player de vídeo apenas se estiver no viewport
    const videoPlayer = document.getElementById('player');
    if (videoPlayer) {
        const playerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const player = cloudinary.videoPlayer('player', {
                    cloud_name: 'your-cloud-name',
                    publicId: 'your-video-id',
                    autoplay: true,
                    muted: true,
                    loop: true,
                    controls: false
                });
                playerObserver.disconnect();
            }
        }, {
            threshold: 0.1
        });

        playerObserver.observe(videoPlayer);
    }

    // CORREÇÃO ESPECÍFICA PARA A SEÇÃO DE PORTFÓLIO
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Garante que os itens sejam visíveis
    portfolioItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
    });
    
    // Adiciona clique para expandir no mobile
    if (window.innerWidth <= 768) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove a classe 'expanded' de todos os itens
                portfolioItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.classList.remove('expanded');
                        gsap.to(otherItem, {
                            scale: 1,
                            boxShadow: 'none',
                            duration: 0.3
                        });
                    }
                });
                
                // Alterna o item clicado
                this.classList.toggle('expanded');
                
                if (this.classList.contains('expanded')) {
                    gsap.to(this, {
                        scale: 1.05,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        duration: 0.3
                    });
                } else {
                    gsap.to(this, {
                        scale: 1,
                        boxShadow: 'none',
                        duration: 0.3
                    });
                }
            });
        });
    }
});
