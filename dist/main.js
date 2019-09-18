const temp = new TempManager()
const rend = new Renderer()

const loadPage = async function(){
    await temp.getResultsfromAPI()
    rend.renderNews(temp.trendingNews)   
}
loadPage()

let displaySearch =  async function() {
    let input = $("searchInput").val()
    let output = await temp.getDataFromResults(input)
    output = [output]
    rend.renderNews(output)
    console.log(input)
}