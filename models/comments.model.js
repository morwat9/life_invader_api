const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    body: String,
    author: { type: mongoose.Types.ObjectId, ref: "User" },
    source: { type: mongoose.Types.ObjectId, ref: "Post" },
    likes: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      default: [],
    },
    deactivatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
