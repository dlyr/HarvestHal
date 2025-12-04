<?php

function hh_write_log($data)
{
	if (true === WP_DEBUG) {
		if (is_array($data) || is_object($data)) {
			error_log(print_r($data, true));
		} else {
			error_log($data);
		}
	}
}

function hh_curl_download($Url)
{
	// is cURL installed yet?
	if (!function_exists('curl_init')) {
		die(__('Sorry cURL is not installed!', 'harvest-hal'));
	}

	// OK cool - then let's create a new cURL resource handle
	$ch = curl_init();

	// Now set some options (most are optional)
	// Set URL to download
	curl_setopt($ch, CURLOPT_URL, $Url);
	// Include header in result? (0 = yes, 1 = no)
	curl_setopt($ch, CURLOPT_HEADER, 0);
	// Should cURL return or print out the data? (true = return, false = print)
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// Timeout in seconds
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	// Download the given URL, and return output
	$output = curl_exec($ch);
	// Close the cURL resource, and free system resources
	curl_close($ch);

	return $output;
}

function hh_check_field($array, $field)
{
	return isset($array[$field]) && $array[$field] != '';
}

function hh_image($file, $alt, $class)
{
	$image_url = plugins_url("../public/images/$file", __FILE__);
	return '<img src="' .
		esc_url($image_url) .
		(strlen($class) > 0 ? '" class="' . $class . '"' : '') .
		' alt="' .
		esc_attr($alt) .
		'"/>';
}

function hh_get_publi_thumb($p)
{
	$result = '';
	if (hh_check_field($p, 'thumbId_i')) {
		$result .=
			'<img src="https://thumb.ccsd.cnrs.fr/' .
			$p['thumbId_i'] .
			'/" alt="Publication thumbnail" class="thumbnail"/>';
	} else {
		$result .= hh_image(
			'none.png',
			__('Publication thumbnail', 'harvest_hal'),
			'thumbnail',
		);
	}
	return $result;
}

function hh_get_publi_title($p)
{
	$result = '<span class="hal-id">[' . $p['halId_s'] . ']</span>';

	if (hh_check_field($p, 'title_s')) {
		if (hh_check_field($p, 'uri_s')) {
			$result .=
				'<a href="' . $p['uri_s'] . '">' . $p['title_s'][0] . '</a>';
		} else {
			$result .= $p['title_s'][0];
		}
	}
	return $result;
}
function hh_get_publi_authors($p, $attributes = [])
{
	$authorpage = [];

	if (!empty($attributes['hhAuthorPages'])) {
		foreach ($attributes['hhAuthorPages'] as $entry) {
			if (!empty($entry['idHal']) && !empty($entry['page'])) {
				$authorpage[$entry['idHal']] = $entry['page'];
			}
		}
	}

	$result = '';
	if (hh_check_field($p, 'authFullNameIdHal_fs')) {
		$c = count($p['authFullNameIdHal_fs']);
		$i = 1;
		foreach ($p['authFullNameIdHal_fs'] as $key => $author) {
			$auth = explode('_FacetSep_', $author);
			$name = $auth[0];
			$idHal = 'dummy';
			if (isset($auth[1])) {
				$idHal = $auth[1];
			}

			// get name and add link to author page if needed
			$currentname = $name;
			// add links to authors webpages
			if (isset($idHal) && isset($authorpage[$idHal])) {
				$currentname = "<a href=\"$authorpage[$idHal]\" target=\"_blank\">$currentname</a>";
			}
			$result .= $currentname;
			if ($i++ < $c) {
				$result .= ', ';
			}
		}
		$result .= '.';
		return $result;
	}
}

