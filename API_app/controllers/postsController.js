//database connection
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// temp: sample db
const posts = [
  {
    id: 1,
    title: "first",
    date: Date.now(),

    userId: 1,

    isPublic: false,
    textData:
      '{"article" : "Hello! This is my first article. There should be a lot of text here."}',
  },
];

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
