const path = require("path");
const fs = require("fs");
const urlModel = require("../models/urlModel");

// Controller actions
exports.showShortenForm = (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "shortenForm.html");
  res.sendFile(filePath);
};

exports.shortenUrl = (req, res) => {
  const longUrl = req.body.url;
  urlModel.shortenUrl(longUrl, (err, shortUrl) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const filePath = path.join(__dirname, "..", "views", "shortenedUrl.html");
      const html = fs.readFileSync(filePath, "utf8");
      const updatedHtml = html.replace("<SHORT_URL>", shortUrl);
      res.send(updatedHtml);
    }
  });
};
exports.redirectToLongUrl = (req, res) => {
  const shortUrl = req.params.shortUrl;
  urlModel.getLongUrl(shortUrl, (err, longUrl) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else if (longUrl) {
      res.redirect(longUrl);
    } else {
      res.status(404).send("Not found");
    }
  });
};

exports.generateShortUrl = (req, res) => {
  const longUrl = req.body.url;
  urlModel.shortenUrl(longUrl, (err, shortUrl) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ shortUrl });
    }
  });
};
