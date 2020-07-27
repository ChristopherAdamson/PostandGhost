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

  async findByPage(page) {
    let foundPage = await dbContext.Posts.find({}).sort({ createdAt: 'asc' }).limit(10).skip(page * 10);
    return foundPage;
  }
  async findByChoice(choice, page) {
    if (choice == 'date') {
      let foundChoice = await dbContext.Posts.find().sort({ createdAt: 'desc' }).limit(10).skip(page * 10);
      return foundChoice;
    } else if (choice == 'votes') {
      let foundChoice = await dbContext.Posts.find().sort({ voteCount: -1 }).limit(10).skip(page * 10);
      return foundChoice;
    } else if (choice == 'comments') {
      let foundChoice = await dbContext.Posts.find().sort({ commentCount: 'desc' }).limit(10).skip(page * 10);
      return foundChoice;
    }

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
      { $addToSet: { comments: body }, $inc: { commentCount: 1 } },
      { new: true }
    );
  }
  // , 
  async deleteComment(id, commentId) {
    return await dbContext.Posts.findByIdAndUpdate(
      { _id: commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
  }
}

export const postsService = new PostsService();