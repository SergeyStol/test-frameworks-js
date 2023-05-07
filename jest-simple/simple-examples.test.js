'use strict';

const supplier = require('./simple-examples')

describe('Primitives', () => {

   test('adds 1 + 2 to equal 3', () => {
      expect(supplier.sum(1, 2)).toBe(3);
   });

   test('concat "abc" & "def" to equal "abc def"', () => {
      expect(supplier.concat("abc", "def")).toBe("abc def");
   });

   test('get Date 2020-01-01 plus 10 should return 2020-01-11', () => {
      expect(supplier.getDate(new Date("2020-01-01"), 10)).toEqual(new Date("2020-01-11"));
      expect(supplier.getDate(new Date("2020-01-01"), 10)).toStrictEqual(new Date("2020-01-11"));
   });

   test('toBeUndefined', () => {
      expect(supplier.getUndefined()).toBeUndefined();
      expect(supplier.getUndefined2()).toBeUndefined();
   });

   test('toBeDefined', () => {
      expect(supplier.sum(1, 2)).toBeDefined();
   });

   test('toBeNull', () => {
      expect(supplier.getNull()).toBeNull();
   });

   test('toBeTruthy', () => {
      expect(supplier.getTrue()).toBeTruthy();
      expect(supplier.sum(1, 3)).toBeTruthy();
   });

   test('toBeFalsy', () => {
      expect(supplier.getFalse()).toBeFalsy();
      expect(supplier.getNull()).toBeFalsy();
      expect(supplier.getUndefined()).toBeFalsy();
   });

});