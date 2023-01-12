const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    body: String,
    author: { type: mongoose.Types.ObjectId, ref: "users" },
    post: { type: mongoose.Types.ObjectId, ref: "posts"},
    likes: {
      type: [{ type: mongoose.Types.ObjectId, ref: "users" }],
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

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
