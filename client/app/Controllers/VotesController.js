import VotesService from "../Services/VotesService.js";
import store from "../store.js";

//Private
function _draw() {
  let posts = store.State.posts;
  console.log(posts);
}

//Public
export default class VotesController {
  constructor() {
  }
  postVote(choice) {
    VotesService.postVote(choice)
  }
  commentVote(choice) {

  }
}
