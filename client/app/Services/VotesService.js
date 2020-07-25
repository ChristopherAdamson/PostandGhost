import store from "../store.js";
import Post from "../Models/Post.js";
import PostsController from "../Controllers/PostsController.js";

// @ts-ignore
const _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api",
  timeOut: 3000
})

class VotesService {
  postVote(choice, id) {
    if (choice == "up") {
      let foundPost = store.State.posts.find(post => post._id = id)
      foundPost.voteCount++
    } else {
      let foundPost = store.State.posts.find(post => post._id = id)
      foundPost.voteCount--
    }
  }

  commentVote(choice, id) {

  }

}


const service = new VotesService();
export default service;
