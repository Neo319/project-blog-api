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
router.post("/login", loginController.login_post);

//signps
router.post("/signup", loginController.signup_post);

//view user detail
router.get("/user", loginController.user_detail);

//update user
router.put("/user", loginController.user_put);

//update user
router.delete("/user", loginController.user_delete);

module.exports = router;
