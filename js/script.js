/* ========================================
   JAVASCRIPT SIMPLIFICADO - HOTEL AGE
   Código básico e fácil de entender
   ======================================== */

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Inicia todas as funcionalidades
    iniciarCarousel();
    iniciarValidacaoFormulario();
    iniciarBotaoVoltarTopo();
    calcularPrecoReserva();
    iniciarFormatacaoTelefone(); // Chamada para a nova função de formatação de telefone
    iniciarMenuHamburguer();    // Chamada para a nova função do menu hambúrguer
    console.log('✓ Sistema Hotel Age carregado com sucesso!');
});

/* ========================================
   1. CAROUSEL (CARROSSEL DE IMAGENS)
   ======================================== */

// Variável que guarda qual slide está ativo (global para as funções do carousel)
let slideAtual = 0;
let intervaloTroca; // Variável para controlar a troca automática

// Função para criar o carousel na página
function iniciarCarousel() {
    // Busca a seção hero no HTML
    const hero = document.getElementById('hero');
    
    // Se não encontrar, para a função
    if (!hero) return;

    // Define os dados dos slides (imagens e textos)
    const slidesData = [
        { img: "img/Designer.png", alt: "Fachada do Hotel Age", title: "Bem-vindo ao Hotel Age", text: "Experimente o melhor da hospitalidade brasileira" },
        { img: "img/Quarto.png", alt: "Quarto confortável", title: "Quartos Confortáveis", text: "Acomodações pensadas para seu bem-estar" },
        { img: "img/Foto1.jpeg", alt: "Lobby elegante", title: "Ambiente Sofisticado", text: "Elegância em cada detalhe" },
        { img: "img/Foto9.jpeg", alt: "Restaurante", title: "Gastronomia de Excelência", text: "Sabores que encantam" }
    ];

    // Constrói o HTML do carousel dinamicamente
    let carouselSlidesHTML = '';
    let carouselIndicatorsHTML = '';

    slidesData.forEach((data, index) => {
        carouselSlidesHTML += `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                <img src="${data.img}" alt="${data.alt}">
                <div class="carousel-content">
                    <h2>${data.title}</h2>
                    <p>${data.text}</p>
                </div>
            </div>`;
        carouselIndicatorsHTML += `<span class="indicator ${index === 0 ? 'active' : ''}" data-slide-index="${index}"></span>`;
    });

    const carouselHTML = `
        <div class="carousel-container">
            ${carouselSlidesHTML}
            <button class="carousel-btn prev">&#10094;</button>
            <button class="carousel-btn next">&#10095;</button>
            <div class="carousel-indicators">
                ${carouselIndicatorsHTML}
            </div>
        </div>`;

    // Insere o carousel no HTML
    hero.innerHTML = carouselHTML;

    // Adiciona event listeners aos botões e indicadores
    document.querySelector('.carousel-btn.next').addEventListener('click', () => mudarSlide(1));
    document.querySelector('.carousel-btn.prev').addEventListener('click', () => mudarSlide(-1));
    
    document.querySelectorAll('.carousel-indicators .indicator').forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            irParaSlide(parseInt(e.target.dataset.slideIndex));
        });
    });

    // Inicia a troca automática de slides
    iniciarTrocaAutomatica();

    // Pausa e retoma o autoplay ao passar o mouse
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', pararTrocaAutomatica);
        carouselContainer.addEventListener('mouseleave', iniciarTrocaAutomatica);
    }
}

