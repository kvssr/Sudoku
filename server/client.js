import WebSocket from "ws";

const serverUrl = "ws://localhost:8080";
const connection = new WebSocket(serverUrl);

connection.onopen = () => {
  console.log("Connected to the server");
  connection.send("Hello, server!");
};

connection.onmessage = (event) => {
  console.log("Message from server ", event.data);
};
