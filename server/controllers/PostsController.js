import express from "express";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";

let endpoint = "post"
export class PostsController extends BaseController {
  constructor() {
    super("api/posts");
    this.router
      .get("", this.getAll)
      .post("", this.create)
      .post("/:id/comment", this.addComment)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
      .delete("/:id/comment/:commentId", this.deleteComment);
  }

  async delete(req, res, next) {
    try {
      await postsService.delete(req.params.id)
      res.send("Deleted " + endpoint + ".")
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      let rawPostData = req.body
      let post = await postsService.edit(req.params.id, rawPostData)
      res.send({ data: post, message: endpoint + " edited!" })
    } catch (err) {
      next(err)
    }
  }

  async getAll(req, res, next) {
    try {
      let posts = await postsService.find()
      res.send({ data: posts, message: "Got all " + endpoint + "s." })
      return res.send();
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let newPost = await postsService.create(req.body)
      res.send(newPost);
    } catch (error) {
      next(error);
    }
  }


  async addComment(req, res, next) {
    try {
      let comment = await postsService.addComment(req.params.id, req.body);
      if (comment) {
        return res.send(comment);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      let move = await postsService.deleteComment(
        req.params.id,
        req.params.personId
      );
      if (move) {
        res.send("he gone");
      }
    } catch (error) {
      next(error);
    }
  }
}
