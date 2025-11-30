<?php
?>

<?php

$block_content = hh_print_publications($attributes);
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
<?php echo wp_kses_post( $block_content ); ?>
</div>
