class TempManager {
    constructor() {
        this.trendingNews = []
    }

    async getResultsFromAPI () {
        let results = await $.get('/news')
        this.trendingNews = results
    }

    async getDataFromResults (query) {
        const topTrending = await $.get(`/news/${query}`)
        this.trendingNews.push(topTrending)
        console.log(topTrending)
        return(topTrending)
    }
}
