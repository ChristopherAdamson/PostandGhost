import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const Comment = new Schema(
  {
    content: { type: String, required: true },
    voteCount: { type: Number, required: true },
    user: { type: String, required: true },
    postId: { type: ObjectId, ref: "PostId", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Comment;
