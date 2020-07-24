import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class PostsService {

  async create(body) {
    return await dbContext.Posts.create(body)
  }
  async find(query = {}) {
    let posts = await dbContext.Posts.find(query);
    return posts;
  }

  async edit(id, newData) {
    return await dbContext.Posts.findByIdAndUpdate(id, newData, { new: true })
  }

  async findById(id) {
    let post = await dbContext.Posts.findById(id);
    if (!post) {
      throw new BadRequest("Invalid Id!");
    }
    return post;
  }

  async delete(id) {
    return await dbContext.Posts.findByIdAndDelete(id)
  }

  async addComment(id, body) {
    return await dbContext.Posts.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { comment: body } },
      { new: true }
    );
  }
  async deleteComment(id, commentId) {
    return await dbContext.Posts.findByIdAndUpdate(
      { _id: commentId },
      { $pull: { comment: { _id: commentId } } },
      { new: true }
    );
  }
}

export const postsService = new PostsService();