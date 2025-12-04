<?php
/**
 * Plugin Name:       hal-publications
 * Description:       Query https://api.archives-ouvertes.fr/ and desplay the result
 * Version: 0.1.4
 * Requires at least: 6.2.6
 * Requires PHP:      7.4
 * Author:            David Vanderhaeghe
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       harvest-hal
 */

if (!defined('ABSPATH')) {
	exit(); // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function hh_hal_block_init()
{
	register_block_type(__DIR__ . '/build');
}

add_action('init', 'hh_hal_block_init');

require_once plugin_dir_path(__FILE__) . 'includes/hh.php';

function hh_render_publications_shortcode($atts = [], $content = null)
{
	$atts = array_change_key_case((array) $atts, CASE_LOWER);

	wp_enqueue_style(
		'hh-shortcode-style',
		plugins_url('build/style-index.css', __FILE__),
	);
	$hh_atts = shortcode_atts(
		[
			'query' => '',
			'fields' =>
				'source_s,description_s,authorityInstitution_s,bookTitle_s,page_s,title_s,journalTitle_s,conferenceTitle_s,fileMain_s,authFullNameIdHal_fs,uri_s,thumbId_i,comment_s,fileAnnexes_s,seeAlso_s',
			'css' => '',
			'authorpages' => '',
			'filter' => '',
		],
		$atts,
		'dlyr-hal-publications',
	);

	$attributes = [
		'hhQuery' => $hh_atts['query'],
		'hhEnabledFields' => explode(',', $hh_atts['fields']),
		'hhCustomCss' => $hh_atts['css'],
		'hhAuthorPages' => [],
	];

	if (hh_check_field($hh_atts, 'filter')) {
		hh_write_log(is_array($hh_atts['filter']));
		$attributes['hhHalIdsToSkip'] = array_map(
			'trim',
			explode(',', $hh_atts['filter']),
		);
	}

	if (hh_check_field($hh_atts, 'authorpages')) {
		$pages = array_map('trim', explode(',', $hh_atts['authorpages']));
		foreach ($pages as $auth_page) {
			$pp = explode('=', $auth_page);
			if (count($pp) == 2) {
				$auth = $pp[0];
				$page = $pp[1];
				$attributes['hhAuthorPages'][] = [
					'idHal' => $auth,
					'page' => filter_var($page, FILTER_VALIDATE_URL),
				];
			}
		}
	}

	return hh_render_publications_block($attributes, false);
}

add_shortcode('dlyr-hal-publications', 'hh_render_publications_shortcode');
