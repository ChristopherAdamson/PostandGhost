import store from "../store.js"

export default class Comment {
  constructor(data) {
    this.content = data.content
    this.voteCount = data.voteCount || 0
    this._id = data._id
    this.user = data.user || "No User"
  }

  get Template() {
    let template = /*html*/`
      
      <div class="card border-dark rounded">
      <div class="row justify-content-center">
      ${this.content}
      </div></div>
     `
    return template
  }
}