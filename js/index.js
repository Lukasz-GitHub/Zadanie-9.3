'use strict';
// Podpięcie przycisków
var buttonPapier = document.getElementById('paper');
var buttonKamien = document.getElementById('rock');
var buttonNozyce = document.getElementById('scissors');
var buttonNewGame = document.getElementById('newGame');
var output = document.getElementById('output');
var outputRound = document.getElementById('roundsNumber');
var result = document.getElementById('result');
var score = document.querySelector('.score');
var round = 1;

var buttons = document.querySelectorAll('.player-move');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        playerMove(this.getAttribute('data-move'));
    });
}

// Wartość początkowa wyników 
var params = {
    scorePlayer: 0,
    scoreCpu: 0,
    gameRounds: 10,
    progress: []
}

function enableButtons() {
    buttonPapier.disabled = false;
    buttonKamien.disabled = false;
    buttonNozyce.disabled = false;
}

function disableButtons() {
    buttonPapier.disabled = true;
    buttonKamien.disabled = true;
    buttonNozyce.disabled = true;
}

// Modal
var showModal = function () {
    var content = generateResultTable().join('');
    document.getElementById('tbody').innerHTML = content;
    document.querySelector('#modal-overlay').classList.add('show');
};
var hideModal = function () {
    document.querySelector('#modal-overlay').classList.remove('show');
};
document.querySelector('#modal-overlay').addEventListener('click', hideModal);

// New Game / Reset
buttonNewGame.addEventListener('click', function () {
    params.gameRounds = window.prompt('Do ilu rund wygranych chcesz zagrać?', 'Wpisz ilość rund...');
    if (params.gameRounds == "" || isNaN(params.gameRounds) || params.gameRounds < 1) {
        outputRound.innerHTML = 'Wpisz Liczbę!';
    } else {
        outputRound.innerHTML = 'Win ' + params.gameRounds + ' Match Rounds';
        enableButtons();
    }
    // Resetowanie wyników
    resetGame();
});
// Funkcja losujaca wybór cpu
var cpuMove = function () {
    var posibilities = ['paper', 'rock', 'scissors'];
    return posibilities[Math.floor(Math.random() * posibilities.length)];
}
cpuMove();
disableButtons()
// Funkcja gry
var playerMove = function (player) {
    var cpu = cpuMove();
    var winner;
    // Rozgrywka
    if (player === 'rock' && cpu === 'scissors' || player === 'paper' && cpu === 'rock' || player === 'scissors' && cpu === 'paper') {
        params.scorePlayer++;
        winner = "Player";
        result.innerHTML = 'Player - ' + params.scorePlayer + ' : ' + params.scoreCpu + ' - Computer';
        output.innerHTML += 'You Win: you played ' + player + ', computer played ' + cpu + '<br>'

    } else if (cpu === 'rock' && player === 'scissors' || cpu === 'paper' && player === 'rock' || cpu === 'scissors' && player === 'paper') {
        params.scoreCpu++;
        winner = "Computer";
        result.innerHTML = 'Player - ' + params.scorePlayer + ' : ' + params.scoreCpu + ' - Computer';
        output.innerHTML += 'You Lost: you played ' + player + ', computer played ' + cpu + '<br>'
    } else {
        winner = "Draw!\nNo Point";
        output.innerHTML += 'DRAW! You chose the same!<br>'
    }

    params.progress.push({
        roundNumber: round++,
        playerMove: player,
        computerMove: cpu,
        winner: winner,
    });

    if (params.gameRounds == params.scorePlayer) {
        disableButtons();
        score.innerHTML += '<br>YOU WON!<br>Player - ' + params.scorePlayer + ' : ' + params.scoreCpu + ' - Computer<br>To play again press New Game<br>';
        showModal();
    } else if (params.gameRounds == params.scoreCpu) {
        disableButtons();
        score.innerHTML += '<br>YOU LOST!<br>Player - ' + params.scorePlayer + ' : ' + params.scoreCpu + ' - Computer<br>To play again press New Game<br>';
        showModal();
    }
}

// Resetowanie wyników
var resetGame = function () {
    params.scorePlayer = 0;
    params.scoreCpu = 0;
    result.innerHTML = 'Player - ' + params.scorePlayer + ' : ' + params.scoreCpu + ' - Computer';
    output.innerHTML = '';
    params.progress = [];
    score.innerHTML = '';
    round = 1;
}

function generateResultTable() {
    var content = [];

    params.progress.forEach(function (item) {
        var trEl = document.createElement('tr');
        var roundNumberEl = document.createElement('td');
        var playerMoveEl = document.createElement('td');
        var computerMoveEl = document.createElement('td');
        var resultRoundEl = document.createElement('td');

        roundNumberEl.innerText = item.roundNumber;
        playerMoveEl.innerText = item.playerMove;
        computerMoveEl.innerText = item.computerMove;
        resultRoundEl.innerText = item.winner;

        trEl
            .appendChild(roundNumberEl)
            .appendChild(playerMoveEl)
            .appendChild(computerMoveEl)
            .appendChild(resultRoundEl);

        content.push(trEl.outerHTML);
    });

    return content;
}
