import { Types } from "mongoose";
export interface IUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
}
