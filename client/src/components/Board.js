import React, { useEffect, useState } from "react";
import Cell from "./cell";
import { createPuzzle, fillCells, checkValid } from "./puzzle";
import { NumButtons, GameButtons } from "./controls";

const Board = () => {
  const [selectedCell, setSelectedCell] = useState(null);
  // console.log("🚀 ~ Board ~ selectedCell:", selectedCell);
  const [puzzle, setPuzzle] = useState(createPuzzle());
  console.log("🚀 ~ Board ~ puzzle:", puzzle);
  const [board, setBoard] = useState(generateBoard(puzzle));
  console.log("🚀 ~ Board ~ board:", board);

  useEffect(() => {
    setSelectedCell(null);
    setBoard(generateBoard(puzzle));
  }, [puzzle]);

  if (puzzle < 1) return "Loading";

  const selectInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked", e);
    let value = e.target.innerText;
    if (!selectedCell) return;
    const id = selectedCell.id;
    let x = id % 9;
    let y = Math.floor(id / 9);
    value = Number(e.target.innerText);
    const valid = checkValid(puzzle, x, y, value, true);
    puzzle[y][x] = value;
    let tempPuzzle = copyArray(puzzle);
    const solvable = fillCells(tempPuzzle, 0, 0);
    board[y][x].value = value;
    board[y][x].valid = valid && solvable;
    setBoard([...board]);
  };

  const copyArray = (array) => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray[i] = array[i].slice();
    }
    return newArray;
  };

  const handleSelectCell = (e) => {
    setSelectedCell(e.target);
  };

  const handleNewGameBtn = (e) => {
    setPuzzle(createPuzzle());
    // setBoard(generateBoard(puzzle));
  };

  const handleEraseBtn = (e) => {
    if (!selectedCell) return;
    const id = selectedCell.id;
    let x = id % 9;
    let y = Math.floor(id / 9);

    if (!board[y][x].prefilled) {
      board[y][x].value = "";
    }
    setBoard([...board]);
  };

  return (
    <div className="mx-auto w-max">
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
                return (
                  <Cell
                    props={board[i][j]}
                    selectCell={handleSelectCell}
                    selectedCell={selectedCell}
                  >
                    {" "}
                  </Cell>
                );
              })}{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
      <NumButtons selectInput={selectInput}> </NumButtons>{" "}
      <GameButtons
        handleEraseBtn={handleEraseBtn}
        handleNewGameBtn={handleNewGameBtn}
      >
        {" "}
      </GameButtons>{" "}
    </div>
  );
};

const generateBoard = (puzzle) => {
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

export default Board;
