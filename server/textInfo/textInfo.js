const { removeStopwords } = require("stopword");

/* Returns the given text, with no punctuation */
function removePunctuation(text) {
  let noPunctuation = text
    .trim()
    .replace(/[.,\/#!?$%\^&\*;:{}=\-_`"'~()]/g, " ");
  return noPunctuation.replace(/\s{2,}/gm, " ");
}

/* Removes the given text, with no linebreaks */
function removeLinebreaks(text) {
  let noLinebreaks = text.trim().replace(/(\n|\t)+/g, " ");
  return noLinebreaks.replace(/\s{2,}/gm, " ");
}

/* Returns object containing word frequency of the given text, 
after removing stop words */
function getWordFrequency(text) {
  let wordFrequency = {};

  let noPunctuation = removePunctuation(text);
  let cleanText = removeLinebreaks(noPunctuation);
  let strippedText = removeStopwords(cleanText.split(" "));

  for (let word of strippedText) {
    word = word.toLowerCase();
    if (!wordFrequency.hasOwnProperty(word)) {
      wordFrequency[word] = 0;
    }
    wordFrequency[word] += 1;
  }
  return wordFrequency;
}

/* Returns the first sentence of the given text */
function getIntroduction(text) {
  let noLinebreaks = removeLinebreaks(text.trim());
  let firstStop = noLinebreaks.indexOf(".");
  return noLinebreaks.substring(0, firstStop + 1);
}

module.exports.getWordFrequency = getWordFrequency;
module.exports.getIntroduction = getIntroduction;
