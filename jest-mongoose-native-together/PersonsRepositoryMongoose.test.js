'use strict';

const mongoose = require('mongoose');
const { GenericContainer } = require("testcontainers");
const PersonsRepositoryMongoose = require("./PersonsRepositoryMongoose");
const PersonsRepositoryNative = require("./PersonsRepositoryNative");

describe('MongoDb', () => {
   let container;

   let personDao1;
   let personDao2;
   let personDao3;

   let repoMongoose;
   let repoNative;

   beforeAll(async () => {
      // container = await new GenericContainer("mongo")
      //    .withExposedPorts(27017)
      //    .start();
      // personsRepository = new PersonsRepository(`mongodb://localhost:${container.getFirstMappedPort()}`);
      const uri = 'mongodb://localhost:27017';
      const db = 'test';
      repoMongoose = new PersonsRepositoryMongoose(`${uri}/${db}`);
      repoNative = new PersonsRepositoryNative(uri, db);
   })

   beforeEach(() => {
      personDao1 = {
         id: 1,
         name: 'name1',
         surname: 'surname1',
         birthdate: new Date(2011, 1, 1),
      };

      personDao2 = {
         id: 2,
         name: 'name2',
         surname: 'surname2',
         birthdate: new Date(2012, 2, 2),
      };

      personDao3 = {
         id: 3,
         name: 'name3',
         surname: 'surname3',
         birthdate: new Date(2013, 3, 3),
      };
   })

   afterEach(async () => {
      repoNative.getCollection().deleteMany();
   })

   afterAll(async () => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.connection.close();

      // await container.stop();
   })

   test('save mongoose, find native', async () => {
      await repoMongoose.save(personDao1);
      await repoMongoose.save(personDao2);
      let persons = await (await repoNative.findAll()).toArray();
      for (const person of persons) {
         delete person._id;
         delete person.__v;
      }
      expect(persons).toEqual([personDao1, personDao2]);
   });
});