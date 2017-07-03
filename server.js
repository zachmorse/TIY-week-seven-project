const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const models = require("./models");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mustacheExpress = require("mustache-express");

// MIDDLEWARE
app.use("/", express.static("./public"));
app.use(bodyParser.json());
app.use(morgan("dev"));

// SET VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

// ROUTES

app.get("/", function(req, res) {
  res.render("index");
});

// LISTENER

app.listen(8000, () => {
  console.log(`Server listening on port ${port}.`);
});
