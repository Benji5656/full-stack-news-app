const temp = new TempManager()
const rend = new Renderer()

const loadPage = async function(){
    await temp.getResultsFromAPI()
    rend.renderNews(temp.trendingNews)   
}
loadPage()

const displaySearch = function() {
    let input = $("#searchInput").val()
    console.log(input)
    // let output = await temp.getDataFromResults(input)
    // output = [output]
    // rend.renderNews(output)
}