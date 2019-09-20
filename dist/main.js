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
    if (input) {
        console.log(input)
        let output = await temp.getDataFromResults(input)
        rend.renderSearch(output)
    }
}
loadPage()


$('li').click( async function() {
   let page = $(this).text()
   let newPage = await temp.getDataFromResults(page)
   $('#displayPreferences').empty()
   rend.renderNews(newPage)
})


$("body").on("click", ".bookmark", async function () {
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
    let savedTitle = $(this).closest('div').find('.title').text()
    temp.deleteArticle(savedTitle)
    return temp.getDataFromDB().then((data) => {
        loadPage()
    })
})

