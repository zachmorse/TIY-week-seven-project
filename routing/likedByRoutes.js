const express = require("express");
const likedByRoutes = express.Router();
const models = require("../models/");
const shared = require("../shared/functions.js");

likedByRoutes.get("/:id", shared.checkAuth, (req, res) => {
  models.messages
    .findOne({
      where: { id: req.params.id },
      include: [
        { model: models.user, as: "author" },
        {
          model: models.likes,
          as: "likes",
          include: [{ model: models.user, as: "authorId" }]
        }
      ]
    })
    .then(retrievedLikes => {
      res.render("likes", {
        userListing: req.session.user,
        like: retrievedLikes
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = likedByRoutes;
