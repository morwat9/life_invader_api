const mongoose = require("mongoose");
const Comment = require("../models/comments.model");

module.exports = {
  read: _read,
  readById: _readById,
  create: _create,
  update: _update,
  deactivate: _deactivate,
};

async function _read() {
  try {
    const comments = await Comment.find({ deletedAt: null });
    return comments;
  } catch (error) {
    return error;
  }
}

async function _readById(id) {
  try {
    const comment = await Comment.findOne({
      _id: mongoose.Types.ObjectId(id),
      deactivatedAt: null,
    });
    return comment;
  } catch (error) {
    return error;
  }
}

async function _create(comment) {
  try {
    const result = await Comment.create(comment);
    return result;
  } catch (error) {
    return error;
  }
}

async function _update(id, body) {
  try {
    const result = await Comment.findOneAndUpdate(
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
    const result = await Comment.findOneAndUpdate(
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
