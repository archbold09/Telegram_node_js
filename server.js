const express = require("express");
const app = express();
const server = require("http").Server(app);

const { config } = require("./config");
const db = require("./db");
const socket = require("./socket");

const router = require("./network/routes");
db(config.dbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router(app);
socket.connect(server);

app.use("/app", express.static("public"));

server.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});
