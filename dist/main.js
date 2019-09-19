const temp = new TempManager()
const rend = new Renderer()

const loadPage = async function(){
    await temp.getResultsFromAPI()
    rend.renderNews(temp.trendingNews)   
}
loadPage()

const displaySearch = async function() {
    let input = $(".searchInput").val()
    console.log(input)
    let output = await temp.getDataFromResults(input)
    rend.renderSearch(output)
}

$("body").on("click",".bookmark", async function(){
    debugger
    let title = $(this).siblings('.title').text()
    let description = $(this).siblings('.description').text()
    let url = $(this).siblings('.url').text()
    let saved = true;
    let body ={title,description,url,saved}
    let data = await temp.saveUserInterests(body)
    rend.renderSearch(data)
})
