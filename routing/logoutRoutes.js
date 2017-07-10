const express = require("express");
const logoutRoutes = express.Router();

logoutRoutes.get("/", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = logoutRoutes;
