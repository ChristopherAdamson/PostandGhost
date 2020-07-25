import SearchService from "../Services/SearchService.js"

export default class SearchController {
  search(data) {
    SearchService.search(data)
  }


}

