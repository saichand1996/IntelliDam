'use strict';

const AbstractToJson = require('./AbstractToJson');

class pagetojson extends AbstractToJson {
    /**
     * Constructor for page to json
     * @param aTag {Array} Array of tags to be converted
     */
    constructor(aTags) {
        super();
        aTags.forEach(tag => {
            this[`${tag}tojson`] = require(`${tag}tojson`);
        });
        this.aTags = aTags;
    }

    /**
     * Static conversion of a given HTML Page
     * @return {Object} Converted Object as an object literal
     */
    convert(html, options) {
        const oResult = {};
        this.aTags.forEach(tag => {
            oResult[tag] = this[`${tag}tojson`].convert(html, options);
        });
        return oResult;
    }

    /**
     * Convert an HTML Page for a given URL
     * @return {Promise<*>} Promise containing the result
     */
    async convertUrl(url, options) {
        return new Promise((resolve, reject) => {
            reject('Not yet implemented');
        });
    }
}

module.exports = pagetojson;
