/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import { PanelBody, TextControl, ToggleControl, Button } from '@wordpress/components';

import { useEffect } from 'react';
import ServerSideRender from '@wordpress/server-side-render';



export default function Edit( { attributes, setAttributes } ) {
    const blockProps = useBlockProps();
    const { hh_query, hh_author_pages =[] } = attributes;
    
    // Add a new empty pair
    const addAuthorPage = () => {
        const next = [ ...hh_author_pages, { idHal: "", page: "" } ];
        setAttributes({ hh_author_pages: next });
    };

    // Update a pair
    const setAuthorPage = ( index, field, value ) => {
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

        {/* Author pages array */}
                    <h3>{ __( 'Author Pages', 'hal-publications' ) }</h3>


                    { hh_author_pages.map( (item, index) => (
                        <div key={index} style={{ marginBottom: '1em' }}>
                            <TextControl
                                label="idHal"
                                value={ item.idHal }
                                onChange={ (v) => setAuthorPage(index, "idHal", v) }
                            />
                            <TextControl
                                label="Homepage URL"
                                value={ item.page }
                                onChange={ (v) => setAuthorPage(index, "page", v) }
                            />
                            <Button
                                isDestructive
                                onClick={ () => removeAuthorPage(index) }
                            >
                                Remove
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="primary"
                        onClick={ addAuthorPage }
                    >
                        { __( 'Add author page', 'hal-publications' ) }
                    </Button>

        
                 

	</PanelBody>
	    </InspectorControls>
	    <div { ...blockProps }>
            <h2> Publication list Preview</h2>
            <ServerSideRender
        block="dlyr/hal-publications"
        attributes={ attributes }
            />
            </div>
	    </>        
    );
}
