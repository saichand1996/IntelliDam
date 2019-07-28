'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');

var AbstractToJson = function () {
    /**
     * @abstract constructor
     */
    function AbstractToJson() {
        _classCallCheck(this, AbstractToJson);

        if (this.constructor === AbstractToJson) {
            throw new TypeError('Constructor invocation not allowed on abstract class');
        }
    }

    /**
     * Static conversion of a given HTML Page
     * @return {Object} Converted Object as an object literal
     */


    _createClass(AbstractToJson, null, [{
        key: 'convert',
        value: function convert(html, options) {
            throw new Error('Not callable on abstract class');
        }

        /**
         * Convert an HTML Page for a given URL
         * @return {Promise<*>} Promise containing the result
         */

    }, {
        key: 'convertUrl',
        value: function convertUrl(url, arg1, arg2) {
            return new Promise(function (resolve, reject) {
                reject('Not callable on abstract class');
            });
        }
    }, {
        key: 'fetchUrl',
        value: function fetchUrl(url, options) {
            return new Promise(function (resolve, reject) {
                request(url, options, function (error, response, body) {
                    if (error) {
                        reject(error);
                    }
                    resolve(body);
                });
            });
        }
    }]);

    return AbstractToJson;
}();

module.exports = AbstractToJson;