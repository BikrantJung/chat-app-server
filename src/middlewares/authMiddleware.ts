import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../types/request.type";

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) throw new Error("Unauthenticated");
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await User.findById(decoded.userId);
      if (user) {
        req.user = user.toObject();
      }
      next();
    } else {
      throw new Error("Unauthenticated");
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthenticated" });
  }
};
