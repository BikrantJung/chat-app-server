import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { generateTokens } from "../../utils/generateTokens";
import bcrypt from "bcryptjs";

export const loginUser = async (req: Request, res: Response) => {
  console.log("Request object", req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not Found");
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new Error("Incorrect Password");

    const jwt_token = generateTokens(user._id);
    res.send({ ...user.toObject(), password: "", jwt_token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
