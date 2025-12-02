const gameBoardElements = (function() {
    function player1 (name) {
        const symbol = "o";
        return {name, symbol};
    }

    function player2 (name) {
        const symbol = "x";
        return {name, symbol};
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

    function winner() {
            for (let pattern of winnerpattern) {
                const [a, b, c] = pattern;
                if (boardGrid[a] && boardGrid[a] === boardGrid[b] && boardGrid[a] === boardGrid[c]) {
                    console.log(boardGrid[a] === "o" ? "player1 wins" : "player2 wins");
                    boardGrid.fill(null);
                    return;
                }
            }
    }

    return {player1, player2, boardGrid, winner}
})();

