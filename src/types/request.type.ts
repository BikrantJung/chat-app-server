import { Request } from "express";
import { IUser } from "./user.type";

export interface CustomRequest extends Request {
  user?: IUser;
}
