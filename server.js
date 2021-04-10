const express = require("express");
const { config } = require("./config");
const db = require("./db");

const router = require("./network/routes");
db(config.dbUrl);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router(app);

app.use("/app", express.static("public"));

app.listen(config.port);

console.log(`http://localhost:${config.port}`);
