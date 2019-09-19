const mongoose = require('mongoose')
const Schema = mongoose.Schema


const NewsResult = new Schema({
    source: String,
    author: String,
    title: String,
    description: String,
    url: String,
    urlImage: String,
    publishedAt: String,
    saved: Boolean,
    
})



const News = mongoose.model('News', NewsResult)

module.exports = News
