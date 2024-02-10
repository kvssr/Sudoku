import React from "react";

// const Cell = ({ id, value, selected = false, prefilled = false }) => {
const Cell = ({ props, selectCell }) => {
  console.log(props);
  let border = "";
  if ((props.x + 1) % 3 === 0) border = border.concat(" border-r-4");
  if ((props.y + 1) % 3 === 0) border = border.concat(" border-b-4");
  if (props.x === 0) border = border.concat(" border-l-4");
  if (props.y === 0) border = border.concat(" border-t-4");

  return (
    <div
      id={props.id}
      key={props.id}
      className={`h-10 w-10 border ${border}`}
      onClick={selectCell}
    >
      {" "}
      {props.value}{" "}
    </div>
  );
};

export default Cell;
