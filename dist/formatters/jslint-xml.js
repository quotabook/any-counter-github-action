/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 578:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * @fileoverview JSLint XML reporter
 * @author Ian Christian Myers
 */


const xmlEscape = __nccwpck_require__(400);

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function(results) {

    let output = "";

    output += "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
    output += "<jslint>";

    results.forEach(result => {
        const messages = result.messages;

        output += `<file name="${result.filePath}">`;

        messages.forEach(message => {
            output += [
                `<issue line="${message.line}"`,
                `char="${message.column}"`,
                `evidence="${xmlEscape(message.source || "")}"`,
                `reason="${xmlEscape(message.message || "")}${message.ruleId ? ` (${message.ruleId})` : ""}" />`
            ].join(" ");
        });

        output += "</file>";

    });

    output += "</jslint>";

    return output;
};


/***/ }),

/***/ 400:
/***/ ((module) => {

/**
 * @fileoverview XML character escaper
 * @author George Chung
 */


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Returns the escaped value for a character
 * @param {string} s string to examine
 * @returns {string} severity level
 * @private
 */
module.exports = function(s) {
    return (`${s}`).replace(/[<>&"'\x00-\x1F\x7F\u0080-\uFFFF]/gu, c => { // eslint-disable-line no-control-regex -- Converting controls to entities
        switch (c) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
            case "'":
                return "&apos;";
            default:
                return `&#${c.charCodeAt(0)};`;
        }
    });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(578);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;