// =============================================
// Carrossel - js/carrossel/script.js
// =============================================

// Guarda o índice atual de cada carrossel (ex: drinks, cardapios)
const carrosseis = {};

// Guarda os timers (setInterval) de cada carrossel
const intervalos = {};

function iniciarCarrossel(id) {
    // Pega o container de imagens pelo id
    const track = document.getElementById('track-' + id);
    if (!track) return; // segurança caso não exista

    // Seleciona todas as imagens dentro do carrossel
    const imagens = track.querySelectorAll('img');

    // Começa sempre da primeira imagem
    carrosseis[id] = 0;

    // Mostra só a primeira imagem
    imagens.forEach((img, i) => {
        img.style.display = i === 0 ? 'block' : 'none';
    });

    // Pega o container principal do carrossel
    const container = track.closest('.carrossel');

    // Onde ficam as bolinhas de navegação
    const bolinhas = container.querySelector('.bolinhas');

    if (bolinhas) {
        bolinhas.innerHTML = ''; // limpa antes de criar

        // Cria uma bolinha para cada imagem
        imagens.forEach((_, i) => {
            const bolinha = document.createElement('span');
            bolinha.classList.add('bolinha');

            // Primeira bolinha começa ativa
            if (i === 0) bolinha.classList.add('ativa');

            // Clique na bolinha vai direto para o slide
            bolinha.addEventListener('click', () => {
                irParaSlide(id, i);
            });

            bolinhas.appendChild(bolinha);
        });
    }

    // Inicia o autoplay do carrossel
    iniciarAutoplay(id);
}

// Inicia (ou reinicia) o autoplay
function iniciarAutoplay(id) {
    // Evita múltiplos timers rodando ao mesmo tempo
    clearInterval(intervalos[id]);

    // Troca de slide automaticamente a cada 3 segundos
    intervalos[id] = setInterval(() => {
        moverCarrossel(id, 1, false); // false = automático
    }, 3000);
}

// Função separada só para resetar o tempo
function resetarAutoplay(id) {
    iniciarAutoplay(id);
}

// Move o carrossel (direita ou esquerda)
function moverCarrossel(id, direcao, manual = true) {
    const track = document.getElementById('track-' + id);
    if (!track) return;

    const imagens = track.querySelectorAll('img');
    const total = imagens.length;

    // Calcula o novo índice (com loop infinito)
    carrosseis[id] = (carrosseis[id] + direcao + total) % total;

    // Atualiza o que aparece na tela
    atualizarCarrossel(id, imagens);

    // Se foi interação do usuário, reinicia o timer
    if (manual) {
        resetarAutoplay(id);
    }
}

// Vai direto para um slide específico (bolinhas)
function irParaSlide(id, indice) {
    const track = document.getElementById('track-' + id);
    if (!track) return;

    const imagens = track.querySelectorAll('img');

    // Define o índice manualmente
    carrosseis[id] = indice;

    atualizarCarrossel(id, imagens);

    // Reinicia o tempo após clique
    resetarAutoplay(id);
}

// Atualiza imagens e bolinhas na tela
function atualizarCarrossel(id, imagens) {
    const indiceAtual = carrosseis[id];

    // Mostra só a imagem atual
    imagens.forEach((img, i) => {
        img.style.display = i === indiceAtual ? 'block' : 'none';
    });

    // Atualiza bolinhas
    const track = document.getElementById('track-' + id);
    const container = track.closest('.carrossel');
    const bolinhas = container.querySelectorAll('.bolinha');

    bolinhas.forEach((b, i) => {
        // Adiciona/remover classe "ativa"
        b.classList.toggle('ativa', i === indiceAtual);
    });
}

// Inicia os carrosseis quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrossel('drinks');
    iniciarCarrossel('cardapios');
});