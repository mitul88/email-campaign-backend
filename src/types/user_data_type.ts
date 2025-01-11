import { Document, Types } from "mongoose";
export interface IUser extends Document {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
}
