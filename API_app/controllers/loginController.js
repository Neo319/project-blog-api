//database connection
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// how authentication is handled
const jwt = require("jsonwebtoken");
// Our custom JWT authorization middleware
const verify = require("../config/jwt");

// ---- ROUTES ----

// authorize token created by user
const login_get = (req, res) => {
  res.json({
    message: "Login request recieved (NOT IMPLEMENTED)",
  });
};

const signup_get = (req, res) => {
  res.json({
    message: "Signup GET request (NOT IMPLEMENTED)",
  });
};

// create a new token
const signup_post = async (req, res) => {
  // START HERE: implement passport, JWT

  console.log("request:");
  console.log(req.body);

  // tmp
  // sample request: (?)
  // curl -X POST -H "Content-Type: application/json" -d "{newUser : {username: "first", email: "first@gmail.com", password: "fdsa"}}" http://localhost:3000/api/signup/
  // curl -X POST -H "Content-Type: application/json" -d '{"newUser": {"username": "first", "email": "first@gmail.com", "password": "fdsa"}}' http://localhost:3000/api/signup/

  if (typeof req.body.newUser == "undefined") {
    console.log("no new user found.");
    res.json({
      message: "incomplete request",
    });
  }

  if (typeof req.body.newUser !== "undefined") {
    try {
      result = await prisma.user.create({
        data: {
          username: req.body.newUser.username,
          email: req.body.newUser.email,
          password: req.body.newUser.password,

          isAuthor: false,
          Posts: [],
          Comments: [],
        },
      });
      console.log("[debug]: created user in db.");
      console.log(result);
    } catch (err) {
      console.log("signup err");
      console.error(err.message);
      res.status(400);
    }
  } else {
    console.log("Error: no new user found");
    res.status(400);
  }

  res.json({
    message: "Signup POST request (NOT IMPLEMENTED)",
  });
  console.log("[debug] reached end of function");
};

// TODO: add JWT authorization; implement passport.

// PROTECTED ROUTES:
// User detail, update users, POST comment (?)

// NON JWT-PROTECTED:
// sign-ups, logins,

module.exports = {
  login_get,
  signup_get,
  signup_post,
};
