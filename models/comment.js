const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    username: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Comments = mongoose.model('comments', commentSchema)
module.exports = Comments