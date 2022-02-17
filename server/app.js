const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const path = require("path");
const initDatabase = require("./startup/initDatabase");
const routes = require("./routes");
const PORT = process.env.PORT || 8080;
const app = express();
console.log("PORT", PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // !!! before use routes
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

async function start() {
  try {
    await mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(config.get("mongoUrl"));
    console.log(chalk.green("MongoDB connected"));

    app.listen(PORT, "0.0.0.0", () => {
      console.log(chalk.green(`Server has been  starter on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
