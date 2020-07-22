'use strict'
const MINE = '💣'
const FLAG = '🚩'
var gGame = {
    score: 0,
    isOn: true,
    minesAmount: 2
}
var gBoard;
var gCell;
function createCells(board) {
    gCell = {
        minesAroundCount: null,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === MINE) gCell.isMine = true;
            else board[i][j] = setMinesNegsCount(board, i, j);
        }
    }
}

function init() {
    gGame.ison = true;
    document.querySelector('h3').innerText = '😀'
    gBoard = createMat(4, 4);
    createMines(gBoard);
    createCells(gBoard);
    printMat(gBoard, '.game-cont');

}

function createMines(board) {
    var boardLocations = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            boardLocations.push({i:i, j:j});
        }
        console.log(boardLocations);
    }
    debugger;
    for (var i = 0;i<gGame.minesAmount;i++){
        var randomLocation =boardLocations.splice(getRndIdx(0,boardLocations.length),1);
        board[randomLocation[0].i][randomLocation[0].j] = MINE;
    }
}

function isMineCell(i, j) {
    return gBoard[i][j] === MINE
}

function setMinesNegsCount(mat, idxI, idxJ) {
    var minesAroundCount = 0;
    for (var i = idxI - 1; i <= idxI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = idxJ - 1; j <= idxJ + 1; j++) {
            if (j < 0 || j >= mat[idxI].length) continue
            if (i === idxI && j === idxJ) continue
            if (isMineCell(i, j)) minesAroundCount++;
            else continue;
        }
    }
    return minesAroundCount;
}

function cellClicked(elCell, i, j) {
    if (gGame.isOn) {
        elCell.style.textIndent = '0px';
        if (elCell.innerText === MINE) {
            elCell.style.backgroundColor = 'red';
            gGame.isOn = false;
            document.querySelector('h3').innerText = '💀'
        } else {
            elCell.style.backgroundColor = 'yellow';
            gGame.score++
        }

    }
}





