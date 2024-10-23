//database connection
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const login_get = (req, res) => {
  res.json({
    message: "Login request recieved (NOT IMPLEMENTED)",
  });
};

module.exports = {
  login_get,
};
