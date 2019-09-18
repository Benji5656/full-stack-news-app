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
})


const ClientInfo = new Schema({

    NewsResultId: [{ type: Schema.Types.ObjectId, ref: 'News' }],
    KeyWordSearch: [],
    saveLater: [{ type: Schema.Types.ObjectId, ref: 'News' }] //on click
})

const News = mongoose.model('News', NewsResult)
const Client = mongoose.model('Client', ClientInfo)


module.exports = {
    News,
    Client
}