$(function(){
    /*
        需求：
        1. 可以使用關鍵字搜尋卡片標題
        2. 匹配不到關鍵字時，顯示 No search results matching the criteria.
        3. 使用側邊的 filter 可以篩選出符合分類名稱的卡片
    */

    // 1. 關鍵字搜尋卡片標題
    function searchKeyword() {
        let keyword = $("#searchInput").val().toLowerCase();
        let result = 0;
        
        $('.channel-card').not('.category-hide').find(".channel-display-name").filter(function() {
            let flag = $(this).text().toLowerCase().indexOf(keyword) > -1;
            if ( flag ) result+=1;
            $(this).parents('.channel-card').toggleClass('keyword-hide', !flag);
        });

        // 2. 匹配不到時，顯示 No search results matching the criteria.
        $('.not-found-result').toggle(!result);
    }

    $("#searchInput").on("keyup", function() {
        searchKeyword(); // 1. 關鍵字搜尋卡片標題
    });

    // 3. 使用側邊的 filter 可以篩選出符合分類名稱的卡片
    $('#filterChannel').on('click', '.filter-link', function(){
        $('#filterChannel').find('.filter-link').removeClass('active');
        $(this).addClass('active');

        let category = $(this).attr('data-category');
        let result = 0;

        $(".channel-card").filter(function() {
            let flag = category ? category != $(this).attr('data-category') : false;
            if ( !flag ) result+=1;
            $(this).toggleClass('category-hide', flag);
        });

        searchKeyword(); // 1. 關鍵字搜尋卡片標題
    });
});
