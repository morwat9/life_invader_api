const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    let token = req.headers["x-access-token"];

    if (!token) {
      res.status(403).send({ message: "No token provided." });
      return;
    }

    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized." });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res.send(error);
  }
}

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
