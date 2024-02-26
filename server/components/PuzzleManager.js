export const createPuzzle = () => {
  let puzzle = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  puzzle = fillDiagonalSquares(puzzle);
  fillCells(puzzle, 0, 0);
  puzzle = removeCells(puzzle, 45);

  // console.log(puzzle);

  return puzzle;
};

// fill the diagonal squares with random numbers
const fillDiagonalSquares = (puzzle) => {
  for (let x = 0; x < 9; x = x + 3) {
    let usedNumbers = [];
    for (let i = x; i < x + 3; i++) {
      for (let j = x; j < x + 3; j++) {
        let newNum = Math.floor(Math.random() * 9);
        while (usedNumbers.includes(newNum)) {
          newNum = Math.floor(Math.random() * 9);
        }
        usedNumbers.push(newNum);
        puzzle[i][j] = newNum + 1;
      }
    }
  }
  return puzzle;
};

export const fillCells = (puzzle, x, y) => {
  if (y === 8 && x === 9) return true;
  if (x === 9) {
    x = 0;
    y++;
  }

  if (puzzle[y][x] !== 0 && puzzle[y][x] !== "") {
    return fillCells(puzzle, x + 1, y);
  }

  for (let i = 1; i < 10; i++) {
    if (checkValid(puzzle, x, y, i)) {
      puzzle[y][x] = i;

      if (fillCells(puzzle, x + 1, y, i)) return true;
    }

    puzzle[y][x] = 0;
  }
  return false;
};

export const checkValid = (puzzle, x, y, value, debug = false) => {
  let valid = true;
  if (!checkRow(puzzle, y, value, debug)) return false;
  if (!checkCol(puzzle, x, value, debug)) return false;
  if (!checkSquare(puzzle, x, y, value, debug)) return false;

  return valid;
};

const checkRow = (puzzle, y, value, debug = false) => {
  if (puzzle[y].includes(value)) {
    if (debug) console.log("Checking validity Row False", puzzle, y, value);
    return false;
  }
  return true;
};

const checkCol = (puzzle, x, value, debug = false) => {
  for (let i = 0; i < 9; i++) {
    if (puzzle[i][x] === value) {
      if (debug) console.log("Checking validity Col False", puzzle);
      return false;
    }
  }
  return true;
};

const checkSquare = (puzzle, x, y, value, debug = false) => {
  let sqX = Math.floor(x / 3);
  let sqY = Math.floor(y / 3);
  //   console.log(sqY, sqX);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (puzzle[sqY * 3 + i][sqX * 3 + j] === value) {
        if (debug) console.log("Checking validity Square False", puzzle);
        return false;
      }
    }
  }
  return true;
};

const removeCells = (puzzle, n) => {
  for (let i = 0; i < n; i++) {
    let xRan = Math.floor(Math.random() * 9);
    let yRan = Math.floor(Math.random() * 9);

    puzzle[yRan][xRan] = "";
  }
  return puzzle;
};

export const checkValidMove = (puzzle, move) => {
  const { x, y, value } = move;
  const valid = checkValid(puzzle, x, y, value);
  puzzle[y][x] = value;
  let tempPuzzle = copyArray(puzzle);
  const solvable = fillCells(tempPuzzle, 0, 0);
  return valid && solvable;
};

const copyArray = (array) => {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[i].slice();
  }
  return newArray;
};
