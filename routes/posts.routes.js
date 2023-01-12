const router = require("express").Router();
const postsControllerFactory = require("../controllers/posts.controller");

module.exports = function (apiPrefix) {
  const postsController = postsControllerFactory(apiPrefix);

  router.get("/", postsController.read);
  router.get("/:id([0-9a-zA-Z]{24})", postsController.readById);
  router.post("/", postsController.create);
  router.put("/:id([0-9a-zA-Z]{24})", postsController.update);
  router.delete("/:id([0-9a-zA-Z]{24})", postsController.deactivate);

  return router;
};
