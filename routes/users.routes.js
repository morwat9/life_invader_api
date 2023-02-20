const router = require("express").Router();
const usersControllerFactory = require("../controllers/users.controller");
const { verifySignUp, authJwt } = require("../middleware");

module.exports = function (apiPrefix) {
  const usersController = usersControllerFactory(apiPrefix);

  router.get("/", authJwt.verifyToken, usersController.read);
  router.get(
    "/:id([0-9a-zA-Z]{24})",
    authJwt.verifyToken,
    usersController.readById
  );
  router.post(
    "/",
    verifySignUp.checkDuplicateUsernameAndEmail,
    usersController.create
  );
  router.post("/login", usersController.login);
  router.put("/:id([0-9a-zA-Z]{24})", usersController.update);
  router.delete("/:id([0-9a-zA-Z]{24})", usersController.deactivate);

  return router;
};
