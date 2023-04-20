import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { CustomRequest } from "../../types/request.type";
/**
 * Search for users
 * @route /api/user/getUser?search=
 * @returns All users is query string not provided
 * @returns Only one user if query is provided ?search=John
 *
 */

export const getUser = async (req: CustomRequest, res: Response) => {
  console.log(req.user);
  const query = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(query).find({ _id: { $ne: req.user?._id } });
  res.status(200).json(users);
};
