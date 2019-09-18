const express = require('express')
const router = express.Router()
// const News = require('../models/NewsResults')
const request = require('request')
const apiKey = '84fbe4414e2c445bbc8fa1036b9ba511'
let topNews 
let indxArticl

// let summary = function (articArray) {
//     if (articArray.length >= 2) {
//         indxArticl = 0
        
//     } else{indxArticl=articArray}
    
// }

router.get('/news/:qry', function (req, res) {
    let country = req.params.qry
    country = 'us'

    request(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`, function (error, res, body) {
        topNews = JSON.parse(body)
        // summary(topNews.articles)
        console.log(topNews)
        // console.log(indx)

        // newsArticle = new NewsResult({
        //     source: reqInfo.articles[indxArticl].source.name,  //location.name
        //     author: reqInfo.articles[indxArticl].author,                        // 
        //     title: reqInfo.articles[indxArticl].title,
        //     description: reqInfo.articles[indxArticl].description,
        //     url: reqInfo.articles[indxArticl].url,
        //     urlImage: reqInfo.articles[indxArticl].urlToImage,
        //     publishedAt: reqInfo.articles[indxArticl].publishedAt
        // })
    })

    res.send(topNews)
    // res.send(ncity)
})































module.exports = router