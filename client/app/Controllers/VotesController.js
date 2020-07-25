import VotesService from "../Services/VotesService.js";
import store from "../store.js";

//Private
function _draw(id) {
  document.getElementById(`${id}-vote`).innerText = store.State.recentVote
}

//Public
export default class VotesController {
  constructor() {
  }
  postVote(choice, id) {
    VotesService.postVote(choice, id)
    _draw(id)
  }
  commentVote(choice, id) {
    VotesService.commentVote(choice, id)
    _draw(id)
  }
}
