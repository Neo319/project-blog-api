const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");

//test route
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API.",
  });
});

//logins
router.get("/login", loginController.login_get);

module.exports = router;
