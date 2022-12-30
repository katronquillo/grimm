import mongoose from "mongoose";
import fs from "fs";
import path from "path";

function connect() {
  const database = mongoose.connection;
  database
    .on("error", console.error.bind(console, "Connection Error: "))
    .on("disconnected", connect)
    .once("open", () => console.log("Connected"));

  return mongoose.connect("mongodb://localhost/tales", {
    keepAlive: true,
    useNewUrlParser: true,
  });
}
