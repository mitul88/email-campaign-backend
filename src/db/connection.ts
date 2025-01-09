import mongoose from "mongoose";
import { ENV_CONFIG } from "../config/env.config";

const db_local = ENV_CONFIG.MONGODB_LOCAL_URL;

export const dbConnection = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(db_local);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};
