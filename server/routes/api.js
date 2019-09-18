const express = require('express')
const router = express.Router()
const News = require('../models/NewsResults')
const Client = require('../models/ClientInfo')
const request = require('request')
const apiKey = '84fbe4414e2c445bbc8fa1036b9ba511'
let topNews 
let indxArticl
let newsArticle

// let summary = function (articArray) {
//     if (articArray.length >= 2) {
//         indxArticl = 0
        
//     } else{indxArticl=articArray}
    
// }

router.get('/news/:query', function (req, res) {
    let country = req.params.query
    country = 'us'

    request(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`, function (error, res, body) {
        topNews = JSON.parse(body)
        // summary(topNews.articles)
        // console.log(topNews)
        // console.log(indx)

        newsArticle = new News({
            source: topNews.articles[0].source.name,  //location.name
            author: topNews.articles[0].author,                        // 
            title: topNews.articles[0].title,
            description: topNews.articles[0].description,
            url: topNews.articles[0].url,
            urlImage: topNews.articles[0].urlToImage,
            publishedAt: topNews.articles[0].publishedAt
        })
        console.log(newsArticle)
    })
    res.send(newsArticle)

    // res.send(ncity)
})































module.exports = router