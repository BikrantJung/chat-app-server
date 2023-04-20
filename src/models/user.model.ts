import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-icon/anonymous-icon-0.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (
  this,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (this, next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model("User", userSchema);
