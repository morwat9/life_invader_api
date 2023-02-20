const express = require("express");
const router = express.Router();

const userApiPrefix = "/users";
const postsApiPrefix = "/posts";
const commentsApiPrefix = "/comments";
const likesApiPrefix = "/likes";

const usersRoutes = require("./users.routes")(userApiPrefix);
const postsRoutes = require("./posts.routes")(postsApiPrefix);
const commentsRoutes = require("./comments.routes")(commentsApiPrefix);
const likesRoutes = require("./likes.routes")(likesApiPrefix);

router.use(userApiPrefix, usersRoutes);
router.use(postsApiPrefix, postsRoutes);
router.use(commentsApiPrefix, commentsRoutes);
router.use(likesApiPrefix, likesRoutes);

module.exports = router;
