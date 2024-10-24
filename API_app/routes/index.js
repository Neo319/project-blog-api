const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");

//test route
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API.",
  });
});

// ---- LOGIN CONTROLLER ROUTES ----

//logins
router.get("/login", loginController.login_get);

//signps
router.get("/signup", loginController.signup_get);

router.post("/signup", loginController.signup_post);

module.exports = router;
