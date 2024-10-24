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

// --- GET list of blog posts ---
const posts_get = (req, res) => {
  // temp implementation: returns ALL posts, selecting title, date, author ONLY.
  const result = posts.find((post) => {
    return { title: post.title, date: post.date }; // TODO: name is complicated.
  });

  res.json({
    message: "GET posts request recieved",
    posts: result,
  });
};

// TODO: implement PROTECTED ROUTES:
// - Create, Update, Delete posts

// PUBLIC ROUTES:
// - Read / GET posts

module.exports = {
  posts_get,
};
