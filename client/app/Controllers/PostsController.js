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


function _drawModal(id) {
  debugger
  let template = ""

  // let found = store.State.posts.comments.forEach(post => template += postComment.modalTemplate)
  // document.getElementById("modalTemplate").innerHTML = found.modalTemplate

  template += `</div></div>`
}

//Public
export default class PostsController {
  constructor() {
    store.subscribe("posts", _drawAll);
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
    let found = store.State.posts.find(post => post.id == id)
    let commentData = event.target.comment.value
    PostsService.makeComment(commentData, found)
    event.target.reset()

  }

  drawsModal(id) {
    _drawModal(id)
  }

}
