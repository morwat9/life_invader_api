const mongoose = require("mongoose");
const Post = require("../models/posts.model");

module.exports = {
  read: _read,
  readById: _readById,
  create: _create,
  update: _update,
  deactivate: _deactivate,
  getFeed: _getFeed,
};

async function _read() {
  try {
    const posts = await Post.find({ deletedAt: null });
    return posts;
  } catch (error) {
    return error;
  }
}

async function _readById(id) {
  try {
    const post = await Post.findOne({
      _id: mongoose.Types.ObjectId(id),
      deactivatedAt: null,
    });
    return post;
  } catch (error) {
    return error;
  }
}

async function _create(post) {
  try {
    const result = await Post.create(post);
    return result;
  } catch (error) {
    return error;
  }
}

async function _update(id, body) {
  try {
    const result = await Post.findOneAndUpdate(
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
    const result = await Post.findOneAndUpdate(
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
//.sort({ createdAt: 1 })
async function _getFeed() {
  try {
    const posts = await Post.find({ deactivatedAt: null })
      .populate([
        {
          path: "author",
          select: "username profilePicture email _id",
        },
        {
          path: "comments",
          select: "source author body comments likes",
          populate: {
            path: "author",
            select: "username profilePicture email",
          },
          match: { deactivatedAt: null }
        },
      ])
      .sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    return error;
  }
}
