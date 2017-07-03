const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const models = require("./models");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");

// SET VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

// MIDDLEWARE
app.use("/", express.static("./public"));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    next();
  }
}

// ROUTES

app.get("/", checkAuth, function(req, res) {
  res.render("index");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/signup", function(req, res) {
  res.render("signup");
});

// LISTENER

app.listen(8000, () => {
  console.log(`Server listening on port ${port}.`);
});
