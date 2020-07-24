# Post & Ghost Internal Reference


Posts objects (JSON):
{
topic: "string"
imgUrl: "string"
content: "string"
voteCount: 0
_id: (assigned by mongoose)
user: "string"
}

Comments objects (JSON):
{
content: "string"
voteCount: 0
_id: (assigned by mongoose)
user: "string"
postId: { type: ObjectId, ref: "PostId", required: true }
}