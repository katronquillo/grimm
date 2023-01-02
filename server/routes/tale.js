const path = require("path");
const tale = require("../controllers/tale");

module.exports = function (app) {
  app.param("taleId", tale.getTaleId);
  app.get("/tales", tale.getTales);
  app.get("/tales/:pageId", tale.getTale);
};
