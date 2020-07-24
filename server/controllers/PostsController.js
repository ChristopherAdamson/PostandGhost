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
      .delete("/:id", this.delete)
    // .put("/:id", this.edit);
  }

  async delete(req, res, next) {
    try {
      await postsService.delete(req.params.id)
      res.send("Deleted " + endpoint + ".")
    } catch (err) {
      next(err)
    }
  }

  // async edit(req, res, next) {
  //   try {
  //     let rawPostData = req.body
  //     let post = await postsService.edit(req.params.id, rawPostData)
  //     res.send({ data: post, message: endpoint + " edited!" })
  //   } catch (err) {
  //     next(err)
  //   }
  // }

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
}
