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

  console.log(puzzle);

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

const fillCells = (puzzle, x, y) => {
  if (y === 8 && x === 9) return true;
  if (x === 9) {
    x = 0;
    y++;
  }

  if (puzzle[y][x] !== 0) {
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

const checkValid = (puzzle, x, y, value) => {
  let valid = true;
  if (!checkRow(puzzle, y, value)) return false;
  if (!checkCol(puzzle, x, value)) return false;
  if (!checkSquare(puzzle, x, y, value)) return false;

  return valid;
};

const checkRow = (puzzle, y, value) => {
  if (puzzle[y].includes(value)) return false;
  return true;
};

const checkCol = (puzzle, x, value) => {
  for (let i = 0; i < 9; i++) {
    if (puzzle[i][x] === value) return false;
  }
  return true;
};

const checkSquare = (puzzle, x, y, value) => {
  let sqX = Math.floor(x / 3);
  let sqY = Math.floor(y / 3);
  //   console.log(sqY, sqX);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (puzzle[sqY * 3 + i][sqX * 3 + j] === value) return false;
    }
  }
  return true;
};

// createPuzzle();

// const fillCells = (puzzle, x, y, value) => {
//     //   puzzle[y][x] = 0;
//     const valid = checkValid(puzzle, x, y, value);
//     //   console.log(`${y} - ${x} -(${value})- ${valid}`);
//     if (valid) {
//       puzzle[y][x] = value;
//       value = 1;
//       if (x < 8) {
//         fillCells(puzzle, x + 1, y, value);
//       } else if (y < 8) {
//         fillCells(puzzle, 0, y + 1, value);
//       }
//     } else if (!valid) {
//       if (value >= 9) {
//         return -1;
//         //   if (x > 0) {
//         //     if (puzzle[y][x - 1] < 9) {
//         //       fillCells(puzzle, x - 1, y, puzzle[y][x - 1] + 1);
//         //     }
//         //     puzzle[y][x - 1] = 0;
//         //     fillCells(puzzle, x - 2, y, puzzle[y][x - 2] + 1);
//         //   } else if (y > 0) {
//         //     if (puzzle[y][x - 1] < 9) {
//         //       fillCells(puzzle, 8, y - 1, puzzle[y - 1][8] + 1);
//         //     }
//         //     puzzle[y - 1][8] = 0;
//         //     fillCells(puzzle, 7, y - 1, puzzle[y - 1][7]);
//         //   }
//       } else {
//         fillCells(puzzle, x, y, value + 1);
//       }
//     }
//     return puzzle;
//   };
