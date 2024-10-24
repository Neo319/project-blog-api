//database connection
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const login_get = (req, res) => {
  res.json({
    message: "Login request recieved (NOT IMPLEMENTED)",
  });
};

// TODO: add JWT authorization; implement passport.

// PROTECTED ROUTES:
// User detail, update users, POST comment (?)

// NON JWT-PROTECTED:
// sign-ups, logins,

module.exports = {
  login_get,
};
