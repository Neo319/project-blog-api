//database connection
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const verify = require("../config/jwt");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

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
  // ------------- TODO: read from prisma here -------------
  const result = posts.find((post) => {
    return { title: post.title, date: post.date }; // TODO: name is complicated.
  });

  res.json({
    message: "GET posts request recieved",
    posts: result,
  });
};

//temp: sample req
// curl -X POST -H "Authorization: Bearer >token<" -H "Content-Type: application/json" -d '{"authorId": "1", "title": "newPost", "text": "Hello! This is a sample post."}' http://localhost:3000/api/posts/

// --- protected : POST new blog posts ---
const posts_post = [
  verify,
  (req, res) => {
    // temp: no db
    const { authorId, title, text, isPublic } = req.body;

    // ensure req has needed data
    if (!authorId || !title || !text) {
      console.log("missing data to post.");
      return res.status(400).send({ message: "missing data to post." });
    }

    // ensure user is author
    jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
      if (err) {
        return res.status(403).send({ message: "error during authorization." });
      }

      const userIsAuthor = authData.user.isAuthor;
      if (!userIsAuthor)
        return res
          .status(403)
          .send({ message: "Forbidden: user is not author." });

      // data is good, user is verified; post article
      //temp: just return the article
      // ------------- TODO: upload to prisma here -------------
      res.json({
        message: "Authorized user + data and posted article.",
        data: {
          authorId,
          title,
          text,
          isPublic: isPublic === "true" ? true : false,
        },
      });
    });
  },
];

// TODO: implement PROTECTED ROUTES:
// - Create, Update, Delete posts

// PUBLIC ROUTES:
// - Read / GET posts

module.exports = {
  posts_get,
  posts_post,
};
