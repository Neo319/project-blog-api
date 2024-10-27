//database connection
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// how authentication is handled
const jwt = require("jsonwebtoken");
const verify = require("../config/jwt");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

//temp: sample login
// curl http://localhost:3000/api/login -X POST -H "Content-Type: application/json" -d '{"username": "Jane", "password": "asdf"}'

// ---- ROUTES ----
// ----- create JWT token and log in -----
const login_post = async (req, res) => {
  // getting credentials
  const { username, password } = req.body;

  console.log(req.body);

  if (!username || !password) {
    console.log("error: incomplete request");
    return res.status(403).send({ message: "Error: incomplete request." });
  }

  // Find user
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      console.log("User was not found.");
      return res.status(401).send({ message: "User was not found!" });
    }
    // compare passwords
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      console.log("Incorrect password");
      return res.status(401).send({ message: "Incorrect password!" });
    }

    // --- authorization success: create JWT token ---
    const token = jwt.sign({ user: user }, SECRET_KEY, {
      // token options
      expiresIn: "10000s",
    });
    // TODO: determine what to do with this token?
    res.json({
      message: "Login request success.",
      token: token,
    });
  } catch (err) {
    console.log("error during login.");
    return res.status(403).send({ message: "Error during login." });
  }
};

// tmp: saple request
// curl -X POST -H "Content-Type: application/json" -d '{"username": "first", "email": "first@gmail.com", "password": "fdsa"}' http://localhost:3000/api/signup/

// ---- create new User in Database ----
const signup_post = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    console.log("Error: incomplete credentials");
    return res
      .status(401)
      .send({ message: "Error: missing signup credentials." });
  }

  try {
    result = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: bcrypt.hashSync(password),

        isAuthor: false,
      },
    });
    console.log(result);
  } catch (err) {
    console.log("signup err");
    console.error(err.message);
    return res.status(400).send({ message: "error during signup." });
  }

  res.json({
    message: "Signup POST request completed.",
  });
};

// temp: sample req (replace token)
// curl -H "Authorization: Bearer >token<" http://localhost:3000/api/user

// (note: first 'verify' calls a middleware function defined in config.)
// Protected route test:
// ---- GET USER DETAILS ----
const user_detail = [
  verify,
  async function (req, res) {
    jwt.verify(req.token, SECRET_KEY, (err, authData) => {
      if (err) {
        return res.status(403).send({ message: "error during authorization." });
      }
      res.json({
        message: "authorization success; user Detail sent.",
        data: authData,
      });
    });
  },
];

// tmp: sample curl
// curl -H "Authorization: <token>" -X PUT -d '{"username": "firstAuthor", "email": "auth@gmail.com", "password": "asdf", "isAuthor": "true"}' -H "Content-Type: application/json" http://localhost:3000/api/user

// user should only be able to update / delete self
// ---- UPDATE USER ---
const user_put = [
  verify,
  async function (req, res) {
    jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
      if (err) {
        return res.status(403).send({ message: "error during authorization." });
      }

      // getting credentials
      const { username, password, isAuthor } = req.body;

      if (!username || !password) {
        console.log("error: incomplete request");
        return res.status(403).send({ message: "Error: incomplete request." });
      }

      let result = {};

      // updating the user in db
      try {
        result = await prisma.user.update({
          where: {
            id: authData.user.id,
          },
          data: {
            username: username,
            password: bcrypt.hashSync(password),
            isAuthor: isAuthor === "true" ? true : false,
          },
        });
        console.log("[debug]: update user in db.");
        console.log(result);
      } catch (err) {
        console.log("update user err");
        console.error(err.message);
        return res.status(400).send({ message: "error during update user." });
      }

      res.json({ message: "user successfully updated.", data: result });
    });
  },
];

//sample req:
// curl -H "Authorization: <token>" -X DELETE -d -H "Content-Type: application/json" http://localhost:3000/api/user

// ---- DELETE USERS ----
const user_delete = [
  verify,
  async function (req, res) {
    jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
      if (err) {
        return res.status(403).send({ message: "error during authorization." });
      }

      // authorized : delete user from db
      try {
        await prisma.user.delete({
          where: {
            id: authData.user.id,
          },
        });
      } catch (err) {
        console.log("delete user err");
        console.error(err.message);
        return res.status(400).send({ message: "error during delete user." });
      }

      res.json({ message: "user successfully deleted." });
    });
  },
];

//

module.exports = {
  login_post,
  signup_post,

  user_detail,
  user_put,
  user_delete,
};