function hh_get_publi_links($p, $attributes = [])
{
	// --- Helper to build icon links -----------------------------------------
	$icon = function ($file, $alt, $url) {
		return '<a href="' .
			esc_url($url) .
			'" target="_blank">' .
			hh_image($file, $alt, 'link') .
			'</a>';
	};

	$result = '';
	$printed = false;

	// --- Enforced order of link types ---------------------------------------
	$ordered_types = [
		'pdf', // fileMain_s
		'youtube', // seeAlso_s contains youtu
		'github', // seeAlso_s contains github.com
		'gitlab', // seeAlso_s contains gitlab
		'project', // any other seeAlso link
	];

	// --- 1. PDF link ---------------------------------------------------------
	if (hh_check_field($p, 'fileMain_s')) {
		$result .= $icon(
			'PDF_file_icon.svg',
			__('download ', 'harvest-hal') .
				' ' .
				$p['title_s'][0] .
				' ' .
				__('pdf file', 'harvest_hal'),
			$p['fileMain_s'],
		);
		$printed = true;
	}

	// --- 2. Classify seeAlso links by type -----------------------------------
	$links_by_type = [
		'youtube' => [],
		'github' => [],
		'gitlab' => [],
		'project' => [],
	];

	if (hh_check_field($p, 'seeAlso_s')) {
		foreach ($p['seeAlso_s'] as $url) {
			$u = strtolower($url);

			if (strpos($u, 'youtu') !== false) {
				$links_by_type['youtube'][] = $url;
			} elseif (strpos($u, 'github.com') !== false) {
				$links_by_type['github'][] = $url;
			} elseif (strpos($u, 'gitlab') !== false) {
				$links_by_type['gitlab'][] = $url;
			} else {
				$links_by_type['project'][] = $url;
			}
		}
	}

	// --- 3. Render all in the desired order ----------------------------------
	foreach ($ordered_types as $type) {
		if (isset($links_by_type[$type])) {
			foreach ($links_by_type[$type] as $url) {
				if ($printed) {
					$result .= ' ';
				}

				switch ($type) {
					case 'youtube':
						$result .= $icon(
							'YouTube.svg',
							__('YouTube link for', 'harvest-hal') .
								' ' .
								$p['title_s'][0],
							$url,
						);
						break;

					case 'github':
						$result .= $icon(
							'github.svg',
							__('GitHub repository of', 'harvest-hal') .
								' ' .
								$p['title_s'][0],
							$url,
						);
						break;

					case 'gitlab':
						$result .= $icon(
							'gitlab.svg',
							__('GitLab repository of', 'harvest-hal') .
								' ' .
								$p['title_s'][0],
							$url,
						);
						break;

					case 'project':
						// Maybe a project icon someday, add it here.
						$result .=
							'<a href="' .
							esc_url($url) .
							'" target="_blank">project page</a>';
						break;
				}

				$printed = true;
			}
		}
	}

	return $result;
}

function hh_get_publi_infos($p)
{
	$result = '';

	if (hh_check_field($p, 'source_s')) {
		$result .= $p['source_s'];
		$how = 'source_s';
	} elseif (hh_check_field($p, 'journalTitleAbbr_s')) {
		$result .= $p['journalTitleAbbr_s'];
		$how = 'journalTitleAbbr_s';
	} elseif (hh_check_field($p, 'journalTitle_s')) {
		$result .= $p['journalTitle_s'];
		$how = 'journalTitle_s';
	} elseif (hh_check_field($p, 'conferenceTitle_s')) {
		$result .= $p['conferenceTitle_s'];
		$how = 'conferenceTitle_s';
	} elseif (hh_check_field($p, 'bookTitle_s')) {
		$result .= $p['bookTitle_s'];
		$how = 'bookTitle_s';
	} elseif (hh_check_field($p, 'docType_s')) {
		$institution = '';
		if (hh_check_field($p, 'authorityInstitution_s')) {
			$institution = ', ' . $p['authorityInstitution_s'][0];
		}
		switch ($p['docType_s']) {
			case 'HDR':
				$other = __('HDR', 'harvest-hal') . $institution;
				break;
			case 'THESE':
				$other = __('PhD. Thesis', 'harvest-hal') . $institution;
				break;
			case 'REPORT':
				$other = __('Research Report', 'harvest-hal') . $institution;
				break;
			case 'MEM':
				$other = __('Master Thesis', 'harvest-hal') . $institution;
				break;
			case 'POSTER':
				$other = __('Poster', 'harvest-hal');
				break;
		}
		if (isset($other)) {
			$result .= $other;
			$how = 'docType_s';
		}
	}

	$printYear = true;
	if (isset($how)) {
		if (!(strpos($p[$how], strval($p['producedDateY_i'])) === false)) {
			$printYear = false;
		}
	}
	if ($printYear) {
		if (isset($how)) {
			$result .= ', ';
		}
		$result .= $p['producedDateY_i'];
	}

	if (hh_check_field($p, 'comment_s')) {
		$result .= '.  <span class="note">' . $p['comment_s'] . '</span>';
	}

	return $result;
}