// Função para mudar de slide (quando clica nas setas)
function mudarSlide(direcao) {
    // Busca todos os slides
    const slides = document.querySelectorAll('.carousel-slide');
    const indicadores = document.querySelectorAll('.carousel-indicators .indicator');
    
    // Se não encontrar slides, para a função
    if (!slides.length) return;

    // Remove a classe 'active' do slide atual
    slides[slideAtual].classList.remove('active');
    indicadores[slideAtual].classList.remove('active');

    // Calcula qual será o próximo slide
    slideAtual = slideAtual + direcao;
    
    // Se passou do último slide, volta para o primeiro
    if (slideAtual >= slides.length) {
        slideAtual = 0;
    }
    // Se voltou antes do primeiro, vai para o último
    else if (slideAtual < 0) {
        slideAtual = slides.length - 1;
    }

    // Adiciona a classe 'active' no novo slide
    slides[slideAtual].classList.add('active');
    indicadores[slideAtual].classList.add('active');
}

// Função para ir direto para um slide específico (quando clica nos indicadores)
function irParaSlide(numero) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicadores = document.querySelectorAll('.carousel-indicators .indicator');
    
    if (!slides.length) return;

    // Remove active do slide atual
    slides[slideAtual].classList.remove('active');
    indicadores[slideAtual].classList.remove('active');

    // Define o novo slide
    slideAtual = numero;

    // Adiciona active no novo slide
    slides[slideAtual].classList.add('active');
    indicadores[slideAtual].classList.add('active');
}

// Função para iniciar a troca automática de slides
function iniciarTrocaAutomatica() {
    pararTrocaAutomatica(); // Garante que apenas um intervalo esteja ativo
    // A cada 5 segundos (5000 milissegundos), muda para o próximo slide
    intervaloTroca = setInterval(function() {
        mudarSlide(1);
    }, 5000);
}

// Função para parar a troca automática
function pararTrocaAutomatica() {
    clearInterval(intervaloTroca);
}


/* ========================================
   2. FUNCIONALIDADE DO MENU HAMBÚRGUER
   ======================================== */
function iniciarMenuHamburguer() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav'); // Seleciona a tag <nav>

    if (hamburgerBtn && nav) {
        hamburgerBtn.addEventListener('click', () => {
            nav.classList.toggle('active'); // Adiciona/remove a classe 'active' à tag <nav>
            hamburgerBtn.classList.toggle('open'); // Adiciona/remove a classe 'open' ao botão para animá-lo
        });

        // Fechar o menu se clicar fora dele ou em um link (opcional, mas bom para UX)
        document.addEventListener('click', (event) => {
            if (nav.classList.contains('active') && !nav.contains(event.target) && !hamburgerBtn.contains(event.target)) {
                nav.classList.remove('active');
                hamburgerBtn.classList.remove('open');
            }
        });

        // Fechar o menu ao clicar em um item da lista de navegação (para single-page ou âncoras)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburgerBtn.classList.remove('open');
            });
        });
    }
}


/* ========================================
   3. VALIDAÇÃO DE FORMULÁRIOS
   ======================================== */

function iniciarValidacaoFormulario() {
    // Busca todos os formulários da página
    const formularios = document.querySelectorAll('form');

    // Para cada formulário encontrado
    formularios.forEach(function(form) {
        // Busca todos os campos do formulário
        const campos = form.querySelectorAll('input, select, textarea');

        // Para cada campo, adiciona validação quando perder o foco
        campos.forEach(function(campo) {
            campo.addEventListener('blur', function() {
                validarCampo(this);
            });
        });

        // Quando tentar enviar o formulário
        form.addEventListener('submit', function(evento) {
            // Impede o envio padrão
            evento.preventDefault();
            
            // Variável para verificar se tudo está válido
            let todosValidos = true;

            // Valida todos os campos
            campos.forEach(function(campo) {
                if (!validarCampo(campo)) {
                    todosValidos = false;
                }
            });

            // Se tudo estiver válido
            if (todosValidos) {
                mostrarMensagem('Formulário enviado com sucesso!', 'sucesso');
                // Aqui poderia enviar o formulário de verdade
                // form.submit();
            } else {
                mostrarMensagem('Por favor, corrija os erros no formulário.', 'erro');
            }
        });
    });
}

