<?php
/**
 * Plugin Name:       hal-publications

 * Description:       Query https://api.archives-ouvertes.fr/ and desplay the result
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            David Vanderhaeghe
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       harvest-hal
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function hh_hal_block_init() {
  register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'hh_hal_block_init' );

function hh_write_log( $data ) {
  if ( true === WP_DEBUG ) {
    if ( is_array( $data ) || is_object( $data ) ) {
      error_log( print_r( $data, true ) );
    } else {
      error_log( $data );
    }
  }
}

function hh_curl_download($Url){
  // is cURL installed yet?
  if (!function_exists('curl_init')){
    die('Sorry cURL is not installed!');
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

function hh_check_field($array, $field){
  return(isset($array[$field])&&$array[$field]!="");
}

function hh_get_publi_thumb($p){
  $result="";
  if(hh_check_field($p,"thumbId_i")) {
    $result .= '<img src="https://thumb.ccsd.cnrs.fr/'.$p["thumbId_i"].'/" alt="publication icone"/>';}
  else {$result .= '<img src="http://www.dlyr.fr/stuff/data/dummy.jpg" alt="publication icone"/>';}
  return $result;
}

function hh_get_publi_title($p){

  $result ='';
  $result .='<span class="hal-id">[' .$p["halId_s"].']</span>';
  if($p["uri_s"] != "") $result .= '<a href="'.$p["uri_s"].'">'.$p["title_s"][0].'</a>';
  else $result .= $p["title_s"][0];
  return $result;
}

function hh_get_publi_authors($p, $attributes=[]){
  $authorpage=[];

  if ( ! empty( $attributes['hh_author_pages'] ) ) {
    foreach ( $attributes['hh_author_pages'] as $entry ) {
      if ( ! empty( $entry['idHal'] ) && ! empty( $entry['page'] ) ) {
        $authorpage[ $entry['idHal'] ] = $entry['page'];
      }
    }
  }

  $result ='';
  $c = count($p["authFullNameIdHal_fs"]);
  $i = 1;
  foreach ($p["authFullNameIdHal_fs"] as $key=>$author){

    $auth = explode("_FacetSep_", $author);
    $name = $auth[0];
    $idHal = "dummy";
    if(isset($auth[1])) $idHal = $auth[1];
    
    // get name and add link to author page if needed
    $currentname = $name;
    // add links to authors webpages
    if(isset($idHal) && isset($authorpage[$idHal]))
      $currentname = "<a href=\"$authorpage[$idHal]\" target=\"_blank\">$currentname</a>";
    $result .=  $currentname;
    if($i++ < $c) $result .= ", ";
  }
  return $result;
}


function hh_get_publi_links($p, $attributes = []) {

  // --- Helper to build icon links -----------------------------------------
  $icon = function( $file, $alt, $url ) {
    $image_url = plugins_url( "assets/$file", __FILE__ );
    return '<a href="' . esc_url($url) . '" target="_blank">'
         . '<img src="' . esc_url($image_url) . '" height="24" style="vertical-align:middle" alt="' . esc_attr($alt) . '"/>'
         . '</a>';
  };

  $result  = "";
  $printed = false;

  // --- Enforced order of link types ---------------------------------------
  $ordered_types = [
    'pdf',       // fileMain_s
    'youtube',   // seeAlso_s contains youtu
    'github',    // seeAlso_s contains github.com
    'gitlab',    // seeAlso_s contains gitlab
    'project',   // any other seeAlso link
  ];

  // --- 1. PDF link ---------------------------------------------------------
  if (hh_check_field($p, "fileMain_s")) {
    $result .= $icon('PDF_file_icon.svg', 'download '. $p["title_s"][0] . ' pdf file', $p["fileMain_s"]);
    $printed = true;
  }

  // --- 2. Classify seeAlso links by type -----------------------------------
  $links_by_type = [
    'youtube' => [],
    'github'  => [],
    'gitlab'  => [],
    'project' => [],
  ];

  if (hh_check_field($p, "seeAlso_s")) {
    foreach ($p["seeAlso_s"] as $url) {

      $u = strtolower($url);

      if (strpos($u, "youtu") !== false) {
        $links_by_type['youtube'][] = $url;
      }
      elseif (strpos($u, "github.com") !== false) {
        $links_by_type['github'][] = $url;
      }
      elseif (strpos($u, "gitlab") !== false) {
        $links_by_type['gitlab'][] = $url;
      }
      else {
        $links_by_type['project'][] = $url;
      }
    }
  }

  // --- 3. Render all in the desired order ----------------------------------
  foreach ($ordered_types as $type) {
    if(isset ($links_by_type[$type])){
      foreach ($links_by_type[$type] as $url) {

        if ($printed) {
          $result .= " ";
        }

        switch ($type) {
          case 'youtube':
            $result .= $icon('YouTube.svg', 'YouTube link for ' . $p["title_s"][0], $url);
            break;

          case 'github':
            $result .= $icon('github.svg', 'GitHub repository of ' . $p["title_s"][0], $url);
            break;

          case 'gitlab':
            $result .= $icon('gitlab.svg', 'GitLab repository of ' . $p["title_s"][0], $url);
            break;

          case 'project':
            // Maybe a project icon someday, add it here.
            $result .= '<a href="' . esc_url($url) . '" target="_blank">project page</a>';
            break;
        }

        $printed = true;
    }}
  }

  return $result;
}


function hh_get_publi_infos($p){
  $result ="";


  if(hh_check_field($p,"source_s")){ $result .= $p["source_s"];
    $how = "source_s";
  }
  else if(hh_check_field($p,"journalTitleAbbr_s")){ $result .= $p["journalTitleAbbr_s"];
    $how = "journalTitleAbbr_s";
  }
  else if(hh_check_field($p,"journalTitle_s")) {$result .= $p["journalTitle_s"];
    $how = "journalTitle_s";
  }
  else if(hh_check_field($p,"conferenceTitle_s")) {$result .= $p["conferenceTitle_s"];
    $how = "conferenceTitle_s";
  }
  else if(hh_check_field($p,"bookTitle_s")) {$result .= $p["bookTitle_s"];
    $how = "bookTitle_s";
  }
  else if(hh_check_field($p,"docType_s")){
    if($p["docType_s"] === "HDR"){ $result .= "HDR, " . $p["authorityInstitution_s"][0]; 	$how= "docType_s"; }
    if($p["docType_s"] === "THESE"){ $result .= "PhD. Thesis, " . $p["authorityInstitution_s"][0]; 	$how= "docType_s"; }
    if($p["docType_s"] === "REPORT"){ $result .= "Research Report, " . $p["authorityInstitution_s"][0];	$how= "docType_s"; }
    if($p["docType_s"] === "MEM"){ $result .= "Master Thesis, " . $p["authorityInstitution_s"][0];	$how="docType_s"; }   
    if($p["docType_s"] === "POSTER"){ $result .= "Poster" . $how= "docType_s"; }    
  }

  $printYear = true;
  if(isset($how)){
    if(!(strpos($p[$how], strval($p["producedDateY_i"]))===false)) $printYear = false;
  }
  if($printYear) {
    if(isset($how)) $result .= ", ";
    $result .= $p["producedDateY_i"];
  }

  if(hh_check_field($p, "comment_s")){
    $result .= '.  <span class="note">'.$p["comment_s"].'</span>';
  }
  //  if(hh_check_field($p, "description_s")){
  //    $result .= '.  <span class="note">'.$p["description_s"].'</span>';
  //  }

  return $result;

}

function hh_print_publi($p, $attributes=[]){	
  $result="";
  $result .= '<div class="wp-block-columns is-layout-flex">';

  $result .= '<div class="wp-block-column is-layout-flow" style="flex-basis:126px;flex-grow: 0;">';
  $result .= '<figure class="wp-block-image size-full" style="text-align: center;max-width: 126px;max-height:96px;margin-left: auto !important;margin-right: auto !important;">';
  $result .= hh_get_publi_thumb($p);
  $result .= '</figure></div>';
  $result .= '<div class="wp-block-column is-content-justification-left is-layout-constrained" style="flex-basis: 0;flex-grow: 1;">';
  $result .= '<div class="wp-block-group is-vertical is-content-justification-left is-layout-flex" style="flex-direction: column; align-items: flex-start; gap:2px;"><p class="title">';
  $result .= hh_get_publi_title($p);
  $result .= '</p><p class="authors">';
  $result .= hh_get_publi_authors($p, $attributes);
  $result .= '</p><p class="infos">';
  $result .= hh_get_publi_infos($p);
  $result .= '</p><p class="links">';
  $result .= hh_get_publi_links($p);
  $result .= '</p></div></div></div>';
  return $result;

}

function hh_download_json($query){
  $fl="halId_s,source_s,description_s,authorityInstitution_s,bookTitle_s,page_s,title_s,authFullName_s,docType_s,journalTitle_s,conferenceTitle_s,fileMain_s,uri_s,authFullNameIdHal_fs,thumbId_i,producedDate_tdate,producedDateY_i,comment_s,seeAlso_s";

  $q=urlencode('authIdHal_s:("vdh"OR"nicolas-mellado"OR"mathias-paulin"OR"loic-barthe"OR"megane-bati") OR structId_i:(1001793 OR 1612886)');
  if(!empty($query)){
    $q = urlencode($query);
  }
  
  $url = "https://api.archives-ouvertes.fr/search/?q=".$q."&wt=json&fl=".$fl."&sort=producedDate_tdate%20desc&rows=1000";  
  $json = hh_curl_download($url );
  hh_write_log($url);
  $publis = json_decode($json, true)["response"]["docs"];
  return $publis;
}

function hh_filter_hal_ids($var, $hh_hal_ids_to_skip){
  return !in_array($var["halId_s"], $hh_hal_ids_to_skip);
}

function hh_filter( $publis, $attributes ){
  $skip = isset($attributes["hh_hal_ids_to_skip"])
  ? $attributes["hh_hal_ids_to_skip"]
        : [];

  return array_filter($publis, function($item) use ($skip) {
    return hh_filter_hal_ids($item, $skip);
  });
}

function hh_print_publications($attributes){

  $query='';
  if ( isset( $attributes['hh_query'] ) ){
    $query = $attributes['hh_query'];
  }
  
  $publis = hh_filter(hh_download_json($query), $attributes);
  $year = $publis[0]["producedDateY_i"];
  $result='';

  $result .= '<h2>'.$year.'</h2>';

  foreach($publis as $p){
    if($year != $p["producedDateY_i"]){
      $year = $p["producedDateY_i"];	
      $result.= '<h2>'.$year.'</h2>';
    }
    $result .= hh_print_publi($p, $attributes);
  }
  return $result;
}


function hh_render_publications_block( $attributes ) {

    // Generate the publication list
    $content = hh_print_publications( $attributes );

    // Custom CSS injection
    $css = '';
    if ( ! empty( $attributes['hh_custom_css'] ) ) {
        $css = '<style>
            .wp-block-dlyr-hal-publications {
                ' . $attributes['hh_custom_css'] . '
            }
        </style>';
    }

    return '<div '. get_block_wrapper_attributes() . '>
            ' . $css . '
            ' . $content . '
        </div>';
}
