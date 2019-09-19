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

    /*
    saveUserInterests(userRequest) {
        this.userSearch.forEach((s) => {
            if(s.title === userRequest) {
                $.ajax ({
                    url: ('/news'),
                    data: s,
                    method: 'POST',
                    success: function() {
                        console.log("added to DB")
                    }
                })
            }
        })
    }
    */ 


}
