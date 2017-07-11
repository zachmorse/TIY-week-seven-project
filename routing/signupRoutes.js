const express = require("express");
const signupRouter = express.Router();
const models = require("../models/");

///------------------------

signupRouter.get("/", (req, res) => {
  res.render("signup");
});

signupRouter.post("/", (req, res) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.displayname ||
    !req.body.password
  ) {
    res.redirect("/signup");
  }
  var newUser = models.user.build({
    username: req.body.username,
    displayname: req.body.displayname,
    password: req.body.password
  });
  newUser
    .save()
    .then(function(savedUser) {
      console.log(savedUser);
      res.redirect("/login");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/// ----- TAKE OUT TO SYNC GITHUB

module.exports = signupRouter;
