const mongoose = require("mongoose");
const Tale = mongoose.model("Tale");
const { createIndex } = require("../filter/searchFilter");

let index;

/* GET tales, based on search */
async function getTales(req, res) {
  index = index == null ? await createIndex() : index;
  // Query parameters
  let q = "q" in req.query ? req.query["q"] : "";
  let limit = "limit" in req.query ? parseInt(req.query["limit"], 10) : 10;

  // Search index using query and find associated tales
  let searchResult = index.search(q, {});
  let results = [];
  for (let i = 0; i < searchResult.length; i++) {
    let tale = await Tale.findOne(
      { url: searchResult[i]["ref"] },
      "-__v -wordFrequency"
    );
    results.push({
      ...tale["_doc"],
      contentScore: searchResult[i]["score"],
    });
  }

  console.log(results);

  // Limit and send results
  results = results.slice(0, limit);
  res.format({
    "application/json": function () {
      res.status(200).send(JSON.stringify(results));
    },
  });
}

/* Handler for when :taleId is in a route path.
Automatically provides product to the route, if it exists. */
function getTaleId(req, res, next) {
  Tale.findById(req.params["taleId"], "-__v", function (err, tale) {
    if (err) {
      throw err;
    }
    if (!tale) {
      return res.status(404).send("Unknown ID.");
    }
    req.tale = tale;
    next();
  });
}

/* Handler to GET tale with specified ID. */
function getTale(req, res) {
  res.format({
    "application/json": function () {
      res.status(200).send(JSON.stringify(req.tale));
    },
  });
}

module.exports.getTale = getTale;
module.exports.getTaleId = getTaleId;
module.exports.getTales = getTales;
