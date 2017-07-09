const express = require("express");
const indexRouter = express.Router();
const models = require("../models/");
const shared = require("../shared/functions.js");

// ------

indexRouter.get("/", shared.checkAuth, (req, res) => {
  models.messages
    .findAll({
      include: [
        {
          model: models.user,
          as: "author"
        }
      ]
    })
    .then(retrievedMessages => {
      res.render("index", {
        userListing: req.session.user,
        messages: retrievedMessages
      });
    });
});

indexRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = indexRouter;
