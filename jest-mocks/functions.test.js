// const jest = require("jest");
const repo = require('./repository');
const service = require('./service');

jest.mock('./repository', () => {
   return {
      save: jest.fn(() => 321)
   };
});

describe('add', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('should call repo.save', () => {
      // Call the add function
      service.add();

      // Assert that repo.save is called
      expect(repo.save).toHaveBeenCalledTimes(1);
   });
});