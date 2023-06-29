const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");

// Create a SQLite database
const db = new sqlite3.Database("./database/urls.db", (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to the URLs database.");
});

// Create the URLs table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    long_url TEXT NOT NULL,
    short_url TEXT NOT NULL UNIQUE
  )
`);

// Generate a short URL hash
function generateShortUrl() {
  const hash = crypto.randomBytes(4).toString("hex");
  return hash;
}

// Model actions
exports.shortenUrl = (longUrl, callback) => {
  const shortUrl = generateShortUrl();

  // Save the mapping in the database
  db.run(
    `INSERT INTO urls (long_url, short_url) VALUES (?, ?)`,
    [longUrl, shortUrl],
    function (err) {
      if (err) {
        console.error(err.message);
        callback(err);
      } else {
        callback(null, shortUrl);
      }
    }
  );
};

exports.getLongUrl = (shortUrl, callback) => {
  // Find the long URL from the database
  db.get(
    `SELECT long_url FROM urls WHERE short_url = ?`,
    [shortUrl],
    function (err, row) {
      if (err) {
        console.error(err.message);
        callback(err);
      } else {
        callback(null, row ? row.long_url : null);
      }
    }
  );
};
