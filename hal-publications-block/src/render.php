<?php

$block_content = hh_print_publications();

echo wp_kses_post( $block_content );
