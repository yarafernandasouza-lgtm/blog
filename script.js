// Alternador de Temas (Claro / Escuro)
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggleBtn.innerText = "☀️ MODO CLARO";
    } else {
        themeToggleBtn.innerText = "🌙 MODO ESCURO";
    }
});

// Barra de Pesquisa Funcional
const searchInput = document.getElementById('search-input');
const postCards = document.querySelectorAll('.post-card');

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();
    
    postCards.forEach(card => {
        const searchData = card.getAttribute('data-title');
        if (searchData.includes(value)) {
            card.style.display = 'flex'; // Exibe o post se corresponder
        } else {
            card.style.display = 'none'; // Oculta se não corresponder
        }
    });
});

// Opção de Seguir o Blog (Formulário)
const followForm = document.getElementById('follow-form');
const followMessage = document.getElementById('follow-message');

followForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento automático da página
    const emailInput = followForm.querySelector('input[type="email"]').value;
    
    if (emailInput) {
        followMessage.innerText = "✨ Sucesso! Você agora está seguindo o GlowTrends.";
        followForm.reset();
        
        // Remove a mensagem após 4 segundos
        setTimeout(() => {
            followMessage.innerText = "";
        }, 4000);
    }
});

// Botões de Curtir Individuais
const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const countSpan = this.querySelector('.like-count');
        let currentLikes = parseInt(countSpan.innerText);
        
        if (this.classList.contains('liked')) {
            currentLikes--;
            this.classList.remove('liked');
            this.style.backgroundColor = 'transparent';
            this.style.color = 'var(--text-color)';
        } else {
            currentLikes++;
            this.classList.add('liked');
            this.style.backgroundColor = 'var(--text-color)';
            this.style.color = 'var(--bg-color)';
        }
        
        countSpan.innerText = currentLikes;
    });
});
