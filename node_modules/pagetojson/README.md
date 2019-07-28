[![NPM](https://nodei.co/npm/pagetojson.png)](https://nodei.co/npm/pagetojson/)

[![Build](https://travis-ci.org/maugenst/pagetojson.svg?branch=master)](https://travis-ci.org/maugenst/pagetojson.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/maugenst/pagetojson/badge.svg?branch=master)](https://coveralls.io/github/maugenst/pagetojson?branch=master)
[![Dependencies](https://david-dm.org/maugenst/pagetojson.svg)](https://david-dm.org/maugenst/pagetojson.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/maugenst/pagetojson/badge.svg?targetFile=package.json)](https://snyk.io/test/github/maugenst/pagetojson?targetFile=package.json)

# pagetojson

This project is meant to be a "shell" around other 'tagname'tojson projects like tabletojson. 
When implementing a specific tag in a separate project one can decide to either use the full 
blown shell or the little project just needed for his use case.

So ... it basically converts just parts that are known yet into an Object Array of JSON objects.
This list will grow over the time, so feel free to attend here and add your own 'tagname'tojson which 
will be added to the dependencies list.

## Installation

```bash
npm install pagetojson
```

## Usage

```javascript
const pagetojson = require('../lib/pagetojson');

const converted = pagetojson.convert('HTML-STRING', {
    tags: ['table', 'list']
})

console.log(converted)

// Result:
{
    table: [
        0: [...],
        1: [...],
        2: [...]
    ],
     list: [
         0: [...],
         1: [...],
         2: [...]
    ]
}

```

# Abstraction

Providing an Abstraction layer for implementing own "toJson"-conversions. Once 
a reference to pagetojson is defined a package can extend `AbstractToJson` and must implement
the two methods `convert` and `convertUrl`.

