$(function(){
	
	let $win = $(window);
	let $body = $('body');
	let $nav = $('#masthead');
	
	let scrollTop = $win.scrollTop();

	
	// function
	function updateNavBg(scrollTop) {
		scrollTop > 0 ? $nav.addClass('normal-style') : $nav.removeClass('normal-style');
	}
	
	function switchNavText() {
		// 简体中文
		if ( $body.hasClass('translatepress-zh_CN') ) {
			$nav.find('a').not('[title="当前语言"]').each(function(){
				if ( $(this).text().trim() ) {
					// console.log( $(this).text(), $(this).attr('title') );
					let en = $(this).text();
					let ch = $(this).attr('title');
					$(this).text(ch);
					$(this).attr('title', en);
				}
			});
			
			$('[title="当前语言"]').find('.trp-ls-language-name').text('简体中文').attr('title', 'Chinese');
		
		// English
		} else if ( $body.hasClass('translatepress-en_US') ) {
			$('.sub-menu').find('.trp-ls-language-name').text('简体中文').attr('title', 'Chinese');
		}
	}
	
	
	// event
	$win.on('scroll', function(){
		scrollTop = $win.scrollTop();
		updateNavBg(scrollTop);
	});
	
	
	// init
	updateNavBg(scrollTop);
	switchNavText();
});
