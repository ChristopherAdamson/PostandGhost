import PostSchema from "../models/Post";
import mongoose from "mongoose";

class DbContext {
  Posts = mongoose.model("Post", PostSchema);
}

export const dbContext = new DbContext();
