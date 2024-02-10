import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <div className="Header h-20">
        {" "}
        <p className="m-auto"> Sudoku </p>{" "}
      </div>{" "}
      <div>
        <Board> </Board>{" "}
      </div>{" "}
    </div>
  );
}

export default App;
