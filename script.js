const makeupData = {
    "office-siren": {
        title: "Office Siren",
        concept: "Visual corporativo chique dos anos 90.",
        steps: ["Pele semi-matte leve.", "Sobrancelhas alinhadas e finas.", "Sombra taupe opaca.", "Delineado marrom discreto.", "Batom nude contornado."]
    },
    "mob-wife": {
        title: "Mob Wife",
        concept: "Estética maximalista e poderosa com olhos marcantes.",
        steps: ["Pele de alta cobertura.", "Contorno quente bem marcado.", "Olhos pretos esfumados dramáticos.", "Várias camadas de rímel.", "Batom vinho profundo."]
    },
    "douyin": {
        title: "Douyin Makeup",
        concept: "Estilo boneca com foco no brilho e olhar ampliado.",
        steps: ["Pele uniforme bem iluminada.", "Blush abaixo dos olhos e nariz.", "Desenhar e destacar o aegyo sal.", "Cílios em tufos estilo mangá.", "Lábios com efeito degradê."]
    },
    "grunge": {
        title: "Grunge Aesthetic",
        concept: "Olhar rebelde e borradinho inspirado no rock dos anos 90.",
        steps: ["Pele natural e leve.", "Lápis preto em abundância na linha d'água.", "Borre o lápis levemente rente aos cílios.", "Sombra escura despojada.", "Batom escuro aplicado com os dedos."]
    },
    "boca-vinil": {
        title: "Boca Vinil",
        concept: "Efeito molhado espelhado de alta intensidade.",
        steps: ["Contorno labial perfeito.", "Batom líquido matte pigmentado.", "Camada generosa de gloss incolor denso."]
    },
    "glam": {
        title: "Ultimate Glam",
        concept: "Maquiagem de alta intensidade e glamour clássico.",
        steps: ["Pele com iluminação marcante.", "Delineado gatinho longo e preciso.", "Cílios volumosos e batom acetinado."]
    },
    "y2k": {
        title: "Y2K Reborn",
        concept: "A volta das cores pastéis e cintilantes dos anos 2000.",
        steps: ["Sombra azul ou lilás metalizada.", "Brilho no canto interno dos olhos.", "Gloss labial com glitter."]
    },
    "latina": {
        title: "Latina Makeup",
        concept: "Sobrancelhas arqueadas e contorno labial ombré.",
        steps: ["Contorno marcante nas maçãs do rosto.", "Sobrancelhas arqueadas e preenchidas.", "Lábios ombré com lápis marrom e corretivo."]
    },
    "baddie": {
        title: "Baddie Aesthetic",
        concept: "Visual impecável com delineado gatinho afiado.",
        steps: ["Pele matte aveludada impecável.", "Delineado gatinho ultra afiado.", "Lábios preenchidos milimetricamente com batom matte."]
    },
    "coquette": {
        title: "Coquette",
        concept: "Estética romântica focada em blushes rosados.",
        steps: ["Blush rosa bem esfumado nas maçãs.", "Sombras nudes ou rosadas leves.", "Gloss hidratante e lip tint."]
    }
};

const modal = document.getElementById('makeup-modal');
const modalContentArea = document.getElementById('modal-content-area');
const commentsList = document.getElementById('modal-comments-list');
const commentForm = document.getElementById('comment-form');
const closeModalBtn = modal.querySelector('.close-modal-btn');
const postCards = document.querySelectorAll('.post-card');

let activePostId = "";

postCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.closest('.like-btn')) return;
        
        activePostId = this.getAttribute('data-id');
        const data = makeupData[activePostId];
        
        if (data) {
            let stepsHtml = data.steps.map(step => `<li>${step}</li>`).join('');
            modalContentArea.innerHTML = `
                <span class="category">TUTORIAL EXCLUSIVO</span>
                <h2 style="font-family: 'Playfair Display', serif; font-size: 30px; margin: 10px 0;">${data.title}</h2>
                <p class="modal-concept"><strong>O Conceito:</strong> ${data.concept}</p>
                <ol>${stepsHtml}</ol>
            `;
            loadComments(activePostId);
            modal.classList.add('active');
        }
    });
});

function loadComments(postId) {
    commentsList.innerHTML = "";
    let comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
    if (comments.length === 0) {
        commentsList.innerHTML = `<p class="no-comments">Nenhum comentário ainda. Escreva o seu!</p>`;
        return;
    }
    comments.forEach(c => {
        const div = document.createElement('div');
        div.classList.add('comment-item');
        div.innerHTML = `<div class="comment-item-header"><span>${c.name}</span><span>${c.date}</span></div><p>${c.text}</p>`;
        commentsList.appendChild(div);
    });
}

commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');
    
    const newComment = { name: nameInput.value.trim(), text: textInput.value.trim(), date: new Date().toLocaleDateString('pt-BR') };
    let comments = JSON.parse(localStorage.getItem(`comments_${activePostId}`)) || [];
    comments.push(newComment);
    localStorage.setItem(`comments_${activePostId}`, JSON.stringify(comments));
    
    nameInput.value = ""; textInput.value = "";
    loadComments(activePostId);
});

closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));

// Tema, Busca e Likes
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.innerText = document.body.classList.contains('dark-mode') ? "☀️ MODO CLARO" : "🌙 MODO ESCURO";
});

document.getElementById('search-input').addEventListener('input', function(e) {
    const val = e.target.value.toLowerCase().trim();
    postCards.forEach(card => {
        card.style.display = card.getAttribute('data-title').includes(val) ? 'flex' : 'none';
    });
});

document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const span = this.querySelector('.like-count');
        let count = parseInt(span.innerText);
        this.classList.toggle('liked');
        count = this.classList.contains('liked') ? count + 1 : count - 1;
        span.innerText = count;
        this.style.background = this.classList.contains('liked') ? 'var(--text-color)' : 'transparent';
        this.style.color = this.classList.contains('liked') ? 'var(--bg-color)' : 'var(--text-color)';
    });
});
