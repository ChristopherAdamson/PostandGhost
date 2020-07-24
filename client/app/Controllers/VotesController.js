import VotesService from "../Services/VotesService.js";
import store from "../store.js";

//Private
function _draw() {

}

//Public
export default class VotesController {
  constructor() {
  }
  postVote(choice, id) {
    VotesService.postVote(choice, id)
  }
  commentVote(choice, id) {
    VotesService.commentVote(choice, id)
  }
}
