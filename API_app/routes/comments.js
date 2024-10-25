const express = require("express");
const router = express.Router();

const commentsController = require("../controllers/commentsController");

// all routes involving posts

// list comments on a post
router.get("/:postId", commentsController.comments_get);

// create comments
router.post("/:postId", commentsController.comments_post);

// router.put("/:id/");

// router.delete("/:id/");

module.exports = router;
