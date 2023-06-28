// Initial Construction
let square = {
    a1: '',
    a2: '',
    a3: '',

    b1: '',
    b2: '',
    b3: '',

    c1: '',
    c2: '',
    c3: '',
};

let player = '';
let warning = '';
let playing = false;
let score = {
    x: 0,
    o: 0
};
let currentPlayer = 'x';


// Events
document.querySelector('.reset').addEventListener('click', reset);

/*1º forma de realizar o evento de click no jogo
document.querySelector('div[data-item=a1').addEventListener('click', itemClick);
document.querySelector('div[data-item=a2').addEventListener('click', itemClick);
document.querySelector('div[data-item=a3').addEventListener('click', itemClick);

document.querySelector('div[data-item=b1').addEventListener('click', itemClick);
document.querySelector('div[data-item=b2').addEventListener('click', itemClick);
document.querySelector('div[data-item=b3').addEventListener('click', itemClick);

document.querySelector('div[data-item=c1').addEventListener('click', itemClick);
document.querySelector('div[data-item=c2').addEventListener('click', itemClick);
document.querySelector('div[data-item=c3').addEventListener('click', itemClick);
*/

//2º forma mais simples
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

reset();

// Functions
function reset () {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    currentPlayer = (random === 0) ? 'x' : 'o';
    player = currentPlayer;

    for (let i in square) {
        square[i] = '';
    }
    clearBoardStyle();
    renderSquare();
    renderInfo();
    updateScore();
    updateCurrentPlayer();

    playing = true;
}

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = currentPlayer;
        renderSquare();
        tooglePlayer();
    }
}


function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
        item.classList.remove('x', 'o');

        if(square[i] === 'x') {
            item.classList.add('x');
        } else if (square[i] === 'o') {
            item.classList.add('o');
        }
    }

    checkGame();
}

function renderInfo() {
    //document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}


function tooglePlayer(){
    currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
    renderInfo();
    updateCurrentPlayer();
}


function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "x" foi o vencedor!';
        score.x++; // Incrementa a pontuação do jogador 'x'
        playing = false;
        applyWinnerStyle('x');
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" foi o vencedor!';
        score.o++; // Incrementa a pontuação do jogador 'o'
        playing = false;
        applyWinnerStyle('o');
    } else if (isFull()) {
        warning = 'Vocês empataram!';
        playing = false;
    }
    updateScore(); // Atualiza o placar após verificar o jogo
}


function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon) {
            return true;
        }
    } 

    return false;
}

function applyWinnerStyle(player) {
    let pos = [
      // Sequências de vitória na horizontal
      ['a1', 'a2', 'a3'],
      ['b1', 'b2', 'b3'],
      ['c1', 'c2', 'c3'],
      // Sequências de vitória na vertical
      ['a1', 'b1', 'c1'],
      ['a2', 'b2', 'c2'],
      ['a3', 'b3', 'c3'],
      // Sequências de vitória nas diagonais
      ['a1', 'b2', 'c3'],
      ['a3', 'b2', 'c1'],
    ];
  
    for (let w in pos) {
      let pArray = pos[w];
      let hasWon = pArray.every((option) => square[option] === player);
      if (hasWon) {
        pArray.forEach((option) => {
          let item = document.querySelector(`div[data-item=${option}]`);
          item.classList.add('winner'); // Adiciona a classe 'victory' às células da sequência de vitória
        });
        break;
      }
    }
}
  
// retirando o plano de fundo do vencedor
function clearBoardStyle() {
    const cells = document.querySelectorAll('.item');
    cells.forEach((cell) => {
      cell.classList.remove('winner');
    });
  }
  
  
  

function isFull() {
    for( let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
}

// Atualização do placar

function updateScore() {
    const scoreElement = document.querySelector('.placar');
    scoreElement.textContent = `${score.x} - ${score.o}`;
}

function updateCurrentPlayer() {
    const currentPlayerElement = document.querySelector('.jogador');
    currentPlayerElement.textContent = currentPlayer;
}