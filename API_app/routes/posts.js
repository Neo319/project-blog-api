const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");

const commentsRouter = require("./comments");
router.use("/comments", commentsRouter);

// all routes involving posts

// list posts
router.get("/", postsController.posts_get);

// post detail
router.get("/:id/", postsController.post_detail_get);

// create new post (protected)
router.post("/", postsController.posts_post);

router.put("/", postsController.posts_put);

router.delete("/:id/", postsController.posts_delete);

module.exports = router;
