﻿const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const initDatabase = require("./startup/initDatabase");
const routes = require("./routes");
const PORT = config.get("port") && 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

async function start() {
  try {
    await mongoose.connection.once("open", () => {
      initDatabase();
    });

    await mongoose.connect(config.get("mongoUrl"));
    console.log(chalk.green("MongoDB connected"));

    app.listen(8080, () => {
      console.log(chalk.green(`Server has been  starter on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start().then(() => {});
