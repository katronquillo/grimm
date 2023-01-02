const express = require("express");

const app = express();
app.use(express.json());
require("../routes/tale")(app);

const port = process.env.PORT || 3000;

function startServer() {
  app.listen(port);
  console.log(`Listening at http://localhost:${port}`);
}

module.exports.startServer = startServer;
