// =============================================
// Carrossel - js/carrossel/script.js
// =============================================

const carrosseis = {}; // guarda o índice atual de cada carrossel
const intervalos = {}; // guarda o timer de autoplay de cada carrossel

function iniciarCarrossel(id) {
    const track = document.getElementById('track-' + id);
    if (!track) return;

    const imagens = track.querySelectorAll('img');
    carrosseis[id] = 0;

    // Mostra só a primeira imagem
    imagens.forEach((img, i) => {
        img.style.display = i === 0 ? 'block' : 'none';
    });

    // Cria as bolinhas
    const container = track.closest('.carrossel');
    const bolinhas = container.querySelector('.bolinhas');
    if (bolinhas) {
        bolinhas.innerHTML = '';
        imagens.forEach((_, i) => {
            const bolinha = document.createElement('span');
            bolinha.classList.add('bolinha');
            if (i === 0) bolinha.classList.add('ativa');
            bolinha.addEventListener('click', () => irParaSlide(id, i));
            bolinhas.appendChild(bolinha);
        });
    }

    // Inicia o autoplay (troca a cada 3 segundos)
    intervalos[id] = setInterval(() => {
        moverCarrossel(id, 1);
    }, 3000);
}

function moverCarrossel(id, direcao) {
    const track = document.getElementById('track-' + id);
    if (!track) return;

    const imagens = track.querySelectorAll('img');
    const total = imagens.length;

    carrosseis[id] = (carrosseis[id] + direcao + total) % total;
    atualizarCarrossel(id, imagens);
}

function irParaSlide(id, indice) {
    const track = document.getElementById('track-' + id);
    if (!track) return;

    const imagens = track.querySelectorAll('img');
    carrosseis[id] = indice;
    atualizarCarrossel(id, imagens);

    // Reinicia o autoplay ao clicar na bolinha
    clearInterval(intervalos[id]);
    intervalos[id] = setInterval(() => {
        moverCarrossel(id, 1);
    }, 3000);
}

function atualizarCarrossel(id, imagens) {
    const indiceAtual = carrosseis[id];

    // Mostra/esconde imagens
    imagens.forEach((img, i) => {
        img.style.display = i === indiceAtual ? 'block' : 'none';
    });

    // Atualiza bolinhas
    const track = document.getElementById('track-' + id);
    const container = track.closest('.carrossel');
    const bolinhas = container.querySelectorAll('.bolinha');
    bolinhas.forEach((b, i) => {
        b.classList.toggle('ativa', i === indiceAtual);
    });
}

// Inicia todos os carrosseis da página ao carregar
document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrossel('drinks');
    iniciarCarrossel('cardapios');
});