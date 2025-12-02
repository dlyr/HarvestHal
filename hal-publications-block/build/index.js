/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"dlyr/hal-publications","version":"0.1.1","title":"Hal Publications","category":"widgets","description":"Query https://api.archives-ouvertes.fr/ and display the result","example":{},"attributes":{"hhQuery":{"type":"string"},"hhAuthorPages":{"type":"array","default":[],"items":{"type":"object","properties":{"idHal":{"type":"string"},"page":{"type":"string"}}}},"hhHalIdsToSkip":{"type":"array","default":[]},"hhCustomCss":{"type":"string","default":""},"hhEnabledFields":{"type":"array","default":["title_s","uri_s","source_s","bookTitle_s","journalTitle_s","conferenceTitle_s","producedDate_tdate","producedDateY_i","authorityInstitution_s","authFullNameIdHal_fs","comment_s","thumbId_i","fileMain_s","seeAlso_s"]}},"supports":{"color":{"background":false,"text":true},"html":false,"typography":{"fontSize":true}},"textdomain":"harvest-hal","editorScript":"file:./index.js","render":"file:./render.php","style":"file:./style-index.css","editorStyle":"file:./index.css"}');

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */





const ALL_FIELDS = [{
  key: 'title_s',
  label: 'Title'
}, {
  key: 'uri_s',
  label: 'URL'
}, {
  key: 'source_s',
  label: 'Source'
}, {
  key: 'bookTitle_s',
  label: 'Book Title'
}, {
  key: 'journalTitle_s',
  label: 'Journal Title'
}, {
  key: 'conferenceTitle_s',
  label: 'Conference Title'
}, {
  key: 'authorityInstitution_s',
  label: 'Institution (for thesis and report)'
}, {
  key: 'authFullNameIdHal_fs',
  label: 'Authors'
}, {
  key: 'comment_s',
  label: 'Comment'
}, {
  key: 'thumbId_i',
  label: 'Thumbnail'
}, {
  key: 'fileMain_s',
  label: 'Main File'
}, {
  key: 'seeAlso_s',
  label: 'See Also'
}];
function Edit({
  attributes,
  setAttributes
}) {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
  const {
    hhQuery,
    hhAuthorPages = [],
    hhHalIdsToSkip,
    hhCustomCss,
    hhEnabledFields
  } = attributes;

  // Add a new empty pair
  const addAuthorPage = () => {
    const next = [...hhAuthorPages, {
      idHal: '',
      page: ''
    }];
    setAttributes({
      hhAuthorPages: next
    });
  };

  // Update a pair
  const updateAuthorPage = (index, field, value) => {
    const next = hhAuthorPages.map((item, i) => {
      if (i !== index) {
        return item;
      }
      return {
        ...item,
        [field]: value
      };
    });
    setAttributes({
      hhAuthorPages: next
    });
  };

  // Remove a pair
  const removeAuthorPage = index => {
    const next = hhAuthorPages.filter((_, i) => i !== index);
    setAttributes({
      hhAuthorPages: next
    });
  };
  const addSkipId = () => {
    setAttributes({
      hhHalIdsToSkip: [...hhHalIdsToSkip, '']
    });
  };
  const updateSkipId = (index, value) => {
    const updated = [...hhHalIdsToSkip];
    updated[index] = value;
    setAttributes({
      hhHalIdsToSkip: updated
    });
  };
  const removeSkipId = index => {
    setAttributes({
      hhHalIdsToSkip: hhHalIdsToSkip.filter((_, i) => i !== index)
    });
  };
  const toggleField = key => {
    const newFields = hhEnabledFields.includes(key) ? hhEnabledFields.filter(f => f !== key) : [...hhEnabledFields, key];
    setAttributes({
      hhEnabledFields: newFields
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Settings', 'hal-publications'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Query', 'harvest-hal'),
          value: hhQuery || '',
          onChange: value => setAttributes({
            hhQuery: value
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: "Fields to Display",
        initialOpen: true,
        children: ALL_FIELDS.map(field => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
          label: field.label,
          checked: hhEnabledFields.includes(field.key),
          onChange: () => toggleField(field.key)
        }, field.key))
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Author Pages', 'hal-publications'),
        initialOpen: false,
        children: [hhAuthorPages.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          style: {
            fontStyle: 'italic',
            opacity: 0.7
          },
          children: "No author page entries yet."
        }), hhAuthorPages.map((row, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, {
          style: {
            marginBottom: '8px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              placeholder: "idHal",
              value: row.idHal || '',
              onChange: v => updateAuthorPage(index, 'idHal', v)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexBlock, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              placeholder: "URL",
              value: row.page || '',
              onChange: v => updateAuthorPage(index, 'page', v)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              icon: "no-alt",
              label: "Remove",
              onClick: () => removeAuthorPage(index),
              isSecondary: true,
              isSmall: true,
              style: {
                marginTop: '4px'
              }
            })
          })]
        }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          isSmall: true,
          variant: "primary",
          onClick: addAuthorPage,
          style: {
            marginTop: '10px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
            icon: "plus"
          }), ' ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Author Page', 'hal-publications')]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: "Filter (remove) HAL Ids",
        initialOpen: false,
        children: [hhHalIdsToSkip.map((id, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, {
          gap: 4,
          align: "center",
          className: "hh-skip-id-row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, {
            isBlock: true,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: index === 0 ? 'Skip HAL IDs' : '',
              value: id,
              placeholder: "hal-01234567",
              onChange: value => updateSkipId(index, value)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            variant: "secondary",
            isDestructive: true,
            onClick: () => removeSkipId(index),
            children: "Remove"
          })]
        }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "primary",
          onClick: addSkipId,
          children: "Add HAL ID"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: "CSS customization",
        initialOpen: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
          label: "Custom CSS",
          help: "Target elements inside the block, for example: .authors { font-weight: bold; }",
          value: hhCustomCss,
          onChange: value => setAttributes({
            hhCustomCss: value
          }),
          rows: 6
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("hr", {}), " Publication list preview (with [HAL id], not shown on frontend)", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("hr", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3___default()), {
        block: "dlyr/hal-publications",
        attributes: attributes
      })]
    })]
  });
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






