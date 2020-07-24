import store from "../store.js";
import Post from "../Models/Post.js"

// @ts-ignore
const _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api",
  timeOut: 3000
})

class VotesService {
  postVote(choice, id) {
    if (choice == "up") {
      let foundPost = store.State.posts.find(post => post.id = id)
      foundPost.voteCount++
    } else {
      let foundPost = store.State.posts.find(post => post.id = id)
      foundPost.voteCount--
    }
  }
  // makePost(rawPostData) {
  //   _api.post("", rawPostData).then(res => {
  //     console.log(res);
  //   }).catch(err => console.error(err))
  // }

}

const service = new VotesService();
export default service;
