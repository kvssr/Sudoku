import React from "react";

// const Cell = ({ id, value, selected = false, prefilled = false }) => {
const Cell = ({ props, selectCell, selectedCell }) => {
  // console.log(props);
  let border = "";
  let highlighted = checkHighlight(selectedCell, props.x, props.y)
    ? "highlight"
    : "";
  let selected = "";
  let textColour = props.prefilled
    ? "text-black"
    : props.valid
    ? "text-blue-700"
    : "text-red-800";
  let boldText = "";
  if (selectedCell) {
    // console.log("ids", selectedCell.id, props.id);
    selected = Number(selectedCell.id) === props.id ? "selected" : "";
    boldText =
      props.value === Number(selectedCell.innerText) ? "font-bold" : "";
  }
  if ((props.x + 1) % 3 === 0) border = border.concat(" border-r-4");
  if ((props.y + 1) % 3 === 0) border = border.concat(" border-b-4");
  if (props.x === 0) border = border.concat(" border-l-4");
  if (props.y === 0) border = border.concat(" border-t-4");

  return (
    <div
      id={props.id}
      key={props.id}
      className={`cursor-pointer boardCell h-10 w-10 border border-slate-800 ${border} ${highlighted} ${selected} ${textColour} ${boldText}`}
      onClick={selectCell}
    >
      {" "}
      {props.value}{" "}
    </div>
  );
};

const checkHighlight = (selectedCell, x, y) => {
  let highlight = false;
  if (!selectedCell) return highlight;
  const id = selectedCell.id;
  let idX = id % 9;
  let idY = Math.floor(id / 9);
  if (idX === x && idY === y) return highlight;
  if (idX === x) return true;
  if (idY === y) return true;
  if (
    Math.floor(idX / 3) === Math.floor(x / 3) &&
    Math.floor(idY / 3) === Math.floor(y / 3)
  )
    return true;

  return highlight;
};

export default Cell;
