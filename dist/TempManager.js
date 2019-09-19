class TempManager {
    constructor() {
        this.trendingNews = []
        this.userSearch = []
    }

    async getResultsFromAPI() {
        let results = await $.get('/news')
        this.trendingNews = results
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

    deleteArticle(body) {
        let title = body.title
        $.ajax
    }
}
