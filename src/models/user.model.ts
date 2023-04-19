import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-icon/anonymous-icon-0.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
