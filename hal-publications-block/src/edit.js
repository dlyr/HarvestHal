/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import {
	PanelBody,
	CheckboxControl,
	TextControl,
	TextareaControl,
	Flex,
	FlexBlock,
	FlexItem,
	Button,
	Icon,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

const ALL_FIELDS = [
	{ key: 'title_s', label: 'Title' },
	{ key: 'uri_s', label: 'URL' },
	{ key: 'source_s', label: 'Source' },
	{ key: 'bookTitle_s', label: 'Book Title' },
	{ key: 'journalTitle_s', label: 'Journal Title' },
	{ key: 'conferenceTitle_s', label: 'Conference Title' },
	{
		key: 'authorityInstitution_s',
		label: 'Institution (for thesis and report)',
	},
	{ key: 'authFullNameIdHal_fs', label: 'Authors' },
	{ key: 'comment_s', label: 'Comment' },
	{ key: 'thumbId_i', label: 'Thumbnail' },
	{ key: 'fileMain_s', label: 'Main File' },
	{ key: 'seeAlso_s', label: 'See Also' },
];

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	const {
		hhQuery,
		hhAuthorPages = [],
		hhHalIdsToSkip,
		hhCustomCss,
		hhEnabledFields,
	} = attributes;

	// Add a new empty pair
	const addAuthorPage = () => {
		const next = [ ...hhAuthorPages, { idHal: '', page: '' } ];
		setAttributes( { hhAuthorPages: next } );
	};

	// Update a pair
	const updateAuthorPage = ( index, field, value ) => {
		const next = hhAuthorPages.map( ( item, i ) => {
			if ( i !== index ) {
				return item;
			}
			return { ...item, [ field ]: value };
		} );
		setAttributes( { hhAuthorPages: next } );
	};

	// Remove a pair
	const removeAuthorPage = ( index ) => {
		const next = hhAuthorPages.filter( ( _, i ) => i !== index );
		setAttributes( { hhAuthorPages: next } );
	};

	const addSkipId = () => {
		setAttributes( {
			hhHalIdsToSkip: [ ...hhHalIdsToSkip, '' ],
		} );
	};

	const updateSkipId = ( index, value ) => {
		const updated = [ ...hhHalIdsToSkip ];
		updated[ index ] = value;
		setAttributes( { hhHalIdsToSkip: updated } );
	};

	const removeSkipId = ( index ) => {
		setAttributes( {
			hhHalIdsToSkip: hhHalIdsToSkip.filter( ( _, i ) => i !== index ),
		} );
	};

	const toggleField = ( key ) => {
		const newFields = hhEnabledFields.includes( key )
			? hhEnabledFields.filter( ( f ) => f !== key )
			: [ ...hhEnabledFields, key ];

		setAttributes( { hhEnabledFields: newFields } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'hal-publications' ) }>
					{ /* hhQuery field */ }
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Query', 'harvest-hal' ) }
						value={ hhQuery || '' }
						onChange={ ( value ) =>
							setAttributes( { hhQuery: value } )
						}
					/>
				</PanelBody>
				<PanelBody title="Fields to Display" initialOpen={ true }>
					{ ALL_FIELDS.map( ( field ) => (
						<CheckboxControl
							key={ field.key }
							label={ field.label }
							checked={ hhEnabledFields.includes( field.key ) }
							onChange={ () => toggleField( field.key ) }
						/>
					) ) }
				</PanelBody>

				{ /* Author pages array */ }
				<PanelBody
					title={ __( 'Author Pages', 'hal-publications' ) }
					initialOpen={ false }
				>
					{ hhAuthorPages.length === 0 && (
						<p style={ { fontStyle: 'italic', opacity: 0.7 } }>
							No author page entries yet.
						</p>
					) }

					{ hhAuthorPages.map( ( row, index ) => (
						<Flex key={ index } style={ { marginBottom: '8px' } }>
							<FlexBlock>
								<TextControl
									placeholder="idHal"
									value={ row.idHal || '' }
									onChange={ ( v ) =>
										updateAuthorPage( index, 'idHal', v )
									}
								/>
							</FlexBlock>

							<FlexBlock>
								<TextControl
									placeholder="URL"
									value={ row.page || '' }
									onChange={ ( v ) =>
										updateAuthorPage( index, 'page', v )
									}
								/>
							</FlexBlock>

							<FlexItem>
								<Button
									icon="no-alt"
									label="Remove"
									onClick={ () => removeAuthorPage( index ) }
									isSecondary
									isSmall
									style={ { marginTop: '4px' } }
								/>
							</FlexItem>
						</Flex>
					) ) }

					<Button
						isSmall
						variant="primary"
						onClick={ addAuthorPage }
						style={ { marginTop: '10px' } }
					>
						<Icon icon="plus" />{ ' ' }
						{ __( 'Add Author Page', 'hal-publications' ) }
					</Button>
				</PanelBody>

				<PanelBody
					title="Filter (remove) HAL Ids"
					initialOpen={ false }
				>
					{ hhHalIdsToSkip.map( ( id, index ) => (
						<Flex
							key={ index }
							gap={ 4 }
							align="center"
							className="hh-skip-id-row"
						>
							<FlexItem isBlock>
								<TextControl
									label={ index === 0 ? 'Skip HAL IDs' : '' }
									value={ id }
									placeholder="hal-01234567"
									onChange={ ( value ) =>
										updateSkipId( index, value )
									}
								/>
							</FlexItem>
							<Button
								variant="secondary"
								isDestructive
								onClick={ () => removeSkipId( index ) }
							>
								Remove
							</Button>
						</Flex>
					) ) }

					<Button variant="primary" onClick={ addSkipId }>
						Add HAL ID
					</Button>
				</PanelBody>
				<PanelBody title="CSS customization" initialOpen={ false }>
					<TextareaControl
						label="Custom CSS"
						help="Target elements inside the block, for example: .authors { font-weight: bold; }"
						value={ hhCustomCss }
						onChange={ ( value ) =>
							setAttributes( { hhCustomCss: value } )
						}
						rows={ 6 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<hr /> Publication list preview (with [HAL id], not shown on
				frontend)
				<hr />
				<ServerSideRender
					block="dlyr/hal-publications"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
