//database connection
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
const posts_get = async (req, res) => {
  // temp: returns first 10 posts, selecting title, date, author ONLY.

  const result = await prisma.post.findMany({
    select: {
      title: true,
      date: true,
      // TODO: return user object selecting only name?
    },
    take: 10,
  });

  res.json({
    message: "GET posts request recieved",
    posts: result,
  });
};

//temp: sample req
// curl -X POST -H "Authorization: Bearer >token<" -H "Content-Type: application/json" -d '{"authorId": 1, "title": "newPost", "text": "{"article": "Hello! This is a sample post."}}' http://localhost:3000/api/posts/

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
      try {
        await prisma.post.create({
          data: {
            userId: authData.user.id,
            title: title,
            textData: text,

            isPublic: isPublic === "true" ? true : false,
          },
        });
      } catch (err) {
        console.log("error during post upload.");
        return res.status(400).send({ message: "Error during post upload." });
      }

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

//temp: sample req
// curl -X PUT -H "Authorization: Bearer >token<" -H "Content-Type: application/json" -d '{"authorId": "1", "title": "newPost", "text": "Hello! This is a sample post."}' http://localhost:3000/api/posts/

// --- protected : PUT/UPDATE blog posts ---
const posts_put = [
  verify,
  (req, res) => {
    // temp: no db
    const { postId, title, text, isPublic } = req.body;

    // ensure req has needed data
    if (!postId || !title || !text) {
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
      try {
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            title: title,
            textData: text,

            isPublic: isPublic === "true" ? true : false,
          },
        });
      } catch (err) {
        console.log("error during post update.", err.message);
        return res.status(400).send({ message: "Error during post update." });
      }

      res.json({
        message: "Authorized user + data and posted article.",
        data: {
          title,
          text,
          isPublic: isPublic === "true" ? true : false,
        },
      });
    });
  },
];

//temp: sample req
// curl -X DELETE -H "Authorization: Bearer >token<" http://localhost:3000/api/posts/<postId>

// --- protected : DELETE blog posts ---

const posts_delete = [
  verify,
  async (req, res) => {
    //get post id from params
    const postId = parseInt(req.params.id);

    // ensure authorized user is post author
    jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
      if (err) {
        return res.status(403).send({ message: "error during authorization." });
      }

      // get user id from auth
      const userId = authData.user.id;
      // get post id from db
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      // ensure userId matches post's author
      if (!(userId === post.userId)) {
        return res
          .status(403)
          .send({ message: "Forbidden: user is not this post's author." });
      }
      // authorization complete: delete post from db
      try {
        await prisma.post.delete({
          where: {
            id: postId,
          },
        });
      } catch (err) {
        console.log("error during post deletion.");
        res.status(400).send({ message: "error during post deletion." });
      }
      res.send({ message: `Post of id ${postId} successfully deleted` });
    });
  },
];

// TODO: POST DETAIL

module.exports = {
  posts_get,
  posts_post,

  posts_put,
  posts_delete,
};
