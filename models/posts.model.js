const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 400
    },
    author: { 
      type: mongoose.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    likes: {
      type: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "User" 
      }],
      default: [],
    },
    comments: {
      type: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "Comment" }],
      default: [],
    },
    deactivatedAt: {
      type: Date,
      default: null,
    },
    category: {
      type: String,
      enum: ['jobs', 'housing', 'services', 'for sale'],
      required: true
    }
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
