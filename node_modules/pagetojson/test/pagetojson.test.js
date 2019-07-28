const PageToJson = require('../lib/pagetojson');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
/*
process.on('unhandledRejection', up => {
    throw up;
});
*/
describe('pagetojson Local', function() {
    let html = '';

    beforeAll(() => {
        html = fs.readFileSync(path.resolve(__dirname, 'htmlPage.html'), {encoding: 'UTF-8'});
    });

    it('Instanciation pagetojson with an unknown tag e.g. "title" should throw an error', () => {
        try {
            const p2j = new PageToJson(['title']);
        } catch (err) {
            expect(err.message).toBe("Cannot find module 'titletojson' from 'pagetojson.js'");
        }
    });

    it('instanciates pagetojson with a known tag: <table>', () => {
        const p2j = new PageToJson(['table']);
        expect(p2j).toBeDefined();
    });

    it('Convert a page containing tables', () => {
        const p2j = new PageToJson(['table']);
        expect(p2j).toBeDefined();

        const converted = p2j.convert(html);
        expect(converted).toBeDefined();
        expect(_.has(converted, 'table')).toBeTruthy();
        expect(_.isArray(converted.table)).toBeTruthy();
    });

    it('Convert a page containing tables and lists', () => {
        const p2j = new PageToJson(['table', 'list']);
        expect(p2j).toBeDefined();

        const converted = p2j.convert(html);
        expect(converted).toBeDefined();
        expect(_.has(converted, 'table')).toBeTruthy();
        expect(_.has(converted, 'list')).toBeTruthy();
        expect(_.isArray(converted.table)).toBeTruthy();
    });

    it('Convert page containing specifically only table', () => {
        const p2j = new PageToJson(['table']);
        expect(p2j).toBeDefined();

        const converted = p2j.convert(html);
        expect(converted).toBeDefined();
        expect(_.has(converted, 'table')).toBeTruthy();
        expect(_.isArray(converted.table)).toBeTruthy();
    });

    it('calls convertUrl and expects an exception', () => {
        expect.assertions(1);
        const p2j = new PageToJson(['table']);
        return p2j.convertUrl().catch(e => expect(e).toMatch('Not yet implemented'));
    });
});
