const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");

// all routes involving posts

// list posts
router.get("/", postsController.posts_get);

// create new post (protected)
router.post("/", postsController.posts_post);

module.exports = router;
