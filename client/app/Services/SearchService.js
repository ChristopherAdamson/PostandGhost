import store from "../store.js"
class SearchService {


  search(data) {
    let foundpost = store.State.posts.forEach(post => post.topic.includes(data))
    console.log(foundpost)
  }

}

const Service = new SearchService
export default Service