// Função que valida um campo específico
function validarCampo(campo) {
    // Remove mensagens de erro antigas
    removerErro(campo);
    campo.classList.remove('error');

    // 1. Verifica se o campo obrigatório está vazio
    if (campo.hasAttribute('required') && !campo.value.trim()) {
        mostrarErro(campo, 'Este campo é obrigatório');
        return false;
    }

    // 2. Valida e-mail
    if (campo.type === 'email' && campo.value) {
        // Expressão regular simples para validar e-mail
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValido.test(campo.value)) {
            mostrarErro(campo, 'Por favor, insira um email válido');
            return false;
        }
    }

    // 3. Valida telefone
    if (campo.type === 'tel' && campo.value) {
        // Expressão regular para validar telefone brasileiro (com ou sem DDD, com 8 ou 9 dígitos)
        const telefoneValido = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/;
        if (!telefoneValido.test(campo.value)) {
            mostrarErro(campo, 'Formato: (11) 99999-9999 ou (11) 9999-9999');
            return false;
        }
    }

    // 4. Valida data (para check-in/check-out)
    if (campo.type === 'date' && campo.value) {
        const dataSelecionada = new Date(campo.value);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        // Se for um campo de check-out, verifica também se é depois do check-in
        if (campo.id === 'checkout') {
            const checkinField = document.getElementById('checkin');
            if (checkinField && checkinField.value) {
                const dataCheckin = new Date(checkinField.value);
                dataCheckin.setHours(0, 0, 0, 0);
                if (dataSelecionada <= dataCheckin) {
                    mostrarErro(campo, 'A data de checkout deve ser posterior à data de checkin.');
                    return false;
                }
            }
        } else if (dataSelecionada < hoje) { // Para check-in, a data deve ser futura ou hoje
            mostrarErro(campo, 'A data deve ser futura ou a data de hoje.');
            return false;
        }
    }

    // Se passou em todas as validações
    return true;
}

// Função para mostrar erro em um campo
function mostrarErro(campo, mensagem) {
    // Adiciona classe de erro no campo
    campo.classList.add('error');
    
    // Cria uma div com a mensagem de erro
    const divErro = document.createElement('div');
    divErro.className = 'error-message';
    divErro.textContent = mensagem;
    
    // Insere a mensagem após o campo
    // Verifica se já existe uma mensagem de erro para evitar duplicidade
    const erroExistente = campo.parentNode.querySelector('.error-message');
    if (!erroExistente) {
        campo.parentNode.appendChild(divErro);
    }
}

// Função para remover mensagem de erro
function removerErro(campo) {
    const erroAntigo = campo.parentNode.querySelector('.error-message');
    if (erroAntigo) {
        erroAntigo.remove();
    }
}

// Função para mostrar mensagem geral (sucesso ou erro)
function mostrarMensagem(texto, tipo) {
    // Remove mensagem antiga se existir
    const mensagemAntiga = document.querySelector('.notificacao');
    if (mensagemAntiga) {
        mensagemAntiga.remove();
    }

    // Cria a nova mensagem
    const mensagem = document.createElement('div');
    mensagem.className = `notificacao ${tipo}`; // Adiciona classe 'sucesso' ou 'erro'
    mensagem.textContent = texto;
    
    // Estilos inline (apenas para exemplo, idealmente no CSS)
    mensagem.style.position = 'fixed';
    mensagem.style.top = '20px';
    mensagem.style.right = '20px';
    mensagem.style.padding = '15px 30px';
    mensagem.style.borderRadius = '8px';
    mensagem.style.color = 'white';
    mensagem.style.fontWeight = 'bold';
    mensagem.style.zIndex = '9999';
    mensagem.style.opacity = '0'; // Começa transparente para animar
    mensagem.style.transition = 'opacity 0.5s ease-in-out';


    // Define a cor baseada no tipo (idealmente no CSS via classe)
    if (tipo === 'sucesso') {
        mensagem.style.backgroundColor = '#4caf50';
    } else {
        mensagem.style.backgroundColor = '#d32f2f';
    }

    // Adiciona ao body e anima
    document.body.appendChild(mensagem);
    setTimeout(() => {
        mensagem.style.opacity = '1';
    }, 10); // Pequeno atraso para a transição funcionar

    // Remove após 5 segundos
    setTimeout(function() {
        mensagem.style.opacity = '0'; // Anima o fade out
        mensagem.addEventListener('transitionend', () => mensagem.remove()); // Remove após a transição
    }, 5000);
}

