// Game variables
let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let againstAI = false;

// Select game mode
function startGame(mode) {
    againstAI = (mode === "ai");
    resetGame();
}

// Handle player move
function makeMove(index) {
    if (boardState[index] === "" && !gameOver) {
        boardState[index] = currentPlayer;
        updateBoard();
        let result = checkWinner();
        if (result) {
            setTimeout(() => alert(result), 200);
            return;
        }
        switchTurn();
    }
}

// Switch turns or let AI play
function switchTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";

    if (againstAI && currentPlayer === "O" && !gameOver) {
        setTimeout(aiMove, 500);
    }
}

// AI Move (Random)
function aiMove() {
    let emptyCells = boardState.map((val, index) => (val === "" ? index : null)).filter(v => v !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex);
}

// Check for winner or draw
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameOver = true;
            return boardState[a] + " Wins!";
        }
    }

    if (!boardState.includes("")) {
        gameOver = true;
        return "Draw!";
    }

    return null;
}

// Reset the game
function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    updateBoard();
}

// Update UI board
function updateBoard() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.innerText = boardState[index];
    });

    let result = checkWinner();
    document.getElementById("status").innerText = result ? result : `Your Turn (${currentPlayer})`;
}