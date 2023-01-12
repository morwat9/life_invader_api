const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    body: String,
    pictureUrl: String,
    author: { type: mongoose.Types.ObjectId, ref: "users" },
    likes: {
      type: [{ type: mongoose.Types.ObjectId, ref: "users" }],
      default: [],
    },
    comments: {
      type: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
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

const Post = mongoose.model("post", postSchema);

module.exports = Post;
