import React, { useEffect, useState } from "react";
import Cell from "./cell";
import { NumButtons, GameButtons } from "./controls";
import { socket } from "../socket/socket";

const Board = ({ game }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [board, setBoard] = useState(game);

  useEffect(() => {
    setBoard(...[game]);
  }, [game]);

  useEffect(() => {
    const onGameMoveUpdated = (move) => {
      const { x, y, value, valid } = move;
      board[y][x].value = value;
      board[y][x].valid = valid;
      setBoard([...board]);
    };

    const onGameMoveErased = ({ x, y }) => {
      board[y][x].value = "";
      setBoard([...board]);
    };

    const onGameNew = (board) => {
      setBoard(...[board]);
    };

    socket.on("game move updated", onGameMoveUpdated);
    socket.on("game move erased", onGameMoveErased);
    socket.on("game new", onGameNew);

    return () => {
      socket.off("game move updated", onGameMoveUpdated);
      socket.off("game move erased", onGameMoveErased);
      socket.off("game new", onGameNew);
    };
  }, [board]);

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
    socket.emit("game move selected", { x: x, y: y, value: value });
  };

  const handleSelectCell = (e) => {
    setSelectedCell(e.target);
  };

  const handleNewGameBtn = (e) => {
    socket.emit("game new");
  };

  const handleEraseBtn = (e) => {
    if (!selectedCell) return;
    const id = selectedCell.id;
    let x = id % 9;
    let y = Math.floor(id / 9);
    socket.emit("game move erased", { x: x, y: y });
  };

  return (
    <div className="mx-auto w-max">
      <div className="board mb-3">
        {board.map((row, i) => {
          return (
            <div
              className="grid grid-cols-9 content-center"
              key={`row-${i}`}
            >
              {row.map((col, j) => {
                return (
                  <Cell
                    props={board[i][j]}
                    selectCell={handleSelectCell}
                    selectedCell={selectedCell}
                  ></Cell>
                );
              })}
            </div>
          );
        })}
      </div>
      <NumButtons selectInput={selectInput}> </NumButtons>
      <GameButtons
        handleEraseBtn={handleEraseBtn}
        handleNewGameBtn={handleNewGameBtn}
      ></GameButtons>
    </div>
  );
};

export default Board;
