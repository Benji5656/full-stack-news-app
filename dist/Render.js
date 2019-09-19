class Renderer {

    renderNews(topNews) {
        let source = $('#trendingNews').html();
        let template = Handlebars.compile(source);
        let innerHTML = template({topNews});
        $('#displayNews').empty().append(innerHTML)
    }

    renderSearch(userSearch) {
        let source = $('#preferences').html();
        let template = Handlebars.compile(source);
        let innerHTML = template({userSearch});
        $('#displayPreferences').empty().append(innerHTML)
        $(".searchInput").val("") 
    }

    renderBookmarked(userSaved) {
        let source = $('#bookmarked').html();
        let template = Handlebars.compile(source);
        let innerHTML = template({userSaved});
        $('#displayBookmarked').empty().append(innerHTML)
    }
}