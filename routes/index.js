const express = require("express");
const router = express.Router();

const userApiPrefix = "/users";
const postsApiPrefix = "/posts";
const commentsApiPrefix = "/comments"

const usersRoutes = require("./users.routes")(userApiPrefix);
const postsRoutes = require("./posts.routes")(postsApiPrefix);
const commentsRoutes = require("./comments.routes")(commentsApiPrefix)

router.use(userApiPrefix, usersRoutes);
router.use(postsApiPrefix, postsRoutes);
router.use(commentsApiPrefix, commentsRoutes)

module.exports = router;
