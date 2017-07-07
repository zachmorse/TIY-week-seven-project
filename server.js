const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const models = require("./models");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");

const router = require("./routing/routes.js");

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

// function checkAuth(req, res, next) {
//   if (!req.session.user) {
//     return res.redirect("/login");
//   } else {
//     next();
//   }
// }

// ROUTES

app.use("/", router);

// LISTENER

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
