const express = require("express");
const loginRoutes = express.Router();
const models = require("../models/");

loginRoutes.get("/", (req, res) => {
  res.render("login");
});

loginRoutes.post("/", (req, res) => {
  var submittedUser = req.body;

  models.user
    .findOne({
      where: {
        username: submittedUser.username,
        password: submittedUser.password
      }
    })
    .then(user => {
      if (user) {
        req.session.user = {
          username: user.username,
          displayName: user.displayname,
          userId: user.id
        };
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/// ----- TAKE OUT TO SYNC GITHUB

module.exports = loginRoutes;
