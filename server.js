const express = require("express");
const app = express();
const routes = require("./routes");

// Middleware
app.use(express.json());

// Routes
app.use("/", routes);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
