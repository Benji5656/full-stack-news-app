const temp = new TempManager()
const rend = new Renderer()

const loadPage = async function () {
    temp.getDataFromDB().then((data) => {
        rend.renderBookmarked(data)})
    await temp.getResultsFromAPI()
    rend.renderNews(temp.trendingNews)
}

const displaySearch = async function () {
    let input = $(".searchInput").val()
    console.log(input)
    let output = await temp.getDataFromResults(input)
    rend.renderSearch(output)
}

loadPage()




$("body").on("click", ".bookmark", async function () {y
    let title = $(this).siblings('.title').text()
    let description = $(this).siblings('.description').text()
    let url = $(this).siblings('.url').text()
    let saved = true;
    let body = { title, description, url, saved }
    let data = await temp.saveUserInterests(body)
    rend.renderBookmarked(data)
    return loadPage()
    // rend.renderSearch(data)
})

$("body").on("click", ".deleteDB", function () {   // deleteDB
    // let articleUrl = document.querySelector('#displayBookmarked div:nth-child(2) a').href
    let savedTitle = $(this).closest('div').find('p').text()
    temp.deleteArticle(savedTitle)
    return temp.getDataFromDB().then((data) => {
        loadPage()
    })
}
)
// let deleteDB = function () {
//     debugger
//     let articleUrl = $(this).siblings('.url').text()
//     let source = $(this).siblings('.source').text()
//     temp.deleteArticle(articleUrl, source)
//     return manager.getDataFromDB().then((data) => {
//         loadPage()
//     })
    
// }