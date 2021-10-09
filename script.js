'use strict';

const modalExplanation = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');

// Player1 elements
const player1 = document.querySelector('.player--0');
const score1 = document.getElementById('score--0');
const current1 = document.getElementById('current--0');
/*
Can also write:
    const score1 = document.querySelector('#score--0'/'current--0');
 */

// Player2 elements
const player2 = document.querySelector('.player--1');
const score2 = document.getElementById('score--1');
const current2 = document.getElementById('current--1');

// Buttons elements
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Dice element
const dicePic = document.querySelector('.dice');

// Variables
let currPlayer, currScore1, finalScore1, currScore2, finalScore2;

// Initialization function - New game position
const init = function () {
  currPlayer = 0;
  player1.classList.add('player--active');
  newGameBtn.classList.add('hidden');
  rollBtn.classList.remove('hidden');
  holdBtn.classList.add('hidden');
  dicePic.classList.add('hidden');
  player1.classList.remove('blur');
  player2.classList.remove('blur');
  document.getElementById('name--0').textContent = 'PLAYER 1';
  document.getElementById('name--1').textContent = 'PLAYER 2';
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');

  currScore1 = 0;
  finalScore1 = 0;
  current1.textContent = currScore1;
  score1.textContent = finalScore1;

  currScore2 = 0;
  finalScore2 = 0;
  current2.textContent = currScore2;
  score2.textContent = finalScore2;
};

// For the first loading of the page
init();

// End of the game position
const endOfTheGame = function () {
  rollBtn.classList.add('hidden');
  holdBtn.classList.add('hidden');
  dicePic.classList.add('hidden');

  player1.classList.add('blur');
  player2.classList.add('blur');
};

// Player replacement; The other player's turn
const switchPlayers = function () {
  if (finalScore1 >= 100) {
    player1.classList.add('player--winner');
    endOfTheGame();
  } else if (finalScore2 >= 100) {
    player2.classList.add('player--winner');
    endOfTheGame();
  }

  currPlayer === 0 ? (currPlayer = 1) : (currPlayer = 0);

  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');

  currScore1 = 0;
  currScore2 = 0;
  current1.textContent = currScore1;
  current2.textContent = currScore2;
};

newGameBtn.addEventListener('click', init);

// Cube roll function
rollBtn.addEventListener('click', function () {
  const number = Math.trunc(Math.random() * 6) + 1;
  dicePic.src = `./photos/dice-${number}.png`;
  newGameBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
  dicePic.classList.remove('hidden');

  if (number !== 1) {
    if (currPlayer === 0) {
      currScore1 += number;
      current1.textContent = currScore1;
    } else {
      currScore2 += number;
      current2.textContent = currScore2;
    }
    // The drawn number is 1
  } else switchPlayers();
});

// Hold functionality
holdBtn.addEventListener('click', function () {
  finalScore1 += currScore1;
  score1.textContent = finalScore1;
  finalScore2 += currScore2;
  score2.textContent = finalScore2;
  switchPlayers();
});

const showModal = function () {
  modalExplanation.classList.remove('hidden');
};
showModal();

// ----- Close modal functionalities -----
const closeModal = function () {
  modalExplanation.classList.add('hidden');
};

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !closeModalBtn.classList.contains('hidden'))
    closeModal();
});

closeModalBtn.addEventListener('click', closeModal);
