const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

function startServer() {
  app.listen(port);
  console.log(`Listening at http://localhost:${port}`);
}

module.exports.app = app;
module.exports.startServer = startServer;
