const mongoose = require("mongoose");
const Comment = require("../models/comments.model");
const Post = require("../models/posts.model");

module.exports = {
  postAdd: _postAdd,
  postRemove: _postRemove,
  commentAdd: _commentAdd,
  commentRemove: _commentRemove,
};

async function _postAdd(postId, userId) {
  try {
    const addResult = await Post.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(postId),
        deactivatedAt: null,
      },
      {
        $push: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    );
    return addResult;
  } catch (error) {
    return error;
  }
}

async function _postRemove(postId, userId) {
  try {
    const removeResult = await Post.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(postId),
        deactivatedAt: null,
      },
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    );
    return removeResult;
  } catch (error) {
    return error;
  }
}

async function _commentAdd(commentId, userId) {
  try {
    const addResult = await Comment.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(commentId),
        deactivatedAt: null,
      },
      {
        $push: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    );
    return addResult;
  } catch (error) {
    return error;
  }
}

async function _commentRemove(commentId, userId) {
  try {
    const removeResult = await Comment.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(commentId),
        deactivatedAt: null,
      },
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    );
    return removeResult;
  } catch (error) {
    return error;
  }
}
