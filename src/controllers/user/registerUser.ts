import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { generateTokens } from "../../utils/generateTokens";

export const registerUser = async (req: Request, res: Response) => {
  console.log("Request object", req.body);
  const { username, email, password, profile_picture } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) throw new Error("User already exists");

    const user = await User.create({
      username,
      email,
      password,
      profile_picture,
    });

    const jwt_token = generateTokens(user._id);
    res.send({ ...user.toObject(), password: "", jwt_token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
