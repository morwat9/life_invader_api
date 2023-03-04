const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 34
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 34
    },
    profilePicture: {
      type: String,
      default: 'https://i.postimg.cc/rF8tN46F/defaultpicture.jpg'
    },
    deactivatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
