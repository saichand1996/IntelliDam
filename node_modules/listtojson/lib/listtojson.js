'use strict';

const AbstractToJson = require('pagetojson').AbstractToJson;
const cheerio = require('cheerio');

class listtojson extends AbstractToJson {
    /**
     * Static conversion of a given HTML Page
     * @return {Object} Converted list as array
     */
    static convert(html, options) {
        options = Object.assign(
            {
                containsClasses: null,
                id: null
            },
            options
        );

        const jsonResponse = [];

        const $ = cheerio.load(html);

        let additionalSelectors = options.containsClasses ? `.${options.containsClasses.join('.')}` : '';
        additionalSelectors = options.id ? `${additionalSelectors}#${options.id}` : additionalSelectors;

        $(`ol${additionalSelectors}, ul${additionalSelectors}`).each(function(i, ol) {
            const olAsJson = [];

            let lis = $(ol).find('li');

            lis.each(function(j, li) {

                const content = options.stripHtml
                    ? $(li)
                        .text()
                        .trim()
                    : $(li)
                        .html()
                        .trim();

                olAsJson.push(content);
            });

            if (olAsJson && olAsJson.length !== 0)
                jsonResponse.push(olAsJson);
        });

        return jsonResponse;
    }

    /**
     * Convert an HTML Page for a given URL
     * @param url URL to be called
     * @param arg1 {Object} Options for html conversion
     * @param arg1.useFirstRowForHeadings Use the first row as header [default=false]
     * @param arg1.stripHtmlFromHeadings Strip all HTML from headings [default=true]
     * @param arg1.stripHtmlFromCells Strip HTML from cells [default=true]
     * @param arg1.stripHtml Strip off HTML [default=null] if set true stripHtmlFromHeadings and stripHtmlFromCells will also be true
     * @param arg1.forceIndexAsNumber Force the index to be used as number [default=false]
     * @param arg1.countDuplicateHeadings If given a _<NUMBER> will be added to the duplicate key [default=false]
     * @param arg1.ignoreColumns {Array} Array of column indices to ignored [default=null]
     * @param arg1.onlyColumns {Array} Array of column indices to be used. Overrides ignoreColumn [default=null]
     * @param arg1.ignoreHiddenRows Ignoring hidden rows [default=true]
     * @param arg1.headings {Array} Array of Strings to be used as headings [default=null]
     * @param arg1.headings {Array} Array of classes to find a specific table [default=null]
     * @param arg1.request Options to be passed to request object
     * @param arg2 Callback function to be called when the conversion finished
     * @return {Promise<*>} Promise containing the result
     */
    static async convertUrl(url, arg1, arg2) {
        let options = null;
        let callback = null;
        let requestOptions = null;

        if (typeof arg2 === 'function') {
            // If both options and callback passed
            options = arg1;
            // If you need to pass in options for request (proxy)
            // add them to arg1.request
            requestOptions = options.request || {};
            callback = arg2;

            // Use a callback (if passed)
            const html = await AbstractToJson.fetchUrl(url, requestOptions);
            return callback.call(this, listtojson.convert(html, options));
        } else if (typeof arg1 === 'function') {
            // If only callback passed, invoke with no options
            callback = arg1;

            // Use a callback (if passed)
            const html = await AbstractToJson.fetchUrl(url);
            return callback.call(this, listtojson.convert(html, options));
        } else {
            // If neither argument is callback, return a promise
            options = arg1 || {};
            // If you need to pass in options for request (proxy)
            // add them to arg1.request
            requestOptions = options.request || {};
            const html = await AbstractToJson.fetchUrl(url, requestOptions);
            return listtojson.convert(html, options);
        }
    }

}

module.exports = {
    arrayNotEmpty: listtojson.arrayNotEmpty,
    convert: listtojson.convert,
    convertUrl: listtojson.convertUrl
};
