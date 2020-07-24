import PostsController from "./Controllers/PostsController.js";
import VotesController from "./Controllers/VotesController.js"

class App {

  postsController = new PostsController();
  votesController = new VotesController();
}

window["app"] = new App();
