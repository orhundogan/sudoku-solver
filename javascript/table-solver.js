var solve_button = document.getElementById("solve-button").addEventListener("click", solve);
var board = [];

// Function that does everything about solving
function solve() {
    var start = new Date().getTime();   // Start recording time
    var table = document.getElementById("grid");
    fillBoard(table);
    sudokuSolver(board);
    for(var i = 0; i<81; i++){
        var cells = document.getElementsByClassName("cell")[i];
        cells.classList.add("solved");
    }
    enterSolution(table);
    var end = new Date().getTime();     // Ending time record
    document.getElementById("time").innerHTML = "Time Taken: " + (end-start) + "ms";
}

// Fills the board from the information inputted in the table. Empty cells are added as 0.
function fillBoard(table){
    var row_array = [];
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            var cellContent = document.getElementById("grid").rows[i].cells[j].firstChild.value;
            if(cellContent == ""){
                cellContent = "0";
            }
            row_array.push(cellContent);
        } 
        board.push(row_array); 
        row_array = [];
     }
}

// Outputing the results. Copies information from board to table
function enterSolution(table){
    for(var i = 0, row; row = table.rows[i]; i++){
        for(var j = 0, col; col = row.cells[j]; j++){
            document.getElementById("grid").rows[i].cells[j].firstChild.value = board[i][j];
        }
    }
}

function isValid(board, row, col, k){
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}


function sudokuSolver(board){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] == '0') {
            for (let k = 1; k <= 9; k++) {
              if (isValid(board, i, j, k)) {
                board[i][j] = `${k}`;
              if (sudokuSolver(board)) {
               return true;
              } else {
               board[i][j] = '0';
              }
             }
           }
           return false;
         }
       }
     }
    return true;
}

