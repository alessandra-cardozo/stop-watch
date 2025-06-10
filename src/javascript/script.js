// Obtém referências aos elementos HTML usando seus IDs
const timerEl = document.getElementById('timer'); // Elemento onde o tempo é exibido
const marksList = document.getElementById('marks-list'); // Elemento onde as marcas de tempo são listadas

// Variáveis de controle do cronômetro
let intervalId = 0; // ID do intervalo do setInterval para poder limpá-lo
let timer = 0; // O tempo atual do cronômetro em centésimos de segundo
let marks = []; // Array para armazenar as marcas de tempo registradas

/**
 * Formata o tempo dado (em centésimos de segundo) para o formato HH:MM:SS:FF.
 * @param {number} time O tempo em centésimos de segundo.
 * @returns {string} A string formatada do tempo.
 */
const formatTime = (time) => {
    // Calcula horas, minutos, segundos e centésimos
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    // Retorna a string formatada, preenchendo com zeros à esquerda se necessário
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

/**
 * Atualiza o display do cronômetro com o tempo formatado.
 * @param {number} time O valor atual do cronômetro em centésimos de segundo.
 */
const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
}

/**
 * Adiciona uma nova entrada de marca à lista de marcas.
 * Cada marca é estilizada com classes do Tailwind CSS para um visual moderno.
 * @param {number} markIndex O índice da marca (ex: Marca 1, Marca 2).
 * @param {number} markTime O tempo em que a marca foi registrada.
 */
const addMarkToList = (markIndex, markTime) => {
    const markItem = document.createElement('p'); // Cria um novo elemento <p>
    // Adiciona classes Tailwind para estilização do item da marca
    markItem.className = 'bg-gray-700 bg-opacity-70 p-2 rounded-lg text-sm text-gray-200 flex justify-between items-center border border-gray-600 shadow-md';
    // Define o conteúdo HTML do item da marca, incluindo o tempo formatado
    markItem.innerHTML = `<span>Marca ${markIndex}:</span> <span class="font-mono text-purple-300 font-semibold">${formatTime(markTime)}</span>`;
    marksList.appendChild(markItem); // Adiciona o item à lista de marcas
    // Rola para a parte inferior da lista para mostrar a marca mais recente
    marksList.scrollTop = marksList.scrollHeight;
}

/**
 * Alterna o cronômetro entre os estados de iniciar, pausar e continuar.
 */
const toggleTimer = () => {
    const button = document.getElementById('power'); // Pega o botão de play/pause
    const action = button.getAttribute('action'); // Pega o atributo 'action' atual do botão

    clearInterval(intervalId); // Limpa qualquer intervalo existente para evitar múltiplos cronômetros rodando

    if (action === 'start' || action === 'continue') {
        // Inicia ou continua o cronômetro
        intervalId = setInterval(() => {
            timer += 1; // Incrementa o tempo em um centésimo de segundo
            setTimer(timer); // Atualiza o display do cronômetro
        }, 10); // Intervalo de 10ms para atualizar a cada centésimo de segundo
        button.setAttribute('action', 'pause'); // Define a ação para 'pause'
        button.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Altera o ícone para pausar
    } else if (action === 'pause') {
        // Pausa o cronômetro
        button.setAttribute('action', 'continue'); // Define a ação para 'continue'
        button.innerHTML = '<i class="fa-solid fa-play"></i>'; // Altera o ícone para play
    }
}

/**
 * Registra o tempo atual como uma marca e o adiciona à lista.
 */
const markTime = () => {
    marks.push(timer); // Adiciona o valor atual do cronômetro ao array de marcas
    addMarkToList(marks.length, timer); // Adiciona a marca à lista exibida
}

/**
 * Reseta o cronômetro, limpa todas as marcas e redefine o display e o botão de power.
 */
const resetTimer = () => {
    clearInterval(intervalId); // Para o cronômetro
    timer = 0; // Redefine o valor do cronômetro para zero
    marks = []; // Limpa o array de marcas
    setTimer(timer); // Atualiza o display para 00:00:00:00
    marksList.innerHTML = ''; // Limpa o display da lista de marcas
    const button = document.getElementById('power');
    button.setAttribute('action', 'start'); // Redefine a ação do botão de power para 'start'
    button.innerHTML = '<i class="fa-solid fa-play"></i>'; // Redefine o ícone do botão de power para play
}

// Adiciona os event listeners aos botões
document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);
