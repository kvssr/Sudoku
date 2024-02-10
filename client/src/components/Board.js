import React from "react";
import Cell from "./cell";

const Board = () => {
  const puzzle = generatePuzzle();
  console.log("puzzle", puzzle);
  let selectedCell = null;

  const selectCell = (e) => {
    console.log(`selectCell`, e);
    if (selectedCell) {
      selectedCell.classList.remove("selected");
    }
    e.target.classList.add("selected");
    selectedCell = e.target;
  };

  return (
    <div className="Board container mx-auto w-max">
      {" "}
      {puzzle.map((row, i) => {
        return (
          <div className="grid grid-cols-9 content-center">
            {" "}
            {row.map((col, j) => {
              return (
                <Cell
                  props={puzzle[i][j]}
                  selectCell={selectCell}
                >
                  {" "}
                </Cell>
              );
            })}{" "}
          </div>
        );
      })}{" "}
    </div>
  );
};

const generatePuzzle = () => {
  //   let puzzle = new Array(9).fill(new Array(9).fill());
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
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let ran = Math.floor(Math.random() * 9);
      puzzle[i][j] = {
        value: ran,
        id: j + 1 + 9 * i,
        selected: false,
        prefilled: false,
        x: j,
        y: i,
      };
    }
  }

  return puzzle;
};

export default Board;
