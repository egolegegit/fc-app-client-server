const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");

const PORT = config.get("port") && 8080;

if (process.env.NODE_ENV === "production") {
    console.log("Production");
}

const app = express();
app.listen(8080, () => {
    console.log(chalk.green(`Server has been  starter on port ${PORT}`));
});
