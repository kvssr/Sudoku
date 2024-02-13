import React from "react";

const Controls = () => {};

export const NumButtons = ({ selectInput }) => {
  let buttons = [];
  for (let i = 1; i < 10; i++) {
    buttons.push(
      <div
        className="w-10 h-10 border border-slate-800"
        onClick={selectInput}
        key={`ib-${i}`}
      >
        {i}{" "}
      </div>
    );
  }

  return <div className="buttonList flex"> {buttons} </div>;
};
