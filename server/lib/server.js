const express = require("express");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
require("../routes/tale")(app);

const port = process.env.PORT || 5050;

function startServer() {
  app.listen(port);
  console.log(`Listening at http://localhost:${port}`);
}

module.exports.startServer = startServer;
