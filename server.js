const express = require("express");

const router = require("./network/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router(app);

app.use("/app", express.static("public"));

app.listen(3004);

console.log("http://localhost:3004");
