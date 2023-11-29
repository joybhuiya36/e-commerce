const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      default: 2,
    },
    verified: {
      type: Boolean,
      required: false,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resetPassword: {
      type: Boolean || null,
      require: false,
      default: false,
    },
    resetPasswordToken: {
      type: String || null,
      required: false,
      default: null,
    },
    resetPasswordExpire: {
      type: Date || null,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);
const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;
