export default class Post {
    constructor(data) {
        this.topic = data.topic
        this.imgUrl = data.imgUrl
        this.content = data.content
        this.comments = data.comments || []
        this.voteCount = data.voteCount || 0
        this.id = data.id || data._id
        this.user = data.user || "No User"
    }

    // get Template() {
    //     return this.title
    // }
}