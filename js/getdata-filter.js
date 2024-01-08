$(function(){

    // data
    let data_categories = [];
    let data_sources = [];

    // 主流程
    ~async function() {

        // 1. 判斷網頁語系
        let lang_param = await checkLanguage();
        
        // 2. 取得資料
        await getData(lang_param);

        // 3. 建置畫面
        await buildView();

        // 4. 初始化 filter 功能
        await initFilter();

        // 5. 解除 loading 動畫
        await $('#js-filter').removeClass('loading');
    }();


    // 判斷網頁語系
    async function checkLanguage() {
        let flag = $('body').hasClass('translatepress-zh_CN');
        let lang_param = flag ? 'zh-TW,zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7' : 'zh-TW,zh-CN,zh;q=0.7,en-US;q=0.8,en;q=0.9';
        return { 
            'Accept-Language': lang_param,
            'Accept-Charset': 'utf-8'
         };
    }


    // 取得資料?lang=zh_CN
    async function getData(lang_param) {
        // fetch data
        const [response_categories, response_sources] = await Promise.all([
            fetch(`https://oms.synctify.net/api/public/dataSources/categories`, 
                {
                    method: 'GET',
                    headers: lang_param
                }
            ),
            fetch(`https://oms.synctify.net/api/public/dataSources`, 
                {
                    method: 'GET',
                    headers: lang_param
                }
            ),
        ]);
        
        // parse data
        const json_categories = await response_categories.json();
        const json_sources = await response_sources.json();
        
        // get data
        data_categories = await json_categories.data.contents;
        data_sources = await json_sources.data.contents;
    }


    // 建置畫面
    async function buildView() {



        // tab
        for (let item of data_categories) {
            $('#filterChannel').append(`
                <li class="filter-item"><a data-category="${item.id}" class="filter-link" href="javascript://"><i class="${item.icons.tabler}"></i>${item.name}</a></li>
            `);
        }

        // card
        for (let item of data_sources) {
            let isShow = item.availableToConnect ? '' : 'api-hide';

            // tags
            let tags_html = "";
            if ( item.tags.length ) {
                tags_html+=`<ul class="card-tags">`;
                for ( tag of item.tags ) {
                    tags_html+=`<li class="tag-item">${tag}</li>`;
                }
                tags_html+=`</ul>`;
            }

            $('#all-channels').append(`
                <div data-id="${item.id}" data-category="${item.category.id}" class="card channel-card ${isShow}">
                    <div class="card-body">
                        <div class="card-top">
                            <div class="channel-icon">
                                <img src="${item.icon}" alt="Integration Logo - ${item.name}">
                            </div>
                        </div>
                        <div class="card-bottom">
                            <span class="channel-category">${item.category.name}</span>
                            <h5 class="channel-display-name">${item.name}</h5>
                        </div>
                        ${tags_html}
                    </div>
                </div>
            `);
        }
    }


    /*
        filter 功能需求：
            1. 可以使用關鍵字搜尋卡片標題
            2. 匹配不到關鍵字時，顯示 No search results matching the criteria.
            3. 使用側邊的 filter 可以篩選出符合分類名稱的卡片
            4. 每次 filter 後捲軸回到上方
    */
    async function initFilter() {

        let searchBar_h = $('.search-wrap').innerHeight();
        let filter_board_topOffset =  $('#js-filter').offset().top;

        // 1. 關鍵字搜尋卡片標題
        function searchKeyword() {
            let keyword = $("#searchInput").val().toLowerCase();
            let result = 0;
            
            $('.channel-card').not('.category-hide').not('.api-hide').find(".channel-display-name").filter(function() {
                let flag = $(this).text().toLowerCase().indexOf(keyword) > -1;
                if ( flag ) result+=1;
                $(this).parents('.channel-card').toggleClass('keyword-hide', !flag);
            });

            // 2. 匹配不到時，顯示 No search results matching the criteria.
            $('.not-found-result').toggle(!result);
        }

        // 4. 每次 filter 後捲軸回到上方
        function scrollToTop() {
            $('html, body').animate({
                scrollTop: filter_board_topOffset - searchBar_h
            }, 0);
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
            scrollToTop();   // 4. 每次 filter 後捲軸回到上方
        });
    }
});
