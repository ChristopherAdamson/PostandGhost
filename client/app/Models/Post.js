import store from "../store"

let id = 1;
export default class Post {
    constructor(data) {
        this.topic = data.topic
        this.imgUrl = data.imgUrl
        this.comments = data.comments || []
        this.voteCount = data.voteCount || 0
        this.id = data.id || id++
        this.user = data.user || "No User"
    }

    get Template (){
        let template =  `
        <div class="row bg-secondary m-5">
      <div class="col-9">
        <h5 class="text-right">${this.user}</h5>
        <h3 class="text-center" onclick="app.postsController.drawComments(${this.id})>${this.topic}</h3>
        <img class="center-block" src="${this.imgUrl}" alt="">
        <h5 class="text-center" onclick="app.postsController.drawComments(${this.id})>${this.comments.length} comments</h5>
      </div>
      <div class="col-3">
        <button onclick="app.votesController.postVote('up', ${this.id})">Up Arrow</button>
        <p>${this.voteCount}</p>
        <button onclick="app.votesController.postVote('down', ${this.id})">Down Arrow</button>
      </div>
      </div>
        `
        return template
    }

    get modalTemplate() {
      let template = `
      <div class="row bg-secondary m-5">
      <div class="col-9">
        <h5 class="text-right">${this.user}</h5>
        <h3 class="text-center">${this.topic}</h3>
        <img class="center-block" src="${this.imgUrl}" alt="">
        <h5 class="text-center">${this.comments.length} comments</h5>
      </div>
      <div class="col-3">
        <button onclick="app.votesController.postVote('up', ${this.id})">Up Arrow</button>
        <p>${this.voteCount}</p>
        <button onclick="app.votesController.postVote('down', ${this.id})">Down Arrow</button>
      </div>

      `
      template += `
      <div class= "card border-dark rounded">
     `
     this.comments.forEach(comment => template += `
     <h5>${comment}</h5>
     `)

     template += `
     </div>
     `

     template += `
     </div>
     `

      return template
    }
}