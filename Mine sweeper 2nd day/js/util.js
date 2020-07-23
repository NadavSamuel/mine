'use strict'
//  find neighbor function




//find neighbors need
function getNeighbors(mat, idxI, idxJ) {
  var res = [];
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    if (i < 0 || i > mat.length) continue;
    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      if (j < 0 || i >= 8) continue;
      if (i === idxI && j === idxJ) continue;
      var neighbor = { i, j };
      // if (isEmptyCell(neighbor)){
      res.push(coord);
      // } 
    }
  }
  return res;
}
// create mat
function createMat(ROWS, COLS) {
  var mat = []
  for (var i = 0; i < ROWS; i++) {
    var row = [];
    for (var j = 0; j < COLS; j++) {
      row.push('');
    }
    mat.push(row)
  }
  gBoardLength = COLS;
  gBoardWidth = ROWS;

  return mat
}
//a printMat
function printMat(mat, selector) {
  var strHTML = '<table  border="1"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += `<td class="${className}" data-i="${i}" data-j="${j}" 
      data-ismarked="${gCell.isMarked}"
       data-isflag="${gCell.isFlag}"
       data-ismine="${cell === MINE ? true : false}"
       data-ishint="${gCell.isHint}"
      onclick="cellClicked(this)" oncontextmenu ="cellFlaged(this)"  
      style= " text-indent: -9999px" >  ${cell} <span hidden>${FLAG}</span> </td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}


//exclucive random int
function getRndIdx(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  //The maximum is exclusive and the minimum is inclusive
}


// timer functions!
// dont forget to make a gStartTime var
function startTime() {
  gStartTime = Date.now();
  timeInterval = setInterval(gameTimer, 10);
  // var elLogSc = document.querySelector('.time-log')
  // elLogSc.style.fontSize = '20px'

}
function gameTimer() {
  var currTime = Date.now();
  // var elLogTime = document.querySelector('.time-log');
  var timePassed = currTime - gStartTime;
  var timePassedSecs = (timePassed / 1000).toFixed(3)
  // elLogTime.innerText = `${timePassedSecs}`
}

function isMineCell(i, j) {
  return gBoard[i][j] === MINE
}
function expendShowen(board, idxI, idxJ) {
  idxI = parseInt(idxI)
  idxJ = parseInt(idxJ)
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      if (j < 0 || j >= board[i].length) continue
      if (i == idxI && j == idxJ) continue
      var elCell = document.querySelector(`.cell${i}-${j}`);
      if (elCell.dataset.ismarked === 'false') {
        elCell.dataset.ismarked = 'true';
        elCell.style.backgroundColor = 'yellow';
        elCell.style.textIndent = '0px';
        gGame.score++;
      }
    }
  }
}
// function creatHints() {
//   if (gGame.score === 0) {
//     var elHints = document.querySelector('.hints h3')
//     for (var i = 0; i < gLevel.hints; i++) {
//       var hintsStrHTML = `<span onclick="showHint(this)"> ${HINT} </span>`;
//       elHints.innerHTML += hintsStrHTML;
//     }
//   }
// }
// function showAllNegs(board, idxI, idxJ) {
//   debugger;
//   for (var i = idxI - 1; i <= idxI + 1; i++) {
//     if (i < 0 || i >= board.length) continue
//     for (var j = idxJ - 1; j <= idxJ + 1; j++) {
//       if (j < 0 || j >= board[i].length) continue
//       var elCell = document.querySelector(`.cell${i}-${j}`)
//       elCell.style.textIndent = '0px';
//       setTimeout(elCell.style.textIndent = '-9999px',3000);

//     }
//   }
// }
