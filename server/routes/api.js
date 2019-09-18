const express = require('express')
const router = express.Router()
const News = require('../models/NewsResults')
const Client = require('../models/ClientInfo')
const request = require('request')
const apiKey = '84fbe4414e2c445bbc8fa1036b9ba511'
let topNews
let newsArticle
let articleArray = []
let dummyData = { "status": "ok", "totalResults": 38, "articles": [{ "source": { "id": null, "name": "Bbc.com" }, "author": "https://www.facebook.com/bbcnews", "title": "Robert O'Brien: Trump names new national security adviser - BBC News", "description": "Robert O'Brien is Mr Trump's fourth national security adviser and replaces John Bolton.", "url": "https://www.bbc.com/news/world-us-canada-49744497", "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/17C55/production/_108856379_gettyimages-1158974760.jpg", "publishedAt": "2019-09-18T13:52:30Z", "content": "Image copyrightGetty ImagesImage caption\r\n Robert O'Brien has had a long diplomatic career working for both Republicans and Democrats\r\nUS President Donald Trump has named a new national security adviser to replace John Bolton, who was fired last week.\r\nRobert… [+1552 chars]" }, { "source": { "id": "cnn", "name": "CNN" }, "author": "Kevin Liptak, CNN", "title": "Trump says he's ordering new sanctions on Iran - CNN", "description": "President Donald Trump said Wednesday he's ordered new sanctions on Iran, the latest escalation in tensions between the two countries following the attack over the weekend on Saudi oil facilities.", "url": "https://www.cnn.com/2019/09/18/politics/donald-trump-iran-sanctions-treasury/index.html", "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/190829000340-donald-trump-190815-super-tease.jpg", "publishedAt": "2019-09-18T13:40:00Z", "content": "Washington (CNN)President Donald Trump said Wednesday he's ordered new sanctions on Iran, the latest escalation in tensions between the two countries following the attack over the weekend on Saudi oil facilities.\r\n\"I have just instructed the Secretary of the … [+2678 chars]" }, { "source": { "id": "wired", "name": "Wired" }, "author": "Jeffrey Van Camp", "title": "Sonos Move Review: The King of Wi-Fi Speakers Adds Bluetooth - WIRED", "description": "We took a Sonos speaker on its first trip outside the house, and off of Wi-Fi.", "url": "https://www.wired.com/review/sonos-move/", "urlToImage": "https://media.wired.com/photos/5d81694416adef000889c9eb/191:100/pass/Gear-Sonos_Move_Green-FA.jpg", "publishedAt": "2019-09-18T13:00:00Z", "content": "Sonos is one of the WIRED Gear team's favorite speaker companies. In the splintered buy-it-trash-it world of Wi-Fi connected tech, where nothing seems to connect together properly or last all that long, Sonos speakers always sound outstanding. They are built … [+9370 chars]" }, { "source": { "id": "cnn", "name": "CNN" }, "author": "Emily Dixon, CNN", "title": "American fashion brand sparks outrage over school shooting-themed hoodies - CNN", "description": "American fashion brand Bstroy has received fierce criticism on social media after displaying school shooting-themed hoodies at a show during New York Fashion Week.", "url": "https://www.cnn.com/style/article/bstroy-school-shooting-sweatshirts/index.html", "urlToImage": "http://cdn.cnn.com/cnnnext/dam/assets/190918133126-bstroy-sandy-hook-hoodie-super-tease.jpg", "publishedAt": "2019-09-18T12:54:19Z", "content": "fashionPublished 18th September 2019\r\nAmerican fashion brand Bstroy has received fierce criticism on social media after displaying school shooting-themed hoodies at a show during New York Fashion Week.\r\nThe brand's spring/summer 2020 collection, designed by B… [+1442 chars]" }, { "source": { "id": null, "name": "Nj.com" }, "author": "Matt Gray | For NJ.com", "title": "N.J. Amber Alert update: Mom pleads for abducted 5-year-old girl's safe return as search resumes - NJ.com", "description": "The man who took the Dulce Maria Alavez is described by police as a light-skinned, possibly Hispanic, male, roughly 5-foot-6-inches tall. He led Dulce from a playground to a red van with a sliding side door and tinted windows, police said.", "url": "https://www.nj.com/cumberland/2019/09/nj-amber-alert-update-mom-pleads-for-abducted-5-year-old-girls-safe-return-as-search-resumes.html", "urlToImage": "https://www.nj.com/resizer/YyhTbqfRLx-OIYg33y7iRfFq5tY=/1200x0/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/EHXTOVANEBFL7EA2IVYMVNFI2U.jpg", "publishedAt": "2019-09-18T12:49:00Z", "content": "As the search resumed early Wednesday for a 5-year-old girl authorities now believe was abducted from a New Jersey park on Monday, triggering a statewide Amber Alert, the girls mom issued a plea for the safe return of Dulce Maria Alavez.\r\nNoema Alavez said We… [+4098 chars]" }, { "source": { "id": null, "name": "Marketwatch.com" }, "author": "Sunny Oh", "title": "Fed carries out repo operation for second straight day - MarketWatch", "description": "The New York Fed held an overnight repurchasing operation for the second time this week on Wednesday morning. The U.S. central bank carried out the full $75...", "url": "https://www.marketwatch.com/story/fed-carries-out-repo-operation-for-second-straight-day-2019-09-18", "urlToImage": "https://mw3.wsj.net/mw5/content/logos/mw_logo_social.png", "publishedAt": "2019-09-18T12:39:00Z", "content": "The New York Fed held an overnight repurchasing operation for the second time this week on Wednesday morning. The U.S. central bank carried out the full $75 billion of repos, temporarily buying securities from Wall Street dealers to inject liquidity into the … [+304 chars]" }, { "source": { "id": null, "name": "Bbc.com" }, "author": "https://www.facebook.com/bbcnews", "title": "Israel election: Netanyahu and rival Gantz headed for deadlock - BBC News", "description": "Neither PM Benjamin Netanyahu's party nor that of his main rival has gained enough seats to govern.", "url": "https://www.bbc.com/news/world-middle-east-49740981", "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/11020/production/_108846696_mediaitem108846692.jpg", "publishedAt": "2019-09-18T12:13:47Z", "content": "Image copyrightReutersImage caption\r\n There is no clear route to government for either Benjamin Netanyahu or Benny Gantz\r\nNo clear winner has emerged from Israel's election, leaving a question mark over who will be prime minister, partial official results con… [+4129 chars]" }, { "source": { "id": "the-verge", "name": "The Verge" }, "author": "Casey Newton", "title": "Facebook introduces Portal TV, a video chat camera accessory for your television - The Verge", "description": "Bringing friends and family to the biggest screen in the house", "url": "https://www.theverge.com/2019/9/18/20871173/facebook-portal-camera-price-release-date-availability", "urlToImage": "https://cdn.vox-cdn.com/thumbor/Q0iwuz1vMmpe1mq2PgYNwTCQfaw=/0x127:2000x1174/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/19209344/thumbnail.jpeg", "publishedAt": "2019-09-18T12:00:00Z", "content": "Bringing friends and family to the biggest screen in the house\r\nFacebook is bringing its connected device strategy to the television. The company today announced Portal TV, an accessory that brings the companys wide-angle video chats to the biggest screen in … [+3794 chars]" }, { "source": { "id": null, "name": "Rollingstone.com" }, "author": "Brian Hiatt, Brian Hiatt", "title": "Taylor Swift: The Rolling Stone Interview - Rolling Stone", "description": "In her most in-depth and introspective interview in years, Swift tells all about the rocky road to ‘Lover’ and much, much more", "url": "https://www.rollingstone.com/music/music-features/taylor-swift-rolling-stone-interview-880794/", "urlToImage": "https://www.rollingstone.com/wp-content/uploads/2019/09/R1332_FEA_TaylorSwift_RGB_Orginal-cropped-opener.jpg", "publishedAt": "2019-09-18T12:00:00Z", "content": "Erik Madigan Heck for Rolling Stone\r\nTaylor Swift bursts into her mom’s Nashville kitchen, smiling, looking remarkably like Taylor Swift. (That red-lip, classic thing? Check.) “I need someone to help dye my hair pink,” she says, and moments later, her ends ma… [+40142 chars]" }, { "source": { "id": null, "name": "Livescience.com" }, "author": "Yasemin Saplakoglu", "title": "Universe's Most Massive Neutron Star Spotted. Should It Even Exist? - Livescience.com", "description": "The pulsar is about 2.14 times the mass of our sun packed into a small sphere", "url": "https://www.livescience.com/most-massive-neutron-star-discovered.html", "urlToImage": "https://cdn.mos.cms.futurecdn.net/LHEz6GATgkxNnPd6AVDkxb-1200-80.jpg", "publishedAt": "2019-09-18T11:55:00Z", "content": "A spinning cosmic cadaver is all that's left of a weighty star hovering some 4,600 light-years from Earth after having undergone an explosive death. Now, astronomers have found that this corpse is the most massive neutron star ever discovered. \r\nIn fact, they… [+3965 chars]" }, { "source": { "id": null, "name": "Kcci.com" }, "author": "CNN", "title": "Pandemic could kill up to 80 million people -- and the world isn't ready, experts say - KCCI Des Moines", "description": "The chances of a global pandemic are growing -- and we are all dangerously under prepared, according to the World Health Organization (WHO).", "url": "https://www.kcci.com/article/pandemic-could-kill-up-to-80-million-people-and-the-world-isn-t-ready-experts-say/29101916", "urlToImage": "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/screen-shot-2019-09-18-at-7-45-46-am-1568807159.png?crop=1.00xw:0.941xh;0.00160xw,0.0588xh&resize=1200:*", "publishedAt": "2019-09-18T11:47:00Z", "content": "The chances of a global pandemic are growing -- and we are all dangerously under prepared, according to the World Health Organization (WHO).\r\nIn a report published on Wednesday by a panel of international health experts and officials, they pointed to the 1918… [+3075 chars]" }, { "source": { "id": null, "name": "Macrumors.com" }, "author": "Tim Hardwick", "title": "Apple Watch Series 5 Review Roundup: Always-On Display Solves Biggest Complaint, But Little Else to Warrant... - Mac Rumors", "description": "The Apple Watch Series 5 is set to launch this Friday, September 20, but the embargo for the first reviews of Apple's latest smartwatch ended...", "url": "https://www.macrumors.com/2019/09/18/apple-watch-series-5-review-roundup/", "urlToImage": "https://cdn.macrumors.com/article-new/2019/09/apple-watch-series-5-titanium-no-background.jpg?retina", "publishedAt": "2019-09-18T11:41:00Z", "content": "The Apple Watch Series 5 is set to launch this Friday, September 20, but the embargo for the first reviews of Apple's latest smartwatch ended this morning. Several journalists and media outlets were provided with review units, so we've gathered together some … [+4565 chars]" }, { "source": { "id": "nbc-news", "name": "NBC News" }, "author": "Ben Kesslen, Cristian Santana", "title": "N.Y. judge barred from bench for posting noose image with 'Make America Great Again' caption - NBC News", "description": "A New York judge resigned and banned from office after posting an image to Facebook of a noose with a 'Make America Great Again' caption.", "url": "https://www.nbcnews.com/news/us-news/n-y-judge-barred-bench-posting-noose-image-make-america-n1055736", "urlToImage": "https://media4.s-nbcnews.com/j/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.nbcnews-fp-1200-630.png", "publishedAt": "2019-09-18T11:38:00Z", "content": "A New York municipal judge has resigned and been permanently barred from judicial office after posting an image to Facebook of a noose with a Make America Great Again caption.\r\nKyle Canning, 29, a town court justice in Altona, New York, just south of the Cana… [+2174 chars]" }, { "source": { "id": "reuters", "name": "Reuters" }, "author": "Reuters Editorial", "title": "Apple spars with EU as $14 billion Irish tax dispute drags on - Reuters", "description": "Apple accused the European Commission of misunderstanding its business on day two of the iPhone maker's appeal against a $14 billion tax order, in a dispute that is key to the EU's drive to collect more taxes but which could also run for years.", "url": "https://www.reuters.com/article/us-eu-apple-stateaid-idUSKBN1W31FE", "urlToImage": "https://s3.reutersmedia.net/resources/r/?m=02&d=20190918&t=2&i=1431211818&w=1200&r=LYNXMPEF8H0TM", "publishedAt": "2019-09-18T11:37:00Z", "content": "LUXEMBOURG (Reuters) - Apple accused the European Commission of misunderstanding its business on day two of the iPhone maker’s appeal against a $14 billion tax order, in a dispute that is key to the EU’s drive to collect more taxes but which could also run fo… [+2338 chars]" }, { "source": { "id": null, "name": "Radio.com" }, "author": "https://facebook.com/WEEI", "title": "Welcome to the Red Sox' long, slow, painful 2019 in a nutshell - WEEI", "description": "The night started out with as much of a spring in its step as could be possible considering the circumstances.", "url": "https://weei.radio.com/blogs/rob-bradford/giants-7-red-sox-6-welcome-2019-nutshell", "urlToImage": "https://radioimg.s3.amazonaws.com/weei/s3fs-public/styles/nts_image_tall_hero_1170x415/public/Travisslide.jpg?l7ezHt0GdJ0j0d6sB8o6zKSb83UIji4v&itok=lvUUzOuI", "publishedAt": "2019-09-18T11:07:13Z", "content": "The night started out with as much of a spring in its step as could be possible considering the circumstances.\r\nWith less than two weeks left in both their seasons, the Red Sox and Giants showed up at Fenway Park Tuesday night and participated what was an ent… [+2602 chars]" }, { "source": { "id": "cbs-news", "name": "CBS News" }, "author": "CBS News", "title": "Iran news: Donald Trump mulls response as Saudi Arabia expected to blame Iran for attack on oil facilities today - CBS News", "description": "President must decide whether to strike Iran militarily, as Tehran warns its retaliation would not be \"limited\" to any one nation", "url": "https://www.cbsnews.com/news/iran-news-donald-trump-mulls-response-saudi-arabia-to-blame-iran-attack-oil-facilities-today-2019-09-18/", "urlToImage": "https://cbsnews3.cbsistatic.com/hub/i/r/2019/09/18/0138259b-6d6e-4fcd-9a13-f23f306e0f99/thumbnail/1200x630/cadced314054cfb5f78b4269becccb9a/saudi-arabia-drone-missile-attack.png", "publishedAt": "2019-09-18T11:06:00Z", "content": "Saudi Arabia was expected to directly blame Iran on Wednesday for the raid that heavily damaged two oil facilities in the kingdom over the weekend. Secretary of State Mike Pompeo was on his way to Saudi Arabia to discuss the attack \"and coordinate efforts to … [+4609 chars]" }, { "source": { "id": "the-washington-post", "name": "The Washington Post" }, "author": "Allyson Chiu", "title": "A hiker’s leg ‘clean snapped in half.’ He crawled for two days to survive. - The Washington Post", "description": "“I’m thinking, ‘Only way I’m going to get rescued is self rescue,’” Neil Parker said. “I knew where I was located there was no way they were going to be able to find me.”", "url": "https://www.washingtonpost.com/nation/2019/09/18/neil-parker-australian-hiker-broken-leg-rescue/", "urlToImage": "https://www.washingtonpost.com/resizer/FxnBM1eV0dQZhaSyvMrBKe2vDKc=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/AZ535RWZ4MI6TINFCYVYVHE4UI.jpg", "publishedAt": "2019-09-18T11:04:35Z", "content": "Neil Parker was about 20 feet up a waterfall when suddenly he wasnt climbing anymore. The same rocks he had scaled many times before were no longer supporting his weight. He was falling, tumbling head over heels as he bounced off the rock face.\r\nSeconds later… [+6270 chars]" }, { "source": { "id": null, "name": "Space.com" }, "author": "Mike Wall", "title": "It's Gonna Blow! Giant Volcano on Jupiter Moon Could Erupt Any Day - Space.com", "description": "Loki Patera's dormant time is nearly up, if recent history is any guide.", "url": "https://www.space.com/jupiter-moon-io-volcano-eruption-coming.html", "urlToImage": "https://cdn.mos.cms.futurecdn.net/wfz4m87mApM2h8tgRv5JEF-1200-80.jpg", "publishedAt": "2019-09-18T11:00:00Z", "content": "The biggest volcano on the Jupiter moon Io\r\n should erupt any day now, a new study suggests.\r\nLoki Patera\r\n, a 125-mile-wide (200 kilometers) lava lake on the most volcanically active body in the solar system, has had fairly regular activity over the past few… [+2977 chars]" }, { "source": { "id": null, "name": "Nj.com" }, "author": "Ryan Dunleavy | NJ Advance Media for NJ.com", "title": "Is Giants QB Eli Manning a Hall of Famer? I asked 39 actual voters and results will surprise you - NJ.com", "description": "Eli Manning is a New York Giants legend. Is he a Hall of Fame quarterback? His 116-116 record would be the 3rd-worst record for a Hall of Famer. He also won two Super Bowls by beating New England Patriots' Tom Brady. Is he the next Joe Namath or Jim Plunkett?", "url": "https://www.nj.com/giants/2019/09/is-giants-qb-eli-manning-a-hall-of-famer-or-is-his-record-too-poor-i-asked-39-actual-voters-and-results-will-surprise-you.html", "urlToImage": "https://www.nj.com/resizer/CouiUH4DMmWIznAElAcy5vD-gJw=/1200x0/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/W4C2FKSOLNDCNIPFA4DSLT5WFE.jpg", "publishedAt": "2019-09-18T10:57:00Z", "content": "The Giants closed the book on Eli Mannings days as a starting quarterback and opened the great debate on his career: Has he done enough to get into the Pro Football Hall of Fame?\r\nFans with a No. 10 jersey in their closet and fond memories of his two Super Bo… [+11280 chars]" }, { "source": { "id": null, "name": "Cbs12.com" }, "author": "Gary Detman", "title": "Homeowner kills 3 masked teens during robbery in Georgia - WPEC", "description": "A homeowner in Georgia shot and killed three masked teenagers as they tried to rob him at his home. It happened around 4 a. m. on Monday in Conyers. The Rockdale County Sheriff's Office said two 16-year-old boys and a 15-year-old boy tried to rob three indivi…", "url": "http://cbs12.com/news/local/homeowner-kills-3-masked-teens-during-robbery-in-georgia", "urlToImage": "http://static-25.sinclairstoryline.com/resources/media/84364ca6-65fa-41ea-af5c-01b3f9ba31ee-large16x9_0918_georgia4.JPG?1568803582412", "publishedAt": "2019-09-18T10:48:00Z", "content": null }] }


