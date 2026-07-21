// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Efeito de animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Garantir que o scroll para âncoras não fique escondido pelo header sticky */
    section { scroll-margin-top: 90px; }

    /* Estado inicial: oculto para animação, mas tornar visível quando a seção é alvo da âncora */
    .card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
        cursor: default;
    }

    /* Quando a seção de serviços for o alvo (click em #servicos), mostrar imediatamente os cards */
    #servicos:target .card {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Observar cards
document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

// Log de carregamento
console.log('Website Rosachoque Instalações carregado com sucesso!');
