import React from "react";
import { ConnectionManager } from "../../components/ConnectionManager";
const Homepage = () => {
  return (
    <div className="mx-auto w-max">
      <h2 className="mb-2 text-4xl font-extrabold dark:text-white">
        Join or Create a room
      </h2>
      <div>
        <ConnectionManager />
      </div>
    </div>
  );
};

export default Homepage;
