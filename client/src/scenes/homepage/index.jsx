import React from "react";
import { ConnectionManager } from "../../components/ConnectionManager";
const Homepage = () => {
  return (
    <div className="mx-auto w-max">
      <h3>Join or create a game</h3>
      <div>
        <ConnectionManager />
      </div>
    </div>
  );
};

export default Homepage;
