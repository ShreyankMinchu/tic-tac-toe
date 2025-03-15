const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = "X"; // You are X, AI is O

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!gameActive || cell.textContent !== "") return;
        
        const index = cell.getAttribute("data-index");
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        if (checkWinner(currentPlayer)) {
            statusText.textContent = `You Win! 🎉`;
            highlightWinner();
            gameActive = false;
        } else if (!board.includes("")) {
            statusText.textContent = "It's a Draw!";
            gameActive = false;
        } else {
            currentPlayer = "O";
            statusText.textContent = "AI's Turn...";
            setTimeout(aiMove, 500);
        }
    });
});

function aiMove() {
    let bestMove = getBestMove();
    board[bestMove] = "O";
    cells[bestMove].textContent = "O";
    cells[bestMove].classList.add("taken");

    if (checkWinner("O")) {
        statusText.textContent = `AI Wins! 🤖`;
        highlightWinner();
        gameActive = false;
    } else if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = "X";
        statusText.textContent = "Your Turn (X)";
    }
}

function getBestMove() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] === "O" && board[b] === "O" && board[c] === "") return c;
        if (board[a] === "O" && board[c] === "O" && board[b] === "") return b;
        if (board[b] === "O" && board[c] === "O" && board[a] === "") return a;
    }

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] === "X" && board[b] === "X" && board[c] === "") return c;
        if (board[a] === "X" && board[c] === "X" && board[b] === "") return b;
        if (board[b] === "X" && board[c] === "X" && board[a] === "") return a;
    }

    let emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function checkWinner(player) {
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function highlightWinner() {
    winPatterns.forEach(pattern => {
        if (pattern.every(index => board[index] === currentPlayer)) {
            pattern.forEach(index => cells[index].classList.add("win"));
        }
    });
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Your Turn (X)";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken", "win");
    });
}