router.get('/news', function (req, res) {
    country = 'us'
    topNews = JSON.stringify(dummyData)
    topNews = JSON.parse(topNews)


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
        console.log(articleArray)
    })
    res.send(articleArray)
})

router.get('/news/:query', function (req, res) {
    let search = req.params.query
    console.log(search)

    request(`https://newsapi.org/v2/everything?q=${search}&pageSize=5&apiKey=${apiKey}`, function (error, response, body) {
        topNews = JSON.parse(body)
           
            
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
        })
        res.send(articleArray)
    })
})

// router.get('/news/:query', function (req, res) {
//     let country = req.params.query
//     country = 'us'

//     request(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`, function (error, res, body) {
//         topNews = JSON.parse(body)
//         // summary(topNews.articles)
//         // console.log(topNews.articles)
//         // console.log(indx)

//         newsArticle = topNews.articles.forEach(a => {
//             newsArticles = new News({
//                 source: a.source.name,  //location.name
//                 author: a.author,                        // 
//                 title: a.title,
//                 description: a.description,
//                 url: a.url,
//                 urlImage: a.urlToImage,
//                 publishedAt: a.publishedAt
//             })
//             articleArray.push(newsArticles)
//         }); 
//         console.log(articleArray)
//     })
//     res.send(articleArray)

//     // res.send(ncity)
// })  






























module.exports = router