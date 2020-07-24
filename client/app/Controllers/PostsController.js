import PostsService from "../Services/PostsService.js";
import store from "../store.js";
import { DocumentQuery } from "mongoose";

//Private
function _draw() {
  let template = ""
  let posts = store.State.posts;
  console.log(posts);
  posts.forEach(post => template += post.Template)
  document.getElementById("posts").innerHTML = template; 
}

  
  function _drawModal(id){
    let found = store.State.posts.find(post => post.id == id)
    document.getElementById("commentModal").innerHTML = found.Template
  }

//Public
export default class PostsController {
  constructor() {
    store.subscribe("posts",_draw);
    store.subscribe("posts", _drawModal)
  }
  makePost(event) {
    event.preventDefault()
    let formdata = event.target
    let rawPostData = {
      user: formdata.user.value,
      content: formdata.content.value,
      imgUrl: formdata.imgUrl.value
    }
    console.log(rawPostData);
    PostsService.makePost(rawPostData)
    formdata.reset()
    _draw()
  }

  makeComment(event, id){
    event.preventDefault()
    let found = store.State.posts.find(post => post.id == id)
    let commentData = event.target.comment.value
    PostsService.makeComment(commentData, found)
    event.target.reset()

  }

  drawsComments(id){
    _drawModal(id)
  }

}
