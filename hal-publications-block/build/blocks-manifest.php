<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dlyr/hal-publications',
		'version' => '0.1.0',
		'title' => 'Hal Publications',
		'category' => 'widgets',
		'description' => 'Query https://api.archives-ouvertes.fr/ and display the result',
		'example' => array(
			
		),
		'attributes' => array(
			'hh_query' => array(
				'type' => 'string'
			),
			'hh_author_pages' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'items' => array(
					'type' => 'object',
					'properties' => array(
						'idHal' => array(
							'type' => 'string'
						),
						'page' => array(
							'type' => 'string'
						)
					)
				)
			),
			'hh_hal_ids_to_skip' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'hh_custom_css' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'color' => array(
				'background' => false,
				'text' => true
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true
			)
		),
		'textdomain' => 'harvest-hal',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css',
		'editorStyle' => 'file:./index.css'
	)
);
