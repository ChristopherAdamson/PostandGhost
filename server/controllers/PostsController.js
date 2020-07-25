import express from "express";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";

let endpoint = "post"
export class PostsController extends BaseController {
  constructor() {
    super("api/posts");
    this.router
    .get("", this.getAll)
    .get("/:id", this.getById)
    .post("", this.create)
    .post("/:id/comments", this.addComment)
    .put("/:id", this.edit)
    .delete("/:id", this.delete)
    .delete("/:id/comments/:commentId", this.deleteComment)
    .get("/page/:page", this.findByPage)
    .get("/choice/:choice/:page", this.findByChoice)

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
 
  

  async findByPage(req, res, next) {
    try {
      let pageNo = req.params.page
      let pageData = await postsService.findByPage(pageNo)
      res.send({ data: pageData, message: "next 10" + endpoint + "s" })
    } catch (error) {
      next(error)
    }
  }
  async findByChoice(req, res, next) {
    try {
      let pageNo = req.params.page
      let choice = req.params.choice
      let pageData = await postsService.findByChoice(choice, pageNo)
      res.send({ data: pageData, message: "next 10" + endpoint + "s" })
    } catch (error) {
      next(error)
  
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

  async getById(req, res, next) {
    try {
      let found = await postsService.findById(req.params.id)
      res.send({ data: found, message: "Got post by id " + endpoint + "s." })
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
        console.log(comment)
        return res.send(comment);
      }
    } catch (error) {
      next(error);
      console.log(error)
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
