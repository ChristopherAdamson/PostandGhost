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

//Public
export default class PostsController {
  constructor() {
    store.subscribe("posts", _drawAll);
    store.subscribe("newPost", _drawNewPost)
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
    let found = store.State.posts.find(post => post._id == id)
    let commentData = event.target.comment.value
    // let commentData = {
    //   user: formdata.user.value,
    //   content: formdata.content.value,
    //   topic: formdata.topic.value,
    //   imgUrl: formdata.imgUrl.value,
    //   voteCount: 0,
    // }
    PostsService.makeComment(commentData, found)
    event.target.reset()

  }

  drawsModal(postId) {
    _drawModal(postId)
  }

}
