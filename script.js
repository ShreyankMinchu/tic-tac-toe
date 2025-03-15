document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const restartButton = document.getElementById("restart");
    const twoPlayerButton = document.getElementById("twoPlayer");
    const aiButton = document.getElementById("playAI");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;
    let againstAI = false;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function checkWinner() {
        for (let combination of winningCombinations) {
            let [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                status.innerText = `${board[a]} Wins!`;
                gameActive = false;
                return true;
            }
        }
        if (!board.includes("")) {
            status.innerText = "It's a Draw!";
            gameActive = false;
            return true;
        }
        return false;
    }

    function aiMove() {
        if (!gameActive) return;

        let emptyCells = board.map((val, index) => (val === "" ? index : null)).filter(val => val !== null);
        let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (randomMove !== undefined) {
            board[randomMove] = "O";
            cells[randomMove].innerText = "O";
            cells[randomMove].style.color = "red";
            checkWinner();
            currentPlayer = "X";
            status.innerText = "Your Turn (X)";
        }
    }

    function handleCellClick(event) {
        let index = event.target.getAttribute("data-index");

        if (!gameActive || board[index] !== "") return;

        board[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        event.target.style.color = currentPlayer === "X" ? "cyan" : "red";

        if (checkWinner()) return;

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.innerText = `Your Turn (${currentPlayer})`;

        if (againstAI && currentPlayer === "O") {
            setTimeout(aiMove, 500);
        }
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        status.innerText = "Your Turn (X)";
        cells.forEach(cell => cell.innerText = "");
    }

    function startTwoPlayer() {
        resetGame();
        againstAI = false;
    }

    function startAI() {
        resetGame();
        againstAI = true;
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", resetGame);
    twoPlayerButton.addEventListener("click", startTwoPlayer);
    aiButton.addEventListener("click", startAI);
});