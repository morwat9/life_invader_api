const mongoose = require("mongoose");
const Comment = require("../models/comments.model");
const Post = require("../models/posts.model");

module.exports = {
  read: _read,
  readById: _readById,
  create: _create,
  update: _update,
  deactivate: _deactivate,
  addComment: _addComment,
  getComments: _getComments,
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

async function _addComment(postId, comment) {
  try {
    const commentResult = await Comment.create(comment);
    const postResult = await Post.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(postId), deactivatedAt: null },
      {
        $push: {
          comments: commentResult._id,
        },
      },
      { new: true }
    );
    return postResult;
  } catch (error) {
    return error;
  }
}

async function _getComments(postId) {
  try {
    const postResult = await Post.findOne({ _id: postId, deactivatedAt: null });
    console.log(postResult);
    const commentIds = postResult.comments;
    const comments = await Comment.find({ _id: { $in: commentIds }, deactivatedAt: null })
      .populate({
        path: "author",
        select: "username profilePicture email",
      })
      .sort({ createdAt: 1 });

    console.log(comments);
    return comments;
  } catch (error) {
    return error;
  }
}
