//database connection
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const comments_get = (req, res) => {
  res.json({
    message: "GET comments request recieved (NOT IMPLEMENTED)",
  });
};

// TODO: implement PROTECTED ROUTES:
// - Create, Update, Delete posts

// PUBLIC ROUTES:
// - Read / GET posts

module.exports = {
  comments_get,
};
