const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const models = require("./models");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");

// ROUTE REQUIREMENTS

const indexRouter = require("./routing/indexRoutes.js");
const loginRouter = require("./routing/loginRoutes.js");
const signupRouter = require("./routing/signupRoutes.js");
const createGabRouter = require("./routing/createGabRoutes");
const logoutRouter = require("./routing/logoutRoutes");
const likeRouter = require("./routing/likeRoutes");
const profileRouter = require("./routing/ProfileRoutes");
const likedByRouter = require("./routing/likedByRoutes");
// SET VIEW ENGINE

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// MIDDLEWARE

app.use("/", express.static("./public"));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

// ROUTES

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/gab", createGabRouter);
app.use("/logout", logoutRouter);
app.use("/like", likeRouter);
app.use("/profile", profileRouter);
app.use("/likedby", likedByRouter);

// LISTENER

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

/// ----- TAKE OUT TO SYNC GITHUB
