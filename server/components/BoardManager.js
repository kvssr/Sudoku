export const generateBoard = (puzzle) => {
  if (puzzle < 1) return [[]];
  let board = [
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

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // let ran = Math.floor(Math.random() * 9);
      const props = {
        value: puzzle[i][j],
        id: j + 9 * i,
        selected: false,
        prefilled: puzzle[i][j] > 0 ? true : false,
        valid: true,
        x: j,
        y: i,
      };
      board[i][j] = props;
    }
  }

  return board;
};
