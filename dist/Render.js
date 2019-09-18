class Renderer {

    renderNews(topNews) {
        let source = $('.trendingNews').html();
        let template = Handlebars.compile(source);
        let innerHTML = template({topNews})
        $('#displayNews').append(innerHTML)
        $(".searchInput").val("")
    }
}