const express = require('express')
const router = express.Router()
const News = require('../models/NewsResults')
const Client = require('../models/ClientInfo')
const request = require('request')
const moment = require('moment')

const apiKey = '84fbe4414e2c445bbc8fa1036b9ba511'
let articleArray = []
let newsArticle
// let dummyData = { "status": "ok", "totalResults": 38, "articles": [{ "source": { "id": null, "name": "Bbc.com" }, "author": "https://www.facebook.com/bbcnews", "title": "Robert O'Brien: Trump names new national security adviser - BBC News", "description": "Robert O'Brien is Mr Trump's fourth national security adviser and replaces John Bolton.", "url": "https://www.bbc.com/news/world-us-canada-49744497", "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/17C55/production/_108856379_gettyimages-1158974760.jpg", "publishedAt": "2019-09-18T13:52:30Z", "content": "Image copyrightGetty ImagesImage caption\r\n Robert O'Brien has had a long diplomatic career working for both Republicans and Democrats\r\nUS President Donald Trump has named a new national security adviser to replace John Bolton, who was fired last week.\r\nRobert… [+1552 chars]" }, { "source": { "id": "cnn", "name": "CNN" }, "author": "Kevin Liptak, CNN", "title": "Trump says he's ordering new sanctions on Iran - CNN", "description": "President Donald Trump said Wednesday he's ordered new sanctions on Iran, the latest escalation in tensions between the two countries following the attack over the weekend on Saudi oil facilities.", "url": "https://www.cnn.com/2019/09/18/politics/donald-trump-iran-sanctions-treasury/index.html", "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/190829000340-donald-trump-190815-super-tease.jpg", "publishedAt": "2019-09-18T13:40:00Z", "content": "Washington (CNN)President Donald Trump said Wednesday he's ordered new sanctions on Iran, the latest escalation in tensions between the two countries following the attack over the weekend on Saudi oil facilities.\r\n\"I have just instructed the Secretary of the … [+2678 chars]" }] }


router.get('/news', function (req, res) {
    country = 'us' //change api link to not have country as paramater
    let d = new Date()
    d.setDate(d.getDate() - 3)
    d = moment().toISOString();
    d = moment().format('YYYY-MM-DD')

    request(`https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${apiKey}`, function (error, response, body) {
        searchNews = JSON.parse(body)
        console.log(searchNews)
        articleArray = []
        // console.log(searchNews)
        newsArticle = searchNews.articles.forEach(a => {
            newsArticles = new News({
                source: a.source.name,  //location.name
                author: a.author,
                title: a.title,
                description: a.description,
                url: a.url,
                urlImage: a.urlToImage,
                publishedAt: a.publishedAt
            })
            articleArray.push(newsArticles)
            //console.log(articleArray)
        })
        res.send(articleArray)
    })
})

router.get('/news/:query', function (req, res) {
    let search = req.params.query
    // console.log(search)
    let searchArray = []                            //may want to use globally later

    request(`https://newsapi.org/v2/everything?q=${search}&pageSize=6&apiKey=${apiKey}`, function (error, response, body) {
        userSearches = JSON.parse(body)
        newsArticle = userSearches.articles.forEach(a => {
            searchedArticles = new News({
                source: a.source.name,
                author: a.author,
                title: a.title,
                description: a.description,
                url: a.url,
                urlImage: a.urlToImage,
                publishedAt: a.publishedAt
            })
            searchArray.push(searchedArticles)
            // console.log(searchArray)
        })
        res.send(searchArray)
    })
})

router.get('/articles', function (req, res) {
    News.find({}, function (err, results) {
        // console.log(results)
        res.send(results)
    })

})

router.post('/news', function (req, res) {

    console.log(req.body)
    const saveNews = new News(req.body)
    saveNews.save(function (err, result) {
        News.find({}, function (error, search) {
            res.send(search)
        })
    })
})



router.delete('/news/:newstitle', function (req, res) {
    let newsHead = req.params.newstitle

    News.findOne({ title: newsHead }, function (err, reply) {

        reply.remove()
        News.find({}, function (err, response) {
            res.send(response)
        })
    })
})

module.exports = router