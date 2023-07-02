describe('MongoDb', () => {
   test("should save Person", () => {
      expect({a: 1, b: 2}).toEqual({a: 1, b: 2});
   })
   test("should save Person", () => {
      expect({a: 1, b: 2}).not.toEqual({a: 1});
   })
   test("should save Person", () => {
      expect({a: 1}).not.toEqual({a: 1, b: 2});
   })

   test("should save Person", () => {
      expect({a: 1, b: {A: 1, B: 2}}).toEqual({a: 1, b: {A: 1, B: 2}});
   })
   test("should save Person", () => {
      expect({a: 1, b: {A: 1, B: 2}}).not.toEqual({a: 1, b: {A: 1}});
   })
   test("should save Person", () => {
      expect({a: 1, b: {A: 1}}).not.toEqual({a: 1, b: {A: 1, B: 2}});
   })

   test("should save Person", () => {
      expect({a: 1, b: {A: 1, B: {AA: 1, BB:1}}}).toEqual({a: 1, b: {A: 1, B: {AA: 1, BB:1}}});
   })
   test("should save Person", () => {
      expect({a: 1, b: {A: 1, B: {AA: 1, BB:1}}}).not.toEqual({a: 1, b: {A: 1, B: {AA: 1}}});
   })
   test("should save Person", () => {
      expect({a: 1, b: {A: 1, B: {AA: 1}}}).not.toEqual({a: 1, b: {A: 1, B: {AA: 1, BB:1}}});
   })

   test("check if expected object is a subset of the received object", () => {
      expect({a: 1, b: 2, c: 3}).toMatchObject({a: 1, b: 2});
   })
})