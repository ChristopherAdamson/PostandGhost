# Post & Ghost Internal Reference


## Note - Comments are now Subdocs of Posts
Posts Model:
const commentContent = new Schema(
  {
    content: { type: String, required: true },
    voteCount: { type: Number, required: true },
    user: { type: String, required: true },
  });

const Post = new Schema(
  {
    topic: { type: String, required: true },
    imgUrl: { type: String, required: true },
    content: { type: String, required: true },
    voteCount: { type: Number, required: true },
    user: { type: String, required: true },
    comment: [commentContent]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
