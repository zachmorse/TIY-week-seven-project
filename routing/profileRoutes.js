const express = require("express");
const profileRouter = express.Router();
const models = require("../models/");
const shared = require("../shared/functions.js");

profileRouter.get("/:id", shared.checkAuth, (req, res) => {
  models.messages
    .findAll({
      order: [["createdAt", "DESC"]],
      where: {
        authorid: req.params.id
      },
      include: [
        { model: models.user, as: "author" },
        { model: models.likes, as: "likes" }
      ]
    })
    .then(retrievedMessages => {
      res.render("profile", {
        userListing: req.session.user,
        messages: retrievedMessages
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = profileRouter;
