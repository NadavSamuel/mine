'use strict'
const MINE = '💣';
const FLAG = '🚩';
const HINT = '🤔';
const HINTON = '💡';

var gBoardLength;
var gBoardWidth;
var gGame = {
    score: 0,
    isOn: true,
}
var gLevel = {
    size: 4,
    mines: 2,
    hints:3
}
var gBoard;
var gCell;
function createCells(board) {
    gCell = {
        isMine: false,
        isMarked: false,
        isFlag: false,
        isHint:false
    }
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === MINE) gCell.isMine = true;
            else board[i][j] = setMinesNegsCount(board, i, j);
            if (board[i][j] === 0) board[i][j] = '';
        }
    }
}

function init() {
    var elHints = document.querySelector('.hints h3')
    elHints.innerHTML = '';
    gGame.score = 0;
    gGame.isOn = true;
    document.querySelector('h3').innerText = '😀'
    gBoard = createMat(gLevel.size, gLevel.size);
    createCells(gBoard);
    printMat(gBoard, '.game-cont');
    // creatHints();
}

function createMines(board,emptyCell) {
    var boardLocations = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (i == emptyCell.dataset.i && j == emptyCell.dataset.j)continue
            boardLocations.push({ i: i, j: j });
        }
    }
    for (var i = 0; i < gLevel.mines; i++) {
        var randomLocation = boardLocations.splice(getRndIdx(0, boardLocations.length), 1);
        board[randomLocation[0].i][randomLocation[0].j] = MINE;
    }
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

function cellClicked(elCell) {
    if (gGame.score === 0){
        createMines(gBoard,elCell);
        createCells(gBoard);
        printMat(gBoard, '.game-cont');
        console.table(gBoard)
    }
    elCell =document.querySelector(`.cell${elCell.dataset.i}-${elCell.dataset.j}`)
    if (gGame.isOn) {
        // if(showHint()){
        //     showAllNegs(gBoard, elCell.dataset.i, elCell.dataset.j)
        // }
        if (elCell.dataset.isflag === 'false') {
            elCell.style.textIndent = '0px';
            if (elCell.dataset.ismine === 'true') {
                elCell.style.backgroundColor = 'red';
                gGame.isOn = false;
                document.querySelector('h3').innerText = '💀'
            } else if (elCell.dataset.ismarked === 'false') {
                if (elCell.innerText === '') {
                    expendShowen(gBoard, elCell.dataset.i, elCell.dataset.j)
                }
                elCell.dataset.ismarked = 'true'
                elCell.style.backgroundColor = 'yellow';
                gGame.score++;
                if (gGame.score === (gLevel.size ** 2) - gLevel.mines) {
                    gGame.isOn = false;
                    document.querySelector('h3').innerText = '😎'

                }
            }
        }
    }
}
function cellFlaged(elCell) {
    if(!gGame.isOn) return;
    if(gGame.score === 0) return;
    var elSpan = elCell.querySelector('span');
    if (elCell.dataset.isflag === 'false' && elCell.dataset.ismarked === 'false') {
        elCell.dataset.isflag = 'true'
        elSpan.classList.toggle('flag');
        elSpan.style.textIndent = '0px';
    }
    else if (elCell.dataset.isflag === 'true') {
        elCell.dataset.isflag = 'false';
        elSpan.classList.toggle('flag');
        elCell.style.textIndent = '-9999px';
    }
}
// function showHint(elHintIcon){
// elHintIcon.innerText = HINTON;
// return true
// }
function easyLvl() {
    gLevel.mines = 2;
    gLevel.size = 4;
    init();
}
function mediumLvl() {
    gLevel.mines = 12;
    gLevel.size = 8;
    init();
}
function hardLvl() {
    gLevel.mines = 30;
    gLevel.size = 12;
    init();
}