/* ========================================
   4. BOTÃO VOLTAR AO TOPO
   ======================================== */

function iniciarBotaoVoltarTopo() {
    // Cria o botão
    const botao = document.createElement('button');
    botao.id = 'backToTop';
    botao.innerHTML = '↑';
    botao.title = 'Voltar ao topo';
    // Estilos para o botão (idealmente no CSS)
    botao.style.display = 'none'; // Esconde por padrão
    botao.style.position = 'fixed';
    botao.style.bottom = '20px';
    botao.style.right = '20px';
    botao.style.backgroundColor = '#0056b3';
    botao.style.color = 'white';
    botao.style.border = 'none';
    botao.style.borderRadius = '50%';
    botao.style.width = '50px';
    botao.style.height = '50px';
    botao.style.fontSize = '1.5rem';
    botao.style.cursor = 'pointer';
    botao.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    botao.style.zIndex = '999';
    botao.style.transition = 'background-color 0.3s ease, transform 0.3s ease';

    // Hover effect
    botao.onmouseover = () => { botao.style.backgroundColor = '#003d82'; botao.style.transform = 'translateY(-2px)'; };
    botao.onmouseout = () => { botao.style.backgroundColor = '#0056b3'; botao.style.transform = 'translateY(0)'; };

    // Quando clicar no botão
    botao.addEventListener('click', function() {
        // Volta ao topo da página suavemente
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Adiciona o botão na página
    document.body.appendChild(botao);

    // Mostra/esconde o botão baseado na rolagem
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            botao.style.display = 'block';
        } else {
            botao.style.display = 'none';
        }
    });
}

/* ========================================
   5. CÁLCULO DE PREÇO DA RESERVA
   ======================================== */

