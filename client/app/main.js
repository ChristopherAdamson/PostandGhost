import PostsController from "./Controllers/PostsController.js";
import VotesController from "./Controllers/VotesController.js"
import SearchController from "./Controllers/SeachController.js"

class App {

  postsController = new PostsController();
  votesController = new VotesController();
  searchController = new SearchController()
}

window["app"] = new App();
