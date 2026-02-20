// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========== ELEMENTOS ========== */
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const sections = document.querySelectorAll('section');
    
    /* ========== MENU MOBILE ========== */
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Animação do ícone do menu
            const icon = menuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuBtn?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    /* ========== MODO ESCURO ========== */
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = "☀️ Modo Claro";
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.textContent = "🌙 Modo Escuro";
        }
    }
    
    // Verificar preferência salva
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = "☀️ Modo Claro";
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    /* ========== SCROLL SUAVE ========== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    /* ========== ANIMAÇÃO DE FADE-IN AO ROLAR ========== */
    const observerOptions = {
        threshold: 0.2,
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
    
    // Aplicar observer às seções (exceto home que já aparece)
    document.querySelectorAll('section:not(.home)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 1s ease';
        observer.observe(section);
    });
    
    /* ========== MENU ATIVO CONFORME ROLAGEM ========== */
    function updateActiveLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    /* ========== EFEITO NAVBAR AO ROLAR ========== */
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.background = 'linear-gradient(135deg, #6b63b0, #7d74b8)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'linear-gradient(135deg, #837ad0, #9d94e0)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    /* ========== ANIMAÇÃO DE DIGITAÇÃO NO TÍTULO ========== */
    const destaque = document.querySelector('.destaque');
    if (destaque) {
        const textoOriginal = destaque.textContent;
        destaque.textContent = '';
        
        let i = 0;
        function digitar() {
            if (i < textoOriginal.length) {
                destaque.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(digitar, 100);
            }
        }
        // Começar a animação após 1 segundo
        setTimeout(digitar, 1000);
    }
    
    /* ========== EFEITO HOVER NOS CARDS ========== */
    const cards = document.querySelectorAll('.habilidade-card, .projeto-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    /* ========== ATUALIZAR ANO NO RODAPÉ ========== */
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.innerHTML = `&copy; ${currentYear} - Marianna Schmidt. Todos os direitos reservados.`;
    }
    
    /* ========== FECHAR MENU AO CLICAR FORA ========== */
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = menuBtn?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    /* ========== PREVENIR COMPORTAMENTO PADRÃO DOS LINKS ========== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
    
    console.log('🚀 Portfólio carregado com sucesso!');
});

/* ========== TRATAMENTO DE ERRO DE IMAGEM ========== */
window.addEventListener('load', function() {
    // Verifica se as imagens carregaram, se não, usa fallback
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Imagem não carregou: ${this.src}`);
            // Se for ícone de rede social, não substitui para manter o layout
            if (this.classList.contains('social-icon') || this.classList.contains('contato-icon')) {
                // Mantém o ícone quebrado mas não substitui
                this.style.opacity = '0.7';
            }
        });
    });
});
