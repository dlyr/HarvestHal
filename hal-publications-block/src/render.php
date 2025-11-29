<?php
?>

<?php
$query='';
if ( isset( $attributes['hh_query'] ) ){
  // The current year is the same as the fallback, so use the block content saved in the database (by the save.js function).
  $query = $attributes['hh_query'];
}


$block_content = hh_print_publications($query);

echo wp_kses_post( $block_content );
