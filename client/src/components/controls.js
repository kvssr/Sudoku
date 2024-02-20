import React from "react";

const Controls = () => {};

export const NumButtons = ({ selectInput }) => {
  let buttons = [];
  for (let i = 1; i < 10; i++) {
    buttons.push(
      <div
        className="cursor-pointer w-10 h-10 border border-slate-800 inputCell"
        onClick={selectInput}
        key={`ib-${i}`}
      >
        {i}{" "}
      </div>
    );
  }
  return <div className="buttonList flex"> {buttons} </div>;
};

export const GameButtons = ({ handleEraseBtn, handleNewGameBtn }) => {
  return (
    <div className="gamebuttonList grid grid-cols-9 mt-3">
      <div
        className="cursor-pointer bg-cyan-800 eraseBtn controlBtn py-0 border col-span-2 col-start-2"
        onClick={handleEraseBtn}
      >
        Erase{" "}
      </div>{" "}
      <div
        className="cursor-pointer bg-cyan-800 newGameBtn controlBtn py-0 border col-span-2 col-start-7"
        onClick={handleNewGameBtn}
      >
        New Game{" "}
      </div>{" "}
    </div>
  );
};
