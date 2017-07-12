const express = require("express");
const createGabRouter = express.Router();
const models = require("../models/");
const shared = require("../shared/functions.js");

createGabRouter.get("/", shared.checkAuth, (req, res) => {
  res.render("creategab", { userListing: req.session.user });
});

createGabRouter.post("/", shared.checkAuth, (req, res) => {
  if (!req.body) {
    res.redirect("/creategab");
  }
  var newGab = models.messages.build({
    content: req.body.gab,
    authorid: req.session.user.userId
  });
  newGab
    .save()
    .then(savedGab => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = createGabRouter;
