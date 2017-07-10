const express = require("express");
const likeRoutes = express.Router();
const models = require("../models/");

likeRoutes.get("/:id", (req, res) => {
  var newLike = models.likes.build({
    userid: req.session.user.userId,
    messagesid: req.params.id
  });
  newLike
    .save()
    .then(savedLike => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = likeRoutes;
