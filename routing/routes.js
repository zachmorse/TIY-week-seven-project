const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", function(req, res) {
  var submittedUserName = req.body.username;
  var submittedPassword = req.body.password;
  models.user
    .findOne({
      where: { username: submittedUserName, password: submittedPassword }
    })
    .then(function(returnedUser) {
      console.log("user logged in as", returnedUser.displayname);
    });
  res.redirect("/");
});

router.post("/signup", (req, res) => {
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

router.post("/index", function(req, res) {
  res.redirect("/");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
