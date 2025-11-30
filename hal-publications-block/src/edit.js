/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';


import {
    PanelBody,
    TextControl,
    TextareaControl,
    BaseControl,
    Flex,
    FlexBlock,
    FlexItem,
    Button,
    Icon
} from '@wordpress/components';
import { useEffect } from 'react';
import ServerSideRender from '@wordpress/server-side-render';



export default function Edit( { attributes, setAttributes } ) {
    const blockProps = useBlockProps();
    const { hh_query, hh_author_pages =[], hh_hal_ids_to_skip, hh_custom_css } = attributes;
    
    // Add a new empty pair
    const addAuthorPage = () => {
        const next = [ ...hh_author_pages, { idHal: "", page: "" } ];
        setAttributes({ hh_author_pages: next });
    };

    // Update a pair
    const updateAuthorPage = ( index, field, value ) => {
        const next = hh_author_pages.map( (item, i) => {
            if ( i !== index ) return item;
            return { ...item, [field]: value };
        });
        setAttributes({ hh_author_pages: next });
    };

    // Remove a pair
    const removeAuthorPage = ( index ) => {
        const next = hh_author_pages.filter( ( _ , i ) => i !== index );
        setAttributes({ hh_author_pages: next });
    };



    const addSkipId = () => {
        setAttributes({
            hh_hal_ids_to_skip: [...hh_hal_ids_to_skip, ""]
        });
    };

    const updateSkipId = (index, value) => {
        const updated = [...hh_hal_ids_to_skip];
        updated[index] = value;
        setAttributes({ hh_hal_ids_to_skip: updated });
    };

    const removeSkipId = (index) => {
        setAttributes({
            hh_hal_ids_to_skip: hh_hal_ids_to_skip.filter((_, i) => i !== index)
        });
    };
    
    
    return (
	    <>
	    <InspectorControls>
	    <PanelBody title={ __( 'Settings', 'hal-publications' ) }>
            {/* hh_query field */}
            <TextControl
        __nextHasNoMarginBottom
        __next40pxDefaultSize
        label={ __(
            'Query',
            'harvest-hal'
        ) }
        value={ hh_query||''}
        onChange={ ( value ) =>
            setAttributes( { hh_query: value } )
        }
            />
            </PanelBody>

        {/* Author pages array */}
            <PanelBody title={ __( 'Author Pages', 'hal-publications' ) } initialOpen={false}>
            { hh_author_pages.length === 0 && (
                    <p style={{ fontStyle: 'italic', opacity: 0.7 }}>
                    No author page entries yet.
                    </p>
            )}

        { hh_author_pages.map( (row, index) => (
                <Flex key={ index } style={{ marginBottom: '8px' }}>
                
                <FlexBlock>
                <TextControl
            placeholder="idHal"
            value={ row.idHal || '' }
            onChange={ (v) => updateAuthorPage(index, 'idHal', v) }
                />
                </FlexBlock>

                <FlexBlock>
                <TextControl
            placeholder="URL"
            value={ row.page || '' }
            onChange={ (v) => updateAuthorPage(index, 'page', v) }
                />
                </FlexBlock>

                <FlexItem>
                <Button
            icon="no-alt"
            label="Remove"
            onClick={ () => removeAuthorPage(index) }
            isSecondary
            isSmall
            style={{ marginTop: '4px' }}
                />
                </FlexItem>

            </Flex>
        ))}

            <Button
        isSmall
        variant="primary"
        onClick={ addAuthorPage }
        style={{ marginTop: '10px' }}
            >
            <Icon icon="plus" /> { __( 'Add Author Page', 'hal-publications' ) }
        </Button>
            </PanelBody>

        
            <PanelBody title="Filter (remove) HAL Ids" initialOpen={false}>

        {hh_hal_ids_to_skip.map((id, index) => (
                <Flex key={index} gap={4} align="center" className="hh-skip-id-row">
                <FlexItem isBlock>
                <TextControl
            label={index === 0 ? "Skip HAL IDs" : ""}
            value={id}
            placeholder="hal-01234567"
            onChange={(value) => updateSkipId(index, value)}
                />
                </FlexItem>
                <Button
            variant="secondary"
            isDestructive
            onClick={() => removeSkipId(index)}
                >
                Remove
            </Button>
                </Flex>
        ))}

            <Button
        variant="primary"
        onClick={addSkipId}
            >
            Add HAL ID
        </Button>
	    </PanelBody>
  <PanelBody title="CSS customization" initialOpen={ false }>
                    <TextareaControl
                        label="Custom CSS"
                        help="Target elements inside the block, for example: .authors { font-weight: bold; }"
                        value={ hh_custom_css }
                        onChange={ value => setAttributes({ hh_custom_css: value }) }
                        rows={ 6 }
                    />
                </PanelBody>
        
	    </InspectorControls>
	    <div { ...blockProps }>
            <h2> Publication list preview (with [HAL id], not shown on frontend)</h2>
            <ServerSideRender
        block="dlyr/hal-publications"
        attributes={ attributes }
            />
            </div>
	    </>        
    );
}
