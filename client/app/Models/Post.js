import store from "../store.js"

export default class Post {
  constructor(data) {
    this.topic = data.topic
    this.imgUrl = data.imgUrl
    this.content = data.content
    this.comments = data.comments
    this.voteCount = data.voteCount || 0
    this._id = data._id
    this.user = data.user || "No User"
  }

  get Template() {

    let template = /*html*/`
        <div class="row bg-secondary m-5">

      <div class="col-9">

        <div class="text-right">${this.user}</div>

        <div class="text-center" data-toggle="modal" data-target="#commentModal" onclick="app.postsController.drawsModal('${this._id}')"> ${this.topic} </div>

        <img class="center-block" src="${this.imgUrl}" alt="">

        <div class="text-center" data-toggle="modal" data-target="#commentModal" onclick="app.postsController.drawsModal('${this._id}')">${this.comments.length} comments</div>

      </div>

      <div class="col-3">

        <button onclick="app.votesController.postVote('up', '${this._id}')">Up Arrow</button>

        <p>${this.voteCount}</p>

        <button onclick="app.votesController.postVote('down', '${this._id}')">Down Arrow</button>

      </div>

      </div>
        `
    return template
  }

  get modalTemplate() {
    let template = ""

    // Post Title, Content, etc.
    template += /*html*/`
      <div class="row bg-secondary m-5">
      <div class="col-9">
        <h5 class="text-right">${this.user}</h5>
        <h3 class="text-center">${this.topic}</h3>
        <img class="center-block" src="${this.imgUrl}" alt=""/>
        <h5 class="text-center">${this.comments.length} comments</h5>
      </div>
      <div class="col-3">
        <button onclick="app.votesController.postVote('up', '${this._id}')">Up Arrow</button>
        <p>${this.voteCount}</p>
        <button onclick="app.votesController.postVote('down', '${this._id}')">Down Arrow</button>
      </div>
      `
    template += /*html*/`
      <div class="card border-dark rounded">
      <div class="row justify-content-center">
      <form class="col-12" action="" onsubmit="app.postsController.makeComment(event, '${this._id}')">
      <div class="form-group">
      <label for="comment"></label>
      <label for="user"></label>
      <div class="col-8">
        <input type="text" name="comment" class="form-control" placeholder="Add a comment.."></div>
        <input type="text" name="user" class="form-control" placeholder="Add a user.."></div>
        <div class="col-2">
        <button class="btn btn-success" type="submit">Submit</button></div>
        
      </div>
    
      </form>
    </div>
     `

    this.comments.forEach(comment => template += /*html*/`
      
      <div class="card border-dark rounded">
      <div class="row justify-content-center">
      ${comment.content}
      </div></div>
     `)

    return template
  }
}