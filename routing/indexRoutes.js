const express = require("express");
const indexRouter = express.Router();
const models = require("../models/");
const shared = require("../shared/functions.js");

// ------

indexRouter.get("/", shared.checkAuth, (req, res) => {
  models.messages
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: models.user, as: "author" },
        { model: models.likes, as: "likes" }
      ]
    })
    .then(retrievedMessages => {
      res.render("index", {
        userListing: req.session.user,
        messages: retrievedMessages
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/// ----- TAKE OUT TO SYNC GITHUB

module.exports = indexRouter;
