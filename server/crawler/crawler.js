const Crawler = require("crawler");
const mongoose = require("mongoose");
const server = require("../lib/server");
const { getWordFrequency, getIntroduction } = require("../textInfo/textInfo");
const Tale = mongoose.model("Tale");

const domain = "https://www.cs.cmu.edu/~spok/grimmtmp/";
let visited = [];
const c = new Crawler({
  callback: crawlPage,
});
const rawCrawl = new Crawler({
  jQuery: false,
  callback: crawlPage,
});

// Start crawling webpages
function startCrawl() {
  let filter = {
    url: { $regex: `/^${domain}$/` },
  };

  Tale.findOne(filter, "url", function (err, seed) {
    if (err) {
      throw err;
    }
    if (!seed) {
      console.log("Starting crawl.");
      c.queue(domain);
    } else {
      server.startServer();
    }
  });
}

// Callback to crawl webpages
async function crawlPage(err, res, done) {
  if (err) {
    throw err;
  }

  let $ = res.$;
  let parentUrl = res.request.uri.href;
  let parent = await Tale.findOne({ url: parentUrl });
  if (parent && Object.keys(parent["wordFrequency"]).length > 0) {
    done();
  } else {
    await parsePage(res, done, $, parentUrl);
  }
  console.log(`Crawler: Visited ${visited.length} pages.`);
}

// Parse seed page information
async function parsePage(res, done, $, url) {
  // Mark parent page as visited
  if (!visited.includes(url)) {
    visited.push(url);
  }

  // Only seed page has outgoing links
  let outgoing = url === domain ? $("a") : [];
  let childLinks = [];
  for (let i = 0; i < outgoing.length; i++) {
    let childUrl = $(outgoing[i]).prop("href");
    if (!childUrl.endsWith(".txt")) {
      continue;
    }

    childUrl = `${domain}${childUrl}`;
    let title = $(outgoing[i]).text();

    let child = await Tale.findOne({ url: childUrl });
    if (!child) {
      child = new Tale({
        url: childUrl,
        title: title,
        intro: title,
        wordFrequency: {},
      });
    }

    await child.save();
    if (!visited.includes(childUrl)) {
      childLinks.push(childUrl);
    }
  }

  // Stop crawling seed once children added to queue
  if (url === domain) {
    console.log(`queing ${childLinks.length} links`);
    rawCrawl.queue(childLinks);
    return done();
  }

  // Save fairy tales to database with word frequency information
  Tale.findOne({ url: url }, async (err, tale) => {
    if (err) {
      throw err;
    }
    tale["intro"] = getIntroduction(res.body);
    tale["wordFrequency"] = getWordFrequency(res.body);
    await tale.save();
    return done();
  });
}

// Queue is empty
rawCrawl.on("drain", async function () {
  console.log(`Crawler: Done. Visited ${visited.length} pages.`);
  server.startServer();
});

module.exports.startCrawl = startCrawl;
