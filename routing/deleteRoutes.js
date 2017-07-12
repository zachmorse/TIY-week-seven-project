const express = require("express");
const deleteRoutes = express.Router();
const models = require("../models/");
const shared = require("../shared/functions.js");

deleteRoutes.get("/:id", shared.checkAuth, (req, res) => {
  var userId = req.session.user.userId;
  var userProfile = "/profile/".concat(userId);

  models.likes
    .destroy({
      where: { messagesid: req.params.id }
    })
    .then(() => {
      models.messages
        .destroy({
          where: { id: req.params.id }
        })
        .then(() => {
          res.redirect(userProfile);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = deleteRoutes;
