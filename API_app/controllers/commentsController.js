//database connection
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const verify = require("../config/jwt");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// temp: sample db
const comments = [
  {
    id: 1,
    title: "first",
    date: Date.now(),

    userId: 1,
    postId: 1,

    text: "Hello world!",
  },
];

// should look like : "/api/posts/:id/comments"

// --- GET all comments of one post ---
const comments_get = async (req, res) => {
  //post to see comments for
  const postId = req.params.postId;

  // temp: returns first 10 comments, selecting date, author, text ONLY.

  try {
    const result = await prisma.comment.findMany({
      select: {
        user: true,
        date: true,
        text: true,
        // TODO: return user object selecting only name?
      },
      take: 10,
      where: {
        postId: postId,
      },
    });

    res.json({
      message: "GET posts request recieved",
      posts: result,
    });
  } catch (err) {
    console.log("error finding comments", err.message);
    return res.status(400).send({ message: "error finding comments." });
  }
};

// sample req
// curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"userId": 3, "text": "Hello world!"}' http://localhost:3000/api/posts/comments/<postid>

// --- users only : POST new comments ---
const comments_post = [
  verify,
  async (req, res) => {
    const postId = parseInt(req.params.postId);
    const { userId, text } = req.body;

    // ensure req has needed data
    if (!userId || !postId || !text) {
      console.log("missing data to post.");
      return res.status(400).send({ message: "missing data to post." });
    }

    // ensure post exists
    try {
      await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
    } catch (err) {
      console.log("error: post does not exist", err.message);
      return res.status(400).send({ message: "post does not exist." });
    }

    // data is good, user is verified; post article
    try {
      await prisma.comment.create({
        data: {
          userId: userId,
          postId: postId,
          text: text,
        },
      });
    } catch (err) {
      console.log("error during comment upload.", err.message);
      return res.status(400).send({ message: "Error during commnent upload." });
    }

    res.json({
      message: "Authorized user + data and posted comment.",
      data: {
        userId,
        postId,
        text,
      },
    });
  },
];

// --- protected : DELETE blog posts ---

const comments_delete = [
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

module.exports = {
  comments_get,
  comments_post,
};
