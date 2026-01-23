// Digital Shot - Script mejorado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const currentYear = document.getElementById('currentYear');
    const animateElements = document.querySelectorAll('.slide-in, .card-hover, .card-float');
    const particlesContainer = document.getElementById('particles');
    
    // ============================================
    // 1. Sistema de Partículas
    // ============================================
    function createParticles() {
        if (!particlesContainer) return;
        
        const particleCount = 50;
        const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#9D50BB'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Propiedades aleatorias
            const size = Math.random() * 4 + 1;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Estilos CSS
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: floatParticle ${duration}s linear ${delay}s infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Añadir keyframe para animación de partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // 2. Menú Responsive
    // ============================================
    function initMenu() {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer clic en enlaces
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Cerrar menú al presionar Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }
    
    function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ============================================
    // 3. Smooth Scrolling
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    closeMenu();
                }
            });
        });
    }
    
    // ============================================
    // 4. Scroll Effects
    // ============================================
    function initScrollEffects() {
        let lastScroll = 0;
        
        function handleScroll() {
            const currentScroll = window.scrollY;
            
            // Header effect
            if (currentScroll > 100) {
                header.classList.add('scrolled');
                if (currentScroll > lastScroll) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.transform = 'translateY(0)';
            }
            
            // Scroll to top button
            if (currentScroll > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
            
            // Animaciones al hacer scroll
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('animated');
                }
            });
            
            lastScroll = currentScroll;
        }
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Ejecutar al cargar
    }
    
    // ============================================
    // 5. Botón Scroll to Top
    // ============================================
    function initScrollTop() {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // 6. Efectos de Hover
    // ============================================
    function initHoverEffects() {
        // Efecto ripple en botones
        document.querySelectorAll('.btn-package, .btn-whatsapp, .btn-contact').forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = this.querySelector('.btn-ripple') || document.createElement('div');
                ripple.className = 'btn-ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                if (!this.querySelector('.btn-ripple')) {
                    this.appendChild(ripple);
                }
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Efecto parallax suave
        document.querySelectorAll('.hero-shape, .floating-element').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }
    
    // ============================================
    // 7. Actualizar Año
    // ============================================
    function updateYear() {
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
    }
    
    // ============================================
    // 8. Optimización de Animaciones
    // ============================================
    function optimizeAnimations() {
        // Usar requestAnimationFrame para animaciones suaves
        let ticking = false;
        
        function updateAnimations() {
            animateElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight - 100 && rect.bottom > 0) {
                    element.classList.add('animated');
                }
            });
            
            ticking = false;
        }
        
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    // ============================================
    // 9. WhatsApp Interactions
    // ============================================
    function initWhatsAppButtons() {
        const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Añadir efecto visual
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Analytics tracking (opcional)
                console.log('WhatsApp click:', this.textContent.trim());
            });
        });
    }
    
    // ============================================
    // 10. Performance Optimization
    // ============================================
    function initPerformance() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Actualizar elementos que necesitan recálculo
            }, 100);
        });
        
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ============================================
    // 11. Efectos de Sonido (Opcional)
    // ============================================
    function initSoundEffects() {
        const buttons = document.querySelectorAll('button, .btn-whatsapp, .btn-package');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Efecto de sonido sutil (opcional)
                const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ=');
                audio.volume = 0.1;
                audio.play().catch(() => {});
            });
        });
    }
    
    // ============================================
    // 12. Inicialización
    // ============================================
    function init() {
        createParticles();
        initMenu();
        initSmoothScroll();
        initScrollEffects();
        initScrollTop();
        initHoverEffects();
        updateYear();
        optimizeAnimations();
        initWhatsAppButtons();
        initPerformance();
        
        // Efectos de sonido (descomentar si se desea)
        // initSoundEffects();
        
        console.log('Digital Shot - Sitio optimizado cargado');
    }
    
    // Ejecutar inicialización
    init();
    
    // Cargar animaciones después de un breve delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});