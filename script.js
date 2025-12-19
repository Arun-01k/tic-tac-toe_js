const gameBoard = (function() {
    function player1 (name = "Player1") {
        const symbol = "o";
        return name;
    }

    function player2 (name = "Player2") {
        const symbol = "x";
        return name;
    }

    const boardGrid = Array(9).fill(null);  //grid array

    const winnerpattern = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function fillBoardArray(index, symbol) {
        if (boardGrid[index] !== null) return;
        boardGrid[index] = symbol;
    }

    function winnerCheck() {
            for (let pattern of winnerpattern) {
                const [a, b, c] = pattern;
                if (boardGrid[a] && boardGrid[a] === boardGrid[b] && boardGrid[a] === boardGrid[c]) {
                    const winner = boardGrid[a];
                    return {winner, pattern};
                }
            }
    }

    function boardArrayReset() {
        boardGrid.fill(null);
    }

    const writeToDOM = (selector, message) => {
        document.querySelector(selector).textContent = message;
    }

    return {player1, player2, fillBoardArray, winnerCheck, boardArrayReset, writeToDOM}

})();



const gameBoardDom = document.querySelector(".container");
const block = document.querySelectorAll(".block");
const button = document.querySelector("button");
const player1 = document.querySelector("#player1name");
const player2 = document.querySelector("#player2name");
const announceDiv = document.querySelector(".winner-anounce");

let firstClick = true;
let gameOver = false;
let startGame = false;

button.addEventListener("click", ()=> {
    if(!gameOver) {
        startGame = true;
        const p1 = gameBoard.player1(player1.value);
        const p2 = gameBoard.player2(player2.value);
        playerNames = {p1, p2}
    } else {
        gameOver = false;
        gameBoard.boardArrayReset();
        block.forEach(item => item.textContent = "");
        announceDiv.textContent = "👀";
    }
});


function declareWinner() {
    const result = gameBoard.winnerCheck();
        if(result) {
            gameOver = true;
            button.textContent = "Restart";
            announceDiv.textContent = result.winner == 'o' ? `${playerNames.p1} won` : `${playerNames.p2} won`;
        }
};


gameBoardDom.addEventListener("click", (e)=> {
    if(!startGame) return;
    if(gameOver) return;
    const block = e.target;

    if (!block.classList.contains("block")) return;

    if (block.textContent !== "") return;

    const index = block.dataset.index;

    if(firstClick) {
        gameBoard.writeToDOM(`#${block.id}`, "o");
        firstClick = false;
        gameBoard.fillBoardArray(index, "o");
    }else {
        gameBoard.writeToDOM(`#${block.id}`, "x")
        firstClick = true;
        gameBoard.fillBoardArray(index, "x");
    };

    declareWinner();
        
});