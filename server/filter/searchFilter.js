const elasticlunr = require("elasticlunr");
const mongoose = require("mongoose");
const Tale = mongoose.model("Tale");

/* Returns a string representing the text on a document, given the 
word frequency */
function getText(wordFrequency) {
  let text = "";
  for (let [word, numOccurrences] of Object.entries(wordFrequency)) {
    for (let i = 0; i < numOccurrences; i++) {
      text = text.concat(`${word} `);
    }
  }
  return text.trim();
}

// Returns search index for Tales
async function createIndex() {
  let index = elasticlunr(function () {
    this.addField("title");
    this.addField("text");
    this.setRef("id");
  });

  let tales = await Tale.find({});
  for (let tale of tales) {
    index.addDoc({
      id: tale["url"],
      title: tale["title"],
      text: getText(tale["wordFrequency"]),
    });
  }

  return index;
}

module.exports.createIndex = createIndex;
