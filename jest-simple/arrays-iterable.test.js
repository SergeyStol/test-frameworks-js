'use strict';

const supplier = require('./arrays-iterable.js');

describe('Arrays, Iterable', () => {
   test('Check if one of arrays is subset of another', () => {
      expect(['a', 'b', 'c']).toEqual(expect.arrayContaining(['a', 'b', 'c']));
      expect(['a', 'b', 'c']).toEqual(expect.arrayContaining(['a', 'b']));
      expect(['a', 'b', 'c']).toEqual(expect.arrayContaining(['a']));
      expect(['a', 'b']).not.toContain(['a', 'b', 'c']);
   });

   test('Array should contain at least once', () => {
      expect(['a', 'b', 'c']).toContain('b');
      expect(['a', 'b', 'c', 'b']).toContain('b');
      expect(['a', 'b', 'c']).not.toContain('d');
   });

   test('Arrays should be exactly the same', () => {
      expect(['a', 'b']).toEqual(['a', 'b']);
      expect(['a', 'b']).not.toEqual(['a', 'b', 'c']);
      expect(['a', 'b', 'c']).not.toEqual(['a', 'b']);
   });

   test('Check for empty array', () => {
      expect([]).toEqual([]);
      expect([]).toEqual(expect.arrayContaining([]));
   });
});