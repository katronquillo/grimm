const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Models
const models = path.join(__dirname, "models");
console.log(models);
fs.readdirSync(models).forEach((file) => {
  require(path.join(models, file));
});

const crawler = require("./crawler/crawler");

function connect() {
  const database = mongoose.connection;
  database
    .on("error", console.error.bind(console, "Connection Error: "))
    .on("disconnected", connect)
    .once("open", () => crawler.startCrawl());

  mongoose.set("strictQuery", false);

  return mongoose.connect("mongodb://localhost/tales", {
    keepAlive: true,
    useNewUrlParser: true,
  });
}

connect();