function calcularPrecoReserva() {
    // Busca o formulário de reservas (usando o ID da section para ser mais específico)
    const formReserva = document.querySelector('#formulario-reserva form');
    if (!formReserva) return; // Se não estiver na página de reservas, sai

    // Busca os campos necessários
    const tipoQuartoSelect = formReserva.querySelector('#tipo-quarto');
    const checkinInput = formReserva.querySelector('#check-in'); // Ajustado para 'check-in'
    const checkoutInput = formReserva.querySelector('#check-out'); // Ajustado para 'check-out'
    const resumoContainer = document.getElementById('resumo-reserva'); // Container onde o resumo será exibido

    // Se não encontrar os campos, para a função
    if (!tipoQuartoSelect || !checkinInput || !checkoutInput || !resumoContainer) {
        console.warn('Campos de cálculo de reserva não encontrados. Função desativada.');
        return;
    }

    // Tabela de preços por tipo de quarto
    const precos = {
        'solteiro': 200, // Exemplo de preço, ajuste conforme seu HTML
        'duplo': 300,
        'familia': 450,
        'suite': 600
    };

    // Função que faz o cálculo
    function calcular() {
        // Pega os valores dos campos
        const quartoSelecionado = tipoQuartoSelect.value;
        const dataCheckin = new Date(checkinInput.value);
        const dataCheckout = new Date(checkoutInput.value);

        // Validações básicas (ajustadas para usar a função validarCampo)
        const isCheckinValid = validarCampo(checkinInput);
        const isCheckoutValid = validarCampo(checkoutInput);
        const isQuartoValid = quartoSelecionado !== ''; // Assumindo que o primeiro option é vazio ou "Selecione"

        if (isCheckinValid && isCheckoutValid && isQuartoValid && dataCheckout > dataCheckin) {
            // Calcula quantos dias
            const diferencaMilissegundos = dataCheckout - dataCheckin;
            const dias = Math.ceil(diferencaMilissegundos / (1000 * 60 * 60 * 24));
            
            // Pega o preço do quarto escolhido
            const precoPorNoite = precos[quartoSelecionado] || 0;
            
            // Calcula o total
            const total = dias * precoPorNoite;

            // Atualiza o conteúdo do resumo
            resumoContainer.innerHTML = `
                <h3>Resumo da Reserva</h3>
                <p><strong>Tipo de Quarto:</strong> ${quartoSelecionado.charAt(0).toUpperCase() + quartoSelecionado.slice(1)}</p>
                <p><strong>Número de diárias:</strong> ${dias}</p>
                <p><strong>Preço por noite:</strong> R$ ${precoPorNoite.toFixed(2).replace('.', ',')}</p>
                <p style="font-size: 20px; color: #0056b3;"><strong>Total:</strong> R$ ${total.toFixed(2).replace('.', ',')}</p>
            `;
            resumoContainer.style.backgroundColor = '#f0f8ff';
            resumoContainer.style.padding = '20px';
            resumoContainer.style.borderRadius = '8px';
            resumoContainer.style.marginTop = '20px';
            resumoContainer.style.border = '1px solid #e0e0e0';

        } else {
            // Limpa o resumo se as condições não forem atendidas
            resumoContainer.innerHTML = '';
            resumoContainer.style = ''; // Remove estilos inline
        }
    }

    // Adiciona o cálculo quando os campos mudarem
    tipoQuartoSelect.addEventListener('change', calcular);
    checkinInput.addEventListener('change', () => { validarCampo(checkinInput); calcular(); });
    checkoutInput.addEventListener('change', () => { validarCampo(checkoutInput); calcular(); });
    
    // Dispara um cálculo inicial caso os campos já venham preenchidos (ex: recarregou a página)
    calcular();
}

/* ========================================
   6. FORMATAÇÃO AUTOMÁTICA DE TELEFONE
   ======================================== */

function iniciarFormatacaoTelefone() {
    // Busca todos os campos de telefone
    const camposTelefone = document.querySelectorAll('input[type="tel"]');

    // Para cada campo de telefone
    camposTelefone.forEach(function(campo) {
        // Quando digitar algo
        campo.addEventListener('input', function(e) {
            // Remove tudo que não é número
            let valor = e.target.value.replace(/\D/g, '');
            
            // Formata o telefone enquanto digita
            if (valor.length > 0) {
                if (valor.length <= 2) {
                    valor = '(' + valor;
                } else if (valor.length <= 6) {
                    valor = '(' + valor.slice(0, 2) + ') ' + valor.slice(2);
                } else if (valor.length <= 10) { // 9xxxx-xxxx ou 4xxxx-xxxx
                    valor = '(' + valor.slice(0, 2) + ') ' + valor.slice(2, 6) + '-' + valor.slice(6);
                } else { // (DD) 9XXXX-XXXX
                    valor = '(' + valor.slice(0, 2) + ') ' + valor.slice(2, 7) + '-' + valor.slice(7, 11);
                }
            }
            
            // Atualiza o valor do campo
            e.target.value = valor;
        });
    });
}

/* ========================================
   FIM DO SCRIPT
   ======================================== */

console.log('✓ Todas as funções foram carregadas:');
console.log('  - Carousel');
console.log('  - Menu Hambúrguer');
console.log('  - Validação de Formulários');
console.log('  - Botão Voltar ao Topo');
console.log('  - Cálculo de Preço');
console.log('  - Formatação de Telefone');