/**
 * Define a custom SVG icon for the block. This icon will appear in
 * the Inserter and when the user selects the block in the Editor.
 */

const halIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("svg", {
  width: "24",
  height: "24",
  version: "1.1",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("g", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
      d: "m18.458 5.6577c0.4432 0.4432 1.0282 0.6914 1.6576 0.6914h0.0089c0.54071 0 1.046-0.17728 1.4626-0.51412-0.85095-1.3207-1.9678-2.4642-3.2708-3.3329-0.3457 0.41661-0.54071 0.93959-0.54071 1.4892 0 0.63821 0.23933 1.2232 0.68253 1.6664z",
      fill: "#ff4600"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
      d: "m17.767 6.4112c-1.2942-1.2853-2.0033-2.9961-1.9944-4.8043 0-0.1241 0.0089-0.24819 0.0089-0.36343-0.76231-0.26592-1.5601-0.46093-2.3844-0.55844-0.03546 0.30138-0.04432 0.61162-0.04432 0.913-0.0089 2.4642 0.95732 4.7777 2.7124 6.524 1.8171 1.8083 4.2104 2.7124 6.6037 2.7124 0.2216 0 0.4432-0.0089 0.66481-0.02659-0.088677-0.82436-0.2571-1.631-0.51415-2.3933-1.8349 0.04432-3.6697-0.62935-5.0525-2.0033z",
      fill: "#cd3c1b"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
      d: "m15.364 8.8665c-2.3401-2.3313-4.042-5.1146-5.0082-8.1638-0.8155 0.11523-1.5955 0.31911-2.349 0.59389 1.0726 3.457 2.9961 6.6392 5.6464 9.2807 2.5972 2.5883 5.6819 4.4143 8.9616 5.4957 0.28365-0.74458 0.50525-1.5246 0.62935-2.3401-2.8808-0.96618-5.5932-2.5883-7.8802-4.8664z",
      fill: "#a53232"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
      d: "m20.869 19.131-15.955-16.071c-0.62935 0.50525-1.2144 1.0726-1.7285 1.693l15.973 16.088c0.62935-0.50525 1.2055-1.0814 1.7108-1.7108z",
      fill: "#7d2d46"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
      d: "m1.3149 7.9979c-0.28365 0.75345-0.48752 1.5335-0.60276 2.349 2.9606 0.96619 5.7439 2.606 8.084 4.9373 2.2869 2.2781 3.9622 4.9993 4.9462 7.9599 0.8155-0.1241 1.5955-0.33684 2.3401-0.62935-1.0903-3.3772-2.9783-6.4708-5.5755-9.0502-2.6592-2.6415-5.8237-4.4941-9.1921-5.5666z",
      fill: "#64286e"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
      d: "m8.1048 16.029c-2.021-2.0121-4.76-2.9074-7.4192-2.677 0.097505 0.82436 0.28365 1.6221 0.54957 2.3844 1.8615-0.07091 3.7495 0.59389 5.1678 2.0033 1.2942 1.2853 2.0033 2.9961 1.9944 4.8043 0 0.07978 0 0.16842-0.00886 0.24819 0.76231 0.25706 1.5601 0.43434 2.3933 0.52298 0.01773-0.24819 0.03546-0.50525 0.03546-0.76231 0-2.4554-0.95732-4.7777-2.7124-6.524z",
      fill: "#411489"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
      d: "m5.7115 18.493c-0.4432-0.4432-1.0282-0.6914-1.6576-0.6914h-0.00886c-0.55844 0-1.0814 0.19501-1.5069 0.54957 0.87754 1.303 2.021 2.411 3.3506 3.2531 0.32797-0.40775 0.50525-0.913 0.50525-1.4448 0-0.62935-0.24819-1.2144-0.68253-1.6664z",
      fill: "#171775"
    })]
  })
});

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  icon: halIcon,
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save() {
    return null;
  }
});

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/server-side-render":
/*!******************************************!*\
  !*** external ["wp","serverSideRender"] ***!
  \******************************************/
/***/ ((module) => {

module.exports = window["wp"]["serverSideRender"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkhal_publications_block"] = globalThis["webpackChunkhal_publications_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map