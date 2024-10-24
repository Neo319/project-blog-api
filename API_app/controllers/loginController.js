//database connection
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// how authentication is handled
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// ---- ROUTES ----

// temp : mock database
const users = [
  {
    id: 1,
    username: "Jane",
    email: "Jane@gmail.com",
    password: bcrypt.hashSync("asdf"),
  },
];

//temp: sample login
// curl http://localhost:3000/api/login -X POST -H "Content-Type: application/json" -d '{"username": "Jane", "password": "asdf"}'

// create JWT token and log in
const login_post = async (req, res) => {
  // getting credentials
  const { username, password } = req.body;

  // Find user
  const user = users.find((u) => u.username === username);
  if (!user) {
    console.log("User was not foud.");
    return res.status(401).send({ message: "User was not found!" });
  }

  // compare passwords
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    console.log("Incorrect password");
    return res.status(401).send({ message: "Incorrect password!" });
  }

  // authorization success: create JWT token
  const token = jwt.sign({ user: user }, SECRET_KEY, {
    // token options
    expiresIn: "10000s",
  });

  res.json({
    message: "Login request success.",
    token: token,
  });
};

const signup_get = (req, res) => {
  res.json({
    message: "Signup GET request (NOT IMPLEMENTED)",
  });
};

const signup_post = async (req, res) => {
  // START HERE: implement passport, JWT

  console.log("request:");
  console.log(req.body);

  // tmp
  // sample request: (?)
  // curl -X POST -H "Content-Type: application/json" -d '{"newUser": {"username": "first", "email": "first@gmail.com", "password": "fdsa"}}' http://localhost:3000/api/signup/

  if (typeof req.body.newUser !== "undefined") {
    try {
      result = await prisma.user.create({
        data: {
          username: req.body.newUser.username,
          email: req.body.newUser.email,
          password: req.body.newUser.password,

          isAuthor: false,
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
    message: "Signup POST request completed.",
  });
  console.log("[debug] reached end of function");
};

// TODO: add JWT authorization; implement passport.

// PROTECTED ROUTES:
// User detail, update users, POST comment (?)

// NON JWT-PROTECTED:
// sign-ups, logins,

module.exports = {
  login_post,
  signup_get,
  signup_post,
};
