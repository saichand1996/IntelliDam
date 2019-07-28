'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const listtojson = require('../lib/listtojson');

describe('ListToJSON Local', function() {
    let html = '';

    beforeAll(() => {
        html = fs.readFileSync(path.resolve(__dirname, 'lists.html'), {encoding: 'UTF-8'});
    });

    it('Options: Plain OL conversion', async function() {
        const converted = await listtojson.convert(html);
        expect(converted).toBeDefined();

        const firstlist = converted[0];

        expect(firstlist[0]).toBe('OL1: Item 1');
        expect(firstlist[1]).toBe('OL1: Item 2');
        expect(firstlist[2]).toBe('OL1: Item 3');
        expect(firstlist[3]).toBe('OL1: Item 4');
        expect(firstlist[4]).toBe('OL1: Item 5');
        expect(firstlist[5]).toBe('OL1: Item 6');
        expect(firstlist[6]).toBe('<b>OL1: Item <i>7</i></b>');
    });

    it('Options: Plain OL removing HTML from list elements', async function() {
        const converted = await listtojson.convert(html, {
            stripHtml: true
        });
        expect(converted).toBeDefined();

        const firstlist = converted[0];

        expect(firstlist[0]).toBe('OL1: Item 1');
        expect(firstlist[1]).toBe('OL1: Item 2');
        expect(firstlist[2]).toBe('OL1: Item 3');
        expect(firstlist[3]).toBe('OL1: Item 4');
        expect(firstlist[4]).toBe('OL1: Item 5');
        expect(firstlist[5]).toBe('OL1: Item 6');
        expect(firstlist[6]).toBe('OL1: Item 7');
    });

    it('Options: Plain OL selected by it\'s id', async function() {
        const converted = await listtojson.convert(html, {
            id: 'list2'
        });
        expect(converted).toBeDefined();
        expect(converted.length).toBe(1);

        const list = converted[0];

        expect(list[0]).toBe('OL2: Item 1');
        expect(list[1]).toBe('OL2: Item 2');
        expect(list[2]).toBe('OL2: Item 3');
        expect(list[3]).toBe('OL2: Item 4');
        expect(list[4]).toBe('OL2: Item 5');
        expect(list[5]).toBe('OL2: Item 6');
        expect(list[6]).toBe('OL2: Item 7');
    });

    it('Options: Plain OL selected by it\'s id', async function() {
        const converted = await listtojson.convert(html, {
            id: 'list2'
        });
        expect(converted).toBeDefined();
        expect(converted.length).toBe(1);

        const list = converted[0];

        expect(list[0]).toBe('OL2: Item 1');
        expect(list[1]).toBe('OL2: Item 2');
        expect(list[2]).toBe('OL2: Item 3');
        expect(list[3]).toBe('OL2: Item 4');
        expect(list[4]).toBe('OL2: Item 5');
        expect(list[5]).toBe('OL2: Item 6');
        expect(list[6]).toBe('OL2: Item 7');
    });

    it('Options: Plain OL selected by a list of classes', async function() {
        const converted = await listtojson.convert(html, {
            containsClasses: ['list4c1', 'list4c2', 'list4c3']
        });
        expect(converted).toBeDefined();
        expect(converted.length).toBe(2);

        const list1 = converted[0];
        const list2 = converted[1];

        expect(list1[0]).toBe('OL4.1: Item 1');
        expect(list1[1]).toBe('OL4.1: Item 2');
        expect(list1[2]).toBe('OL4.1: Item 3');
        expect(list1[3]).toBe('OL4.1: Item 4');
        expect(list1[4]).toBe('OL4.1: Item 5');
        expect(list1[5]).toBe('OL4.1: Item 6');
        expect(list1[6]).toBe('OL4.1: Item 7');

        expect(list2[0]).toBe('OL4.2: Item 1');
        expect(list2[1]).toBe('OL4.2: Item 2');
        expect(list2[2]).toBe('OL4.2: Item 3');
        expect(list2[3]).toBe('OL4.2: Item 4');
        expect(list2[4]).toBe('OL4.2: Item 5');
        expect(list2[5]).toBe('OL4.2: Item 6');
        expect(list2[6]).toBe('OL4.2: Item 7');
    });

    it('Options: Plain OL selected by a list of classes AND an ID', async function() {
        const converted = await listtojson.convert(html, {
            containsClasses: ['list4c1', 'list4c2', 'list4c3'],
            id: 'list4_2'
        });
        expect(converted).toBeDefined();
        expect(converted.length).toBe(1);

        const list = converted[0];

        expect(list[0]).toBe('OL4.2: Item 1');
        expect(list[1]).toBe('OL4.2: Item 2');
        expect(list[2]).toBe('OL4.2: Item 3');
        expect(list[3]).toBe('OL4.2: Item 4');
        expect(list[4]).toBe('OL4.2: Item 5');
        expect(list[5]).toBe('OL4.2: Item 6');
        expect(list[6]).toBe('OL4.2: Item 7');
    });

    it('Options: Plain UL conversion', async function() {
        const converted = await listtojson.convert(html);
        expect(converted).toBeDefined();

        const list = converted[5];

        expect(list[0]).toBe('UL1: Item 1');
        expect(list[1]).toBe('UL1: Item 2');
        expect(list[2]).toBe('UL1: Item 3');
        expect(list[3]).toBe('UL1: Item 4');
        expect(list[4]).toBe('UL1: Item 5');
        expect(list[5]).toBe('UL1: Item 6');
        expect(list[6]).toBe('<b>UL1: Item <i>7</i></b>');
    });



});
