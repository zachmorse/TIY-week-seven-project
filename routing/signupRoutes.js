const express = require("express");
const signupRouter = express.Router();
const models = require("../models/");

///------------------------

signupRouter.post("/signup", (req, res) => {
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
  newUser.save().then(function(savedUser) {
    console.log(savedUser);
  });
  res.redirect("/login");
});

// router.post("/index", (req, res) => {
//   res.redirect("/");
// });

module.exports = signupRouter;
