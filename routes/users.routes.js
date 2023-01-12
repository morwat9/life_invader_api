const router = require("express").Router();
const usersControllerFactory = require("../controllers/users.controller");

module.exports = function (apiPrefix) {
  const usersController = usersControllerFactory(apiPrefix);

  router.get("/", usersController.read);
  router.get("/:id([0-9a-zA-Z]{24})", usersController.readById);
  router.post("/", usersController.create);
  router.put("/:id([0-9a-zA-Z]{24})", usersController.update);
  router.delete("/:id([0-9a-zA-Z]{24})", usersController.deactivate);

  return router;
};
