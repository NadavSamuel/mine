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

  return mat
}
//a printMat
function printMat(mat, selector) {
  var strHTML = '<table style="color: white background-color: rgb(36, 36, 36);" border="1"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += `<td class="${className}" onclick="cellClicked(this,${i},${j})" 
      style= " text-indent: -9999px" >  ${cell}  </td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}


// random int inclusive
function getRandomInt(min, max) {
  var min = Math.ceil(min);
  var max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
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
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}