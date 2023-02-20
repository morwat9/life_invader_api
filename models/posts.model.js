const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    body: String,
    pictureUrl: String,
    author: { type: mongoose.Types.ObjectId, ref: "User" },
    likes: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      default: [],
    },
    comments: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
    deactivatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
