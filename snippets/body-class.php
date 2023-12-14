<!-- Add the Page Slug to Body Class -->

<?php
function wpcode_snippet_add_slug_body_class( $classes ) {
	global $post;
	if ( isset( $post ) ) {
		$classes[] = $post->post_type . '-' . $post->post_name;
	}

	return $classes;
}

add_filter( 'body_class', 'wpcode_snippet_add_slug_body_class' );
?>
