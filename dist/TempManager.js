class TempManager {
    constructor() {
        this.trendingNews = []
        this.userSearch = []
    }

    async getResultsFromAPI () {
        let results = await $.get('/news')
        this.trendingNews = results
    }
    

    async getDataFromResults (query) {
        const userRequest = await $.get(`/news/${query}`)
        this.userSearch.push(userRequest)
        console.log(userRequest)
        return(userRequest)
    }
}
