import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

(async () => {
  try {
    console.log(MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected!");
  } catch (e) {
    console.log(e);
    throw e;
  }
})();
