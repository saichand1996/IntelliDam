'use strict';

const config = require('config');
const _ = require('lodash');
const listtojson = require('../lib/listtojson');

describe('List To JSON Remote', function() {

    it('Get table from Github using callBack function', async function() {
        await listtojson.convertUrl(
            'https://raw.githubusercontent.com/maugenst/listtojson/master/test/lists.html',
            {
                request: {
                    proxy: config.get('request.proxy')
                }
            },
            converted => {
                const firstlist = converted[0];
                expect(firstlist[0]).toBe('OL1: Item 1');
                expect(firstlist[1]).toBe('OL1: Item 2');
                expect(firstlist[2]).toBe('OL1: Item 3');
                expect(firstlist[3]).toBe('OL1: Item 4');
                expect(firstlist[4]).toBe('OL1: Item 5');
                expect(firstlist[5]).toBe('OL1: Item 6');
                expect(firstlist[6]).toBe('<b>OL1: Item <i>7</i></b>');
                expect(firstlist instanceof Array).toBeTruthy();
            }
        );
    });

    it('Get table from Github using callBack function without options', async function() {
        await listtojson.convertUrl(
            'https://raw.githubusercontent.com/maugenst/listtojson/master/test/lists.html',
            converted => {
                const firstlist = converted[0];
                expect(firstlist[0]).toBe('OL1: Item 1');
                expect(firstlist[1]).toBe('OL1: Item 2');
                expect(firstlist[2]).toBe('OL1: Item 3');
                expect(firstlist[3]).toBe('OL1: Item 4');
                expect(firstlist[4]).toBe('OL1: Item 5');
                expect(firstlist[5]).toBe('OL1: Item 6');
                expect(firstlist[6]).toBe('<b>OL1: Item <i>7</i></b>');
                expect(firstlist instanceof Array).toBeTruthy();
            }
        );
    });

    it('Get table from Wikipedia using promises', async function() {
        const converted = await listtojson.convertUrl(
            'https://raw.githubusercontent.com/maugenst/listtojson/master/test/lists.html',
            {
                request: {
                    proxy: config.get('request.proxy')
                }
            }
        );

        expect(converted).toBeDefined();
        const firstlist = converted[0];
        expect(firstlist[0]).toBe('OL1: Item 1');
        expect(firstlist[1]).toBe('OL1: Item 2');
        expect(firstlist[2]).toBe('OL1: Item 3');
        expect(firstlist[3]).toBe('OL1: Item 4');
        expect(firstlist[4]).toBe('OL1: Item 5');
        expect(firstlist[5]).toBe('OL1: Item 6');
        expect(firstlist[6]).toBe('<b>OL1: Item <i>7</i></b>');
        expect(firstlist instanceof Array).toBeTruthy();
    });

    it('Try to get a list from a nonexisting domain', async function() {
        listtojson.convertUrl('https://www.klhsfljkag.com/ydasdadad/adsaakhjg/jahsgajhvas.html').catch(e => {
            expect(e.message).toEqual('getaddrinfo ENOTFOUND www.klhsfljkag.com www.klhsfljkag.com:443');
        });
    });
});
