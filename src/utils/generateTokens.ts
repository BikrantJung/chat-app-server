import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateTokens = (userId: any) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );
};
