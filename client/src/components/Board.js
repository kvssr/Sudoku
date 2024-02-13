import React, { useEffect, useState } from "react";
import Cell from "./cell";
import { createPuzzle } from "./puzzle";
import { NumButtons } from "./controls";

const Board = () => {
  const [selectedCell, setSelectedCell] = useState();
  console.log("🚀 ~ Board ~ selectedCell:", selectedCell);
  const [puzzle, setPuzzle] = useState([]);

  useEffect(() => {
    console.log("Loading puzzle...");
    const puzzle = createPuzzle();
    setPuzzle(puzzle);
  }, []);
  if (puzzle < 1) return "Loading";
  const board = generateBoard(selectedCell, setSelectedCell, puzzle);
  console.log("🚀 ~ Board ~ board:", board);
  console.log("puzzle", puzzle);

  const selectInput = (e) => {
    console.log("clicked", e.target);
    let value = e.target.innerText;
    selectedCell.innerText = value;
  };

  return (
    <div className="container mx-auto w-max">
      <div className="board mb-3">
        {" "}
        {board.map((row, i) => {
          return (
            <div
              className="grid grid-cols-9 content-center"
              key={`row-${i}`}
            >
              {" "}
              {row.map((col, j) => {
                return board[i][j];
              })}{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
      <NumButtons selectInput={selectInput}> </NumButtons>{" "}
    </div>
  );
};

const generateBoard = (selectedCell, setSelectedCell, puzzle) => {
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

  const selectCell = (e) => {
    console.log("clicked", e.target);
    setSelectedCell(e.target);
  };

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // let ran = Math.floor(Math.random() * 9);
      const cell = (
        <Cell
          props={{
            value: puzzle[i][j],
            id: j + 1 + 9 * i,
            selected: false,
            prefilled: true,
            x: j,
            y: i,
          }}
          selectedCell={selectedCell}
          selectCell={selectCell}
        >
          {" "}
        </Cell>
      );
      board[i][j] = cell;
      // puzzle[i][j] = {
      //   value: ran,
      //   id: j + 1 + 9 * i,
      //   selected: false,
      //   prefilled: false,
      //   x: j,
      //   y: i,
      // };
    }
  }

  return board;
};

export default Board;
