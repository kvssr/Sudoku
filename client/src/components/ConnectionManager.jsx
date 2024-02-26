import React from "react";
import { socket } from "../socket/socket";

export const ConnectionManager = () => {
  const connect = (e) => {
    e.preventDefault();
    console.log("Connecting", socket);
    const room = e.currentTarget.elements.roomInput.value;
    console.log("form props:", room);
    socket.connect();
    socket.emit("room connect", room);
  };

  const disconnect = () => {
    console.log("Disconnecting", socket);
    socket.disconnect();
  };

  const createRoom = () => {
    console.log("Creating room");
    socket.connect();
    socket.emit("room create");
  };

  return (
    <div className="">
      <div className="joinRow">
        <form onSubmit={connect}>
          <input
            id="roomInput"
            name="room"
            className="m-2"
          />
          <button type="submit"> Join </button>
        </form>
      </div>
      <div className="createRow">
        <button
          type="button"
          onClick={createRoom}
        >
          Create
        </button>
      </div>
    </div>
  );
};
