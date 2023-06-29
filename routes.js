const express = require("express");
const router = express.Router();
const urlController = require("./controllers/urlController");

// API routes
router.post("/api/shorten", urlController.generateShortUrl);

module.exports = router;
