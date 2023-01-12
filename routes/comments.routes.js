const router = require("express").Router();
const commentsControllerFactory = require("../controllers/comments.controller");

module.exports = function (apiPrefix) {
  const commentsController = commentsControllerFactory(apiPrefix);

  router.get("/", commentsController.read);
  router.get("/:id([0-9a-zA-Z]{24})", commentsController.readById);
  router.post("/", commentsController.create);
  router.put("/:id([0-9a-zA-Z]{24})", commentsController.update);
  router.delete("/:id([0-9a-zA-Z]{24})", commentsController.deactivate);

  return router;
};
