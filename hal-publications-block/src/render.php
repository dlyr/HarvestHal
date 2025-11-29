<?php
?>

<?php
$query='';
if ( isset( $attributes['hh_query'] ) ){
  $query = $attributes['hh_query'];
}

$block_content = hh_print_publications($query);
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
<?php echo wp_kses_post( $block_content ); ?>
</div>
