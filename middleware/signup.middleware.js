const User = require("../models/users.model");

async function checkDuplicateUsernameAndEmail(req, res, next) {
  try {
    const username = await User.findOne({ username: req.body.username });

    if (username) {
      res.status(400).send({ message: "Username already in use." });
      return;
    }

    const email = await User.findOne({ email: req.body.email });

    if (email) {
      res.status(400).send({ message: "Email already in use." });
      return;
    }

    next();
  } catch (error) {
    res.send(error);
  }
}

const verifySignUp = { checkDuplicateUsernameAndEmail };

module.exports = verifySignUp;
