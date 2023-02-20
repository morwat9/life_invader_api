const router = require("express").Router();
const likesControllerFactory = require("../controllers/likes.controller");

module.exports = function (apiPrefix) {
  const likesController = likesControllerFactory(apiPrefix);

  router.put("/post-add/:id([0-9a-zA-Z]{24})", likesController.postAdd);
  router.put("/post-remove/:id([0-9a-zA-Z]{24})", likesController.postRemove);
  router.put("/comment-add/:id([0-9a-zA-Z]{24})", likesController.commentAdd);
  router.put(
    "/comment-remove/:id([0-9a-zA-Z]{24})",
    likesController.commentRemove
  );

  return router;
};
