<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dlyr/hal-publications',
		'version' => '0.1.1',
		'title' => 'Hal Publications',
		'category' => 'widgets',
		'description' => 'Query https://api.archives-ouvertes.fr/ and display the result',
		'example' => array(
			
		),
		'attributes' => array(
			'hhQuery' => array(
				'type' => 'string'
			),
			'hhAuthorPages' => array(
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
			'hhHalIdsToSkip' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'hhCustomCss' => array(
				'type' => 'string',
				'default' => ''
			),
			'hhEnabledFields' => array(
				'type' => 'array',
				'default' => array(
					'title_s',
					'uri_s',
					'source_s',
					'bookTitle_s',
					'journalTitle_s',
					'conferenceTitle_s',
					'producedDate_tdate',
					'producedDateY_i',
					'authorityInstitution_s',
					'authFullNameIdHal_fs',
					'comment_s',
					'thumbId_i',
					'fileMain_s',
					'seeAlso_s'
				)
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
