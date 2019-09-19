class TempManager {
    constructor() {
        this.trendingNews = []
        this.userSearch = []
        this.savedArticles = []
    }

    async getResultsFromAPI() {
        let results = await $.get('/news')
        this.trendingNews = results
    }


    getDataFromDB() {
        $.get('/articles').then((result) => { this.savedArticles = result })
        return $.get('/articles')
    }

    async getDataFromResults(query) {
        const userRequest = await $.get(`/news/${query}`)
        this.userSearch.push(userRequest)
        console.log(userRequest)
        return (userRequest)
    }


    saveUserInterests(body) {
        $.ajax({
            url: ('/news'),
            data: body,
            method: 'POST',
            success: function () {
                console.log("added to DB")
            }
        })
    }

    deleteArticle(titleDel) {

        $.ajax({
            url: '/news/'+titleDel,
            method: "DELETE",
            success: function () {
                console.log("Succesful delete article")
            }
        })
    }
}
