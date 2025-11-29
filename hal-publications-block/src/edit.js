/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import { useEffect } from 'react';

export default function Edit( { attributes, setAttributes } ) {
    const { hh_query } = attributes;
    return (
	    <>
	    <InspectorControls>
	    <PanelBody title={ __( 'Settings', 'hal-publications' ) }>
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
	    </InspectorControls>
	    <p { ...useBlockProps() }>HAL publications</p>
	    </>
    );
}
