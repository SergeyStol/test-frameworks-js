"use strict";

describe('Simple examples', () => {

   test('adds 1 + 2 to equal 3', () => {
      expect(3).toBe(3);
   });

   test('concat "abc" & "def" to equal "abc def"', () => {
      expect("abc def").toBe("abc def");
   });

   test('get Date 2020-01-01 plus 10 should return 2020-01-11', () => {
      expect(new Date("2020-01-01")).toEqual(new Date("2020-01-01"));
      expect(new Date("2020-01-01")).toStrictEqual(new Date("2020-01-01"));
   });

   // https://stackoverflow.com/questions/54329398/tests-on-jest-and-new-date
   test('test current date', async () => {
      const spy = jest.spyOn(global, "Date");
      const currentDateActual = new Date();
      const currentDateExpected = spy.mock.instances[0];

      // https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time
      await new Promise(resolve => setTimeout(resolve, 1000));

      expect(currentDateActual).toEqual(currentDateExpected);
   });

   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('toBeUndefined', () => {
      expect(undefined).toBeUndefined();
   });

   test('toBeDefined', () => {
      expect(1).toBeDefined();
   });

   test('toBeNull', () => {
      expect(null).toBeNull();
   });

   test('toBeTruthy', () => {
      expect(true).toBeTruthy();
      expect({}).toBeTruthy();
      expect([]).toBeTruthy();
      expect(1).toBeTruthy();
      expect("0").toBeTruthy();
      expect("false").toBeTruthy();
      expect(new Date()).toBeTruthy();
      expect(-1).toBeTruthy();
      expect(12n).toBeTruthy();
      expect(3.14).toBeTruthy();
      expect(-3.14).toBeTruthy();
      expect(Infinity).toBeTruthy();
      expect(-Infinity).toBeTruthy();

      expect(true).toBe(true);
   });

   test('toBeFalsy', () => {
      expect(false).toBeFalsy();
      expect(null).toBeFalsy();
      expect(undefined).toBeFalsy();
      expect(NaN).toBeFalsy();
      expect(0).toBeFalsy();
      expect(-0).toBeFalsy();
      expect(0n).toBeFalsy();
      expect("").toBeFalsy();
      // expect(document.all).toBeFalsy();

      expect(false).toBe(false);
   });
});