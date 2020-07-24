import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class PostsService {
  delete(id) {
    return await dbContext.Posts.findByIdAndDelete(id)
  }

  async create(body) {
    return await dbContext.Posts.create(body)
  }
  async find(query = {}) {
    let posts = await dbContext.Posts.find(query);
    return posts;
  }
  async findById(id) {
    let post = await dbContext.Posts.findById(id);
    if (!post) {
      throw new BadRequest("Invalid Id!");
    }
    return post;
  }
}

export const postsService = new PostsService();