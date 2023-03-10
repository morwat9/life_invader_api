const mongoose = require("mongoose");
const User = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  read: _read,
  readById: _readById,
  create: _create,
  update: _update,
  deactivate: _deactivate,
  login: _login,
};

async function _read() {
  try {
    const users = await User.find({ deactivatedAt: null });
    return users;
  } catch (error) {
    return error;
  }
}

async function _readById(id) {
  try {
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId(id),
      deactivatedAt: null,
    });
    return user;
  } catch (error) {
    return error;
  }
}

async function _create(user) {
  try {
    const result = await User.create(user);
    return result;
  } catch (error) {
    return error;
  }
}

async function _update(id, body) {
  try {
    const result = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
        deactivatedAt: null,
      },
      { $set: body },
      { new: true }
    );
    return result;
  } catch (error) {
    return error;
  }
}

async function _deactivate(id) {
  try {
    const result = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
        deactivatedAt: null,
      },
      {
        $set: {
          deactivatedAt: Date.now(),
        },
      },
      { new: true }
    );
    return result;
  } catch (error) {
    return error;
  }
}

async function _login(body) {
  try {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      throw new Error("Authentication Error");
    }

    const passwordIsValid = bcrypt.compareSync(body.password, user.password);

    if (!passwordIsValid) {
      throw new Error("Authentication Error.");
    }

    const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
      expiresIn: 864000,
    });

    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() })

    return {
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      accessToken: token,
    };
  } catch (error) {
    throw error;
  }
}
