const resultsDiv = document.getElementById('results');
const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
gameBoard.style.width = '100vw';
gameBoard.style.justifyContent = 'center';
cells.forEach(cell => {
    cell.style.border = '2px solid';
});
restartButton.style.marginTop = '20px';
restartButton.style.padding = '5px';
const undoButton = document.createElement('button');
undoButton.id = 'undoButton';
undoButton.innerText = 'Undo';
undoButton.style.margin = "10px 5px";
undoButton.style.padding = "5px"
document.body.insertBefore(undoButton, restartButton);


undoButton.disabled = true;

let currentPlayer = 'X';
let gameRecord = 0;
let gameRecordlst = [];
cells.forEach((cell) => {
    cell.addEventListener('click', (e)=>{
        gameRecord++;
        if (gameRecord > 0){
            undoButton.disabled = false;
        }
        if (gameRecord == 0){
            currentPlayer = 'X';
        }
        gameRecordlst.push(parseInt(e.target.dataset.cellIndex));
        if (cell.innerText == ""){
            cell.innerText = currentPlayer;
            if (checkForWin()){
                restartGame();
                return;
            }
            else if (checkForDraw()){
                resultsDiv.innerText = "It's a draw!";
                alert("It's a draw!");
                restartGame();
                return;
            }
            currentPlayer = currentPlayer === "X" ? "O":"X";
        }
    })
})

const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
function checkForWin() {
    for (let i = 0; i < winningCombinations.length; i++){
        const [a,b,c] = winningCombinations[i];
        const cellA = document.querySelector(`[data-cell-index="${a}"]`);
        const cellB = document.querySelector(`[data-cell-index="${b}"]`);
        const cellC = document.querySelector(`[data-cell-index="${c}"]`);
        if (cellA.innerText != "" && cellA.innerText === cellB.innerText && cellB.innerText === cellC.innerText){
            resultsDiv.innerText= `${currentPlayer} wins!`;
            alert(`${currentPlayer} wins!`);
            return true;
        }
    }
    return false;
}
function checkForDraw(){
    for (let i = 0; i < cells.length; i++){
        if (cells[i].innerText == ""){
            return false;
        }
    }
    return true;
}
function restartGame(){
    cells.forEach((cell)=>cell.innerText = "");
    resultsDiv.innerText = "";
    currentPlayer = 'X';
}
restartButton.addEventListener('click', restartGame);
function undo(){
    if (gameRecord > 0){
        cells[gameRecordlst[gameRecord-1]].innerText = "";
        gameRecordlst.pop(gameRecord-1);
        gameRecord--;
        currentPlayer = currentPlayer === "X" ? "O":"X";
        undoButton.disabled = gameRecord <= 0;
    }
    else{
        undoButton.disabled = true;
    }
}
if (gameRecord == 0){
    undoButton.disabled = true;
}
undoButton.addEventListener('click', undo);