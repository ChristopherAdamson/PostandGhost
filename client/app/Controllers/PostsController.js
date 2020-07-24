import PostsService from "../Services/PostsService.js";
import store from "../store.js";

//Private
function _draw() {
  let posts = store.State.posts;
  console.log(posts);
}

//Public
export default class PostsController {
  constructor() {
    store.subscribe("posts", _draw);
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
  }
}
