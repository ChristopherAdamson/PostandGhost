import store from "../store.js"
import Post from "../Models/Post.js"

// @ts-ignore
const _api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  timeOut: 3000
})

class PostsService {


  constructor() {
    store.subscribe("newPost", this.addToPosts)
    this.getPosts()
  }
  makePost(rawPostData) {
    _api.post("", rawPostData).then(res => {
      console.log(res);
      let post = new Post(res.data)
      store.commit("newPost", post)
    }).catch(err => console.error(err))
  }

  search(data) {
    let foundPost = store.State.posts.filter(post => post.topic.includes(data) || post.content.includes(data))

    console.log(foundPost)
    debugger
    store.commit("searchPost", foundPost)
  }

  getPosts() {
    _api.get("").then(res => {
      console.log(res);

      store.commit("posts", res.data.data.map(post => new Post(post)))
      console.log(store.State.posts);
    })
  }

  makeComment(commentData, id) {
    debugger
    _api.post(id + "/comments", commentData).then(res => {
      console.log(res);
      store.commit("newComment", new Comment(commentData))
    }).catch(err => console.error(err))
  }
  addToPosts() {
    debugger
    store.State.posts.unshift(new Post(store.State.newPost))
  }
  filter(choice) {
    _api.get("choice/" + choice + "/0").then(res => {
      store.commit("posts", res.data.data.map(post => new Post(post)))
    }).catch(err => console.error(err))
  }

}

const service = new PostsService();
export default service;
