import PostsService from "../Services/PostsService.js";
import store from "../store.js";

//Private
function _drawAll() {
  let template = ""
  let posts = store.State.posts;
  console.log(posts);
  posts.forEach(post => template += post.Template)
  document.getElementById("posts").innerHTML = template;
}

function _drawNewPost() {
  let template = ""
  let post = store.State.posts[0];
  console.log(post);
  template += post.Template
  document.getElementById("newPost").innerHTML += template;
}


function _drawModal(postId) {
  let template = ""
  let postData = store.State.posts.find(p => p._id == postId)
  console.log(postData);
  document.getElementById("modalTemplate").innerHTML = postData.modalTemplate
  template += `</div></div>`
}

function _drawComment() {
  document.getElementById("newComment").innerHTML = store.State.newComment.commentTemplate

}
//Public
export default class PostsController {
  constructor() {
    store.subscribe("posts", _drawAll);
    store.subscribe("newPost", _drawNewPost);
    store.subscribe("newComment", _drawComment)
  }
  makePost(event) {
    event.preventDefault()
    let formdata = event.target
    let rawPostData = {
      user: formdata.user.value,
      content: formdata.content.value,
      topic: formdata.topic.value,
      imgUrl: formdata.imgUrl.value,
      voteCount: 0,
    }
    console.log(rawPostData);
    PostsService.makePost(rawPostData)
    formdata.reset()
  }

  makeComment(event, id) {
    event.preventDefault()
    console.log(event)
    let commentData = {
      content: event.target.comment.value,
      user: event.target.user.value,
      voteCount: 0
    }

    PostsService.makeComment(commentData, id)
    event.target.reset()

  }

  drawsModal(postId) {
    _drawModal(postId)
  }

}
