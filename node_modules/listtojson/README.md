[![NPM](https://nodei.co/npm/listtojson.png)](https://nodei.co/npm/listtojson/)

[![Build](https://travis-ci.org/maugenst/listtojson.svg?branch=master)](https://travis-ci.org/maugenst/listtojson.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/maugenst/listtojson/badge.svg?branch=master)](https://coveralls.io/github/maugenst/listtojson?branch=master)
[![Dependencies](https://david-dm.org/maugenst/listtojson.svg)](https://david-dm.org/maugenst/listtojson)
[![Known Vulnerabilities](https://snyk.io/test/github/maugenst/listtojson/badge.svg?targetFile=package.json)](https://snyk.io/test/github/maugenst/listtojson?targetFile=package.json)


# listtojson
An npm module for node.js to convert HTML lists to JSON objects. Basically ordered and
unordered lists are the same. Just the browser treats them differently in rendering bullets 
or numbers I decided to not differenciate between them and just provide a package for all of
them. 

This package can be passed the markup for a single list as a string, a fragment of HTML 
or an entire page or just a URL (with an optional callback function; promises also supported).

The response is always an array. Every array entry in the response represents a list found 
on the page (in same the order they were found in the HTML).


## Basic Usage

Install via npm

```
npm install listtojson
```

### Remote (`convertUrl`)

```javascript
'use strict';

const listtojson = require('listtojson');

listtojson.convertUrl(
    'https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes',
    function(listsAsJson) {
        console.log(listsAsJson[1]);
    }
);

```

### Local (`convert`)
Have a look in the tests folder.

```javascript
'use strict';

const listtojson = require('../lib/listtojson');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../test/lists.html'), {encoding: 'UTF-8'});
const converted = listtojson.convert(html);

console.log(converted);
```

## Options

### request (only `convertUrl`)
If you need to get data from a remote server to pass it to the parser you can call `listtojson.convertUrl`.
When working behind a proxy you can pass any request-options (proxy, headers,...) by adding a request
object to the options passed to `convertUrl`.
for more information on how to configure request please have a look at: 
[https://github.com/request/request](https://github.com/request/request)

``` javascript
listtojson.convertUrl('https://www.timeanddate.com/holidays/ireland/2017', {
    useFirstRowForHeadings: true,
    request: {
        proxy: 'http://proxy:8080'
    }
});
```
### containsClasses
Array of classes to find a specific list using this css class. Default is 'null/undefined'.

### id
The id of the list which is to be fetched provided as a string. Default is 'null/undefined'.

# Contributing

Improvements, fixes and suggestions for better written modules that other people have created are welcome, as are bug 
reports against specific tables it is unable to handle.

You can find basic tests in the test folder. I implemented the most straight forward way in using the library. Nonetheless
there are some edge cases that need to be tested and I would like to ask for support here. Feel free to fork and create
PRs here. Every bit of help is appreciated.

If you submit a pull request, please add an example for your use case, so I can understand what you want it to do (as I 
want to get around to writing tests for this and want to understand the sort of use cases people have).
