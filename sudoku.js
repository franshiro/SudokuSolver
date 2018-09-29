"use strict"

class Sudoku {
  constructor(board_string) {
    this.displayBoard = board_string
  }
  clearScreen () {
    console.clear();
  }

  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
        break;
        }
    }
  }

  solve() {
    let board = this.board()
    let checkZero = []
    
    for(let i = 0; i < board.length;i++){
      for(let j = 0; j < board[i].length; j++){
        if(board[i][j] === 0){
          checkZero.push([i, j])
        }
      }
    }

    for(let i = 0; i < checkZero.length; i++){
      let row = checkZero[i][0]
      let col = checkZero[i][1]
      let check  = board[row][col] + 1

      let find = false
            
      while(!find){
        debugger
        if(check > 9 ){
          board[row][col] = 0
          check = 0
          i -= 2
          break
        }
        else if(this.checkGrid(board, row, col, check) && this.checkRow(board, row, check) && this.checkCol(board, col, check)){
          find = true
          board[row][col] = check
        }
        else{
          board[row][col] = check
          check += 1
        }

      }
      this.sleep(100)
      console.clear();
      console.log(board)
      console.log(check)
      
    }
    // console.log(board)
  }
  checkRow(board, row, check){
    for(let i = 0; i < board[row].length;i++){
      if(board[row][i] === check){
        return false
      }
    }
    return true
  }
  checkCol(board, col, check){
    for(let i = 0; i < board.length; i++){
      if(board[i][col] === check){
        return false
      }
    }
    return true
  }
  checkGrid(board, row, col, check){
    let gridRow = 0
    let gridCol = 0
    let gridSize = 3

    while(col >= gridCol + gridSize){
      gridCol += gridSize
    }
    while(row >= gridRow + gridSize){
      gridRow += gridSize
    }
    for(let i = gridRow; i < gridRow + gridSize; i++){
      for(let j = gridCol; j < gridCol + gridSize; j++){
        if(board[i][j] === check){
          return false
        }
      }
    }
    return true
  }

  // Returns a string representing the current state of the board
  board() {
    let source = this.displayBoard
    let sudokuBoard = []

    let counter = 0
    for(let i = 0; i < 9; i++){
      let tmp = []
      for(let j = 0; j < 9; j++){
        tmp.push(Number(source[counter]))
        counter++
      }
      sudokuBoard.push(tmp)
    }
    
    return sudokuBoard
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log(game.board())