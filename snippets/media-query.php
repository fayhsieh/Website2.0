<!-- Generate Mobile Menu Media Query -->

<?php
add_filter( 'generate_mobile_menu_media_query', function() {
	return '(max-width: 1199.98px)';
} );

add_filter( 'generate_not_mobile_menu_media_query', function() {
    return '(min-width: 1200px)';
} );
?>
