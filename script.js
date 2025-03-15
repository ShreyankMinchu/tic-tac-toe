document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const statusText = document.getElementById("status");
    const restartBtn = document.getElementById("restart");
    const modeSelection = document.getElementById("mode-selection");
    const twoPlayerBtn = document.querySelector("#mode-selection button:nth-child(1)");
    const aiBtn = document.querySelector("#mode-selection button:nth-child(2)");

    let boardState = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameMode = "";
    let gameActive = false;

    twoPlayerBtn.addEventListener("click", () => startGame("two-player"));
    aiBtn.addEventListener("click", () => startGame("ai"));

    function startGame(mode) {
        gameMode = mode;
        board.innerHTML = "";
        boardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        statusText.textContent = `Your Turn (${currentPlayer})`;
        
        // Show the board and restart button
        board.classList.remove("hidden");
        restartBtn.classList.remove("hidden");
        modeSelection.classList.add("hidden");

        // Create the Tic-Tac-Toe grid
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleMove, { passive: true });
            board.appendChild(cell);
        }
    }

    function handleMove(event) {
        const index = event.target.dataset.index;
        if (!gameActive || boardState[index] !== "") return;

        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            statusText.textContent = `${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (!boardState.includes("")) {
            statusText.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Your Turn (${currentPlayer})`;

        if (gameMode === "ai" && currentPlayer === "O") {
            setTimeout(aiMove, 500);
        }
    }

    function aiMove() {
        let emptyCells = boardState.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        boardState[randomIndex] = "O";
        document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = "O";

        if (checkWin()) {
            statusText.textContent = `O Wins!`;
            gameActive = false;
            return;
        }

        if (!boardState.includes("")) {
            statusText.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }

        currentPlayer = "X";
        statusText.textContent = `Your Turn (X)`;
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function restartGame() {
        gameActive = false;
        board.classList.add("hidden");
        restartBtn.classList.add("hidden");
        modeSelection.classList.remove("hidden");
        statusText.textContent = "";
    }

    restartBtn.addEventListener("click", restartGame);
});