function hh_print_publi($p, $attributes = [])
{
	$result = '';
	$result .= '<div class="wp-block-columns is-layout-flex">';

	if (
		isset($attributes['hhEnabledFields']) &&
		in_array('thumbId_i', $attributes['hhEnabledFields'])
	) {
		$result .= '<div class="wp-block-column is-layout-flow thumbnail">';

		$result .= '<figure class="wp-block-image size-full thumbnail">';
		$result .= hh_get_publi_thumb($p);
		$result .= '</figure></div>';
	}

	$result .=
		'<div class="wp-block-column is-content-justification-left is-layout-constrained publication-column">';
	$result .=
		'<div class="wp-block-group is-vertical is-content-justification-left is-layout-flex publication-group">';
	$result .= '<p class="title">' . hh_get_publi_title($p) . '</p>';
	$result .=
		'<p class="authors">' . hh_get_publi_authors($p, $attributes) . '</p>';
	$result .= '<p class="infos">' . hh_get_publi_infos($p) . '</p>';
	$result .= '<p class="links">' . hh_get_publi_links($p) . '</p>';
	$result .= '</div></div></div>';
	return $result;
}

function hh_download_json($attributes)
{
	$query = '*';
	if (isset($attributes['hhQuery'])) {
		$query = $attributes['hhQuery'];
	}

	$fl = '';
	$fl .= 'halId_s,';
	$fl .= 'docType_s,';
	$fl .= 'producedDate_tdate,';
	$fl .= 'producedDateY_i,';

	if (isset($attributes['hhEnabledFields'])) {
		$fl .= implode(',', $attributes['hhEnabledFields']);
	}

	$q = urlencode($query);

	$url =
		'https://api.archives-ouvertes.fr/search/?q=' .
		$q .
		'&wt=json&fl=' .
		$fl .
		'&sort=producedDate_tdate%20desc&rows=1000';
	$json = hh_curl_download($url);
	$publis = json_decode($json, true)['response']['docs'];
	return $publis;
}

function hh_filter($publis, $attributes)
{
	$skip = isset($attributes['hhHalIdsToSkip'])
		? $attributes['hhHalIdsToSkip']
		: [];

	return array_filter($publis, function ($item) use ($skip) {
		hh_write_log($item['halId_s']);
		if (!in_array($item['halId_s'], $skip)) {
			hh_write_log('keep');
		} else {
			hh_write_log('skip');
		}
		return !in_array($item['halId_s'], $skip);
	});
}

function hh_print_publications($attributes)
{
	$publis = array_values(
		hh_filter(hh_download_json($attributes), $attributes),
	);
	hh_write_log($publis);
	$result = '';

	if (isset($publis[0]) && isset($publis[0]['producedDateY_i'])) {
		$year = $publis[0]['producedDateY_i'];

		$result .= '<h2>' . $year . '</h2>';

		foreach ($publis as $p) {
			if ($year != $p['producedDateY_i']) {
				$year = $p['producedDateY_i'];
				$result .= '<h2>' . $year . '</h2>';
			}
			$result .= hh_print_publi($p, $attributes);
		}
	}
	return $result;
}

function hh_render_publications_block($attributes, $block = true)
{
	// Generate the publication list
	$content = hh_print_publications($attributes);

	// Custom CSS injection
	$css = '';
	if (!empty($attributes['hhCustomCss'])) {
		$css =
			'<style> .wp-block-dlyr-hal-publications { ' .
			$attributes['hhCustomCss'] .
			' }</style>';
	}

	return '<div ' .
		($block
			? get_block_wrapper_attributes()
			: 'class="wp-block-dlyr-hal-publications"') .
		'>' .
		$css .
		' ' .
		$content .
		'</div>';
}
