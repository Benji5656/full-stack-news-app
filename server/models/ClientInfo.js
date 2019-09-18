const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientInfo = new Schema({

    NewsResultId: [{ type: Schema.Types.ObjectId, ref: 'News' }],
    KeyWordSearch: [],
    saveLater: [{ type: Schema.Types.ObjectId, ref: 'News' }] //on click
})

const Client = mongoose.model('Client', ClientInfo)

module.exports = Client