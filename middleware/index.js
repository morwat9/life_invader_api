const authJwt = require("./jwt.middleware");
const verifySignUp = require("./signup.middleware");

module.exports = {
  authJwt,
  verifySignUp,
};
