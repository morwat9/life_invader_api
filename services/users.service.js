const mongoose = require("mongoose");
const User = require("../models/users.model.js");

module.exports = {
  read: _read,
  readById: _readById,
  create: _create,
  update: _update,
  deactivate: _deactivate,
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
      { deactivatedAt: Date.now() },
      { new: true }
    );
    return result;
  } catch (error) {
    return error;
  }
}
