'use strict';

const supplier = require('./arrays-iterable.js');

describe('Primitives', () => {

   test('should contain "b"', () => {
      expect(supplier.getArray('a', 'b', 'c')).toContain('b');
      expect(supplier.getArray('a', 'b', 'c')).not.toContain('d');
   });

   test('should contain "b"', () => {
      expect(supplier.getSet('a', 'b', 'c')).toContain('b');
      expect(supplier.getSet('a', 'b', 'c')).not.toContain('d');
   });

});