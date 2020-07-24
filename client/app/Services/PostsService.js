import store from "../store.js";
import Post from "../Models/Post.js"

// @ts-ignore
const _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api",
  timeOut: 3000
})

class PostsService {
  // makePost(rawPostData) {
  //   _api.post("", rawPostData).then(res => {
  //     console.log(res);
  //   }).catch(err => console.error(err))
  // }
  makePost(rawPostData) {
    let newPost = new Post(rawPostData)
    // store.commit("posts", newPost)
    store.State.posts.push(newPost)
  }


}

const service = new PostsService();
export default service;
