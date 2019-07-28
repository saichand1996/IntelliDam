'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractToJson = require('./AbstractToJson');

var pagetojson = function (_AbstractToJson) {
    _inherits(pagetojson, _AbstractToJson);

    /**
     * Constructor for page to json
     * @param aTag {Array} Array of tags to be converted
     */
    function pagetojson(aTags) {
        _classCallCheck(this, pagetojson);

        var _this = _possibleConstructorReturn(this, (pagetojson.__proto__ || Object.getPrototypeOf(pagetojson)).call(this));

        aTags.forEach(function (tag) {
            _this[tag + 'tojson'] = require(tag + 'tojson');
        });
        _this.aTags = aTags;
        return _this;
    }

    /**
     * Static conversion of a given HTML Page
     * @return {Object} Converted Object as an object literal
     */


    _createClass(pagetojson, [{
        key: 'convert',
        value: function convert(html, options) {
            var _this2 = this;

            var oResult = {};
            this.aTags.forEach(function (tag) {
                oResult[tag] = _this2[tag + 'tojson'].convert(html, options);
            });
            return oResult;
        }

        /**
         * Convert an HTML Page for a given URL
         * @return {Promise<*>} Promise containing the result
         */

    }, {
        key: 'convertUrl',
        value: function convertUrl(url, options) {
            return new Promise(function (resolve, reject) {
                reject('Not yet implemented');
            });
        }
    }]);

    return pagetojson;
}(AbstractToJson);

module.exports = pagetojson;