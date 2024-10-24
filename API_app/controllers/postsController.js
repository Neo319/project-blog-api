//database connection
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const posts_get = (req, res) => {
  res.json({
    message: "GET posts request recieved (NOT IMPLEMENTED)",
  });
};

// TODO: implement PROTECTED ROUTES:
// - Create, Update, Delete posts

// PUBLIC ROUTES:
// - Read / GET posts

module.exports = {
  posts_get,
};
