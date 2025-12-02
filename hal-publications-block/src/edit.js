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

	// --- author pages ----------------------------------------------------
	const addAuthorPage = () => {
		const next = [ ...hhAuthorPages, { idHal: '', page: '' } ];
		setAttributes( { hhAuthorPages: next } );
	};

	const updateAuthorPage = ( index, field, value ) => {
		const next = hhAuthorPages.map( ( item, i ) => {
			if ( i !== index ) {
				return item;
			}
			return { ...item, [ field ]: value };
		} );
		setAttributes( { hhAuthorPages: next } );
	};

	const removeAuthorPage = ( index ) => {
		const next = hhAuthorPages.filter( ( _, i ) => i !== index );
		setAttributes( { hhAuthorPages: next } );
	};

	// --- HalIds to skip --------------------------------------------------
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

	// --- enables fields --------------------------------------------------
	const toggleField = ( key ) => {
		const newFields = hhEnabledFields.includes( key )
			? hhEnabledFields.filter( ( f ) => f !== key )
			: [ ...hhEnabledFields, key ];

		setAttributes( { hhEnabledFields: newFields } );
	};

	return (
		<>
			{ /* --- editor controls ----------------------------*/ }
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'harvest-hal' ) }
					initialOpen={ true }
				>
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
				<PanelBody
					title={ __( 'Fields to Display', 'harvest-hal' ) }
					initialOpen={ false }
				>
					{ ALL_FIELDS.map( ( field ) => (
						<CheckboxControl
							__nextHasNoMarginBottom
							key={ field.key }
							label={ field.label }
							checked={ hhEnabledFields.includes( field.key ) }
							onChange={ () => toggleField( field.key ) }
						/>
					) ) }
				</PanelBody>
				<PanelBody
					title={ __( 'Author Pages', 'harvest-hal' ) }
					initialOpen={ false }
				>
					{ hhAuthorPages.length === 0 && (
						<p style={ { fontStyle: 'italic', opacity: 0.7 } }>
							{ __(
								'No author page entries yet.',
								'harvest-hal'
							) }
						</p>
					) }

					{ hhAuthorPages.map( ( row, index ) => (
						<Flex key={ index } style={ { marginBottom: '8px' } }>
							<FlexBlock>
								<TextControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									placeholder="idHal"
									value={ row.idHal || '' }
									onChange={ ( v ) =>
										updateAuthorPage( index, 'idHal', v )
									}
								/>
							</FlexBlock>

							<FlexBlock>
								<TextControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									placeholder="URL"
									value={ row.page || '' }
									onChange={ ( v ) =>
										updateAuthorPage( index, 'page', v )
									}
								/>
							</FlexBlock>

							<FlexItem>
								<Button
									__next40pxDefaultSize
									icon="no-alt"
									label="Remove"
									isDestructive
									variant="secondary"
									size="compact"
									onClick={ () => removeAuthorPage( index ) }
								/>
							</FlexItem>
						</Flex>
					) ) }

					<Button
						__next40pxDefaultSize
						variant="primary"
						onClick={ addAuthorPage }
					>
						<Icon icon="plus" />{ ' ' }
						{ __( 'Add Author Page', 'harvest-hal' ) }
					</Button>
				</PanelBody>
				<PanelBody
					title={ __( 'Filter (remove) HAL Ids', 'harvest-hal' ) }
					initialOpen={ false }
				>
					{ hhHalIdsToSkip.length === 0 && (
						<p style={ { fontStyle: 'italic', opacity: 0.7 } }>
							{ __( 'No HAL IDs to skip.', 'harvest-hal' ) }
						</p>
					) }
					{ hhHalIdsToSkip.map( ( id, index ) => (
						<Flex key={ index } style={ { marginBottom: '8px' } }>
							<FlexBlock>
								<TextControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									value={ id }
									placeholder="hal-01234567"
									onChange={ ( value ) =>
										updateSkipId( index, value )
									}
								/>
							</FlexBlock>
							<FlexItem>
								<Button
									__next40pxDefaultSize
									icon="no-alt"
									label="Remove"
									isDestructive
									variant="secondary"
									size="compact"
									onClick={ () => removeSkipId( index ) }
								/>
							</FlexItem>
						</Flex>
					) ) }

					<Button
						__next40pxDefaultSize
						variant="primary"
						onClick={ addSkipId }
					>
						<Icon icon="plus" />{ ' ' }
						{ __( 'Add HAL ID', 'harvest-hal' ) }
					</Button>
				</PanelBody>
				<PanelBody title="CSS customization" initialOpen={ false }>
					<TextareaControl
						label="Custom CSS"
						help={ __(
							'Target elements inside the block, for example: .authors { font-weight: bold; }',
							'harvest-hal'
						) }
						value={ hhCustomCss }
						onChange={ ( value ) =>
							setAttributes( { hhCustomCss: value } )
						}
						rows={ 6 }
					/>
				</PanelBody>
			</InspectorControls>
			{ /* - block display ------------------------------*/ }
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
