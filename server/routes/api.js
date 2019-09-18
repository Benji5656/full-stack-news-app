const express = require('express')
const router = express.Router()
const News = require('../models/NewsResults')
const Client = require('../models/ClientInfo')
const request = require('request')
const apiKey = '84fbe4414e2c445bbc8fa1036b9ba511'
let topNews 
let indxArticl
let newsArticle
let articleArray = []

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
        // console.log(topNews.articles)
        // console.log(indx)
        
        newsArticle = topNews.articles.forEach(a => {
            newsArticles = new News({
                source: a.source.name,  //location.name
                author: a.author,                        // 
                title: a.title,
                description: a.description,
                url: a.url,
                urlImage: a.urlToImage,
                publishedAt: a.publishedAt
            })
            articleArray.push(newsArticles)
        }); 
        console.log(articleArray)
    })
    res.send(newsArticle)

    // res.send(ncity)
})































module.exports = router