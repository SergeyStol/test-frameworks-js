'use strict';

process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const PersonsRepository = require("./persons-repository");
const {config} = require("./config");

describe('MongoDb', () => {
   let personsRepository;

   let PersonModel;
   let personDao;
   let personDao2;
   let personSchema;

   beforeAll(() => {
      personsRepository = new PersonsRepository(config.db.uri);
      PersonModel = personsRepository.model;
      personDao = new PersonModel({
         id: 1,
         name: 'Sergey',
         surname: 'Stol',
         birthdate: Date.now()
      });
      personSchema = new mongoose.Schema({
         id: { type: Number, unique: true },
         name: String,
         surname: String,
         birthdate: Date
      });
   })

   beforeEach(() => {
      personDao = new PersonModel({
         id: 1,
         name: 'Sergey',
         surname: 'Stol',
         birthdate: Date.now()
      });

      personDao2 = new PersonModel({
         id: 2,
         name: 'Andrew',
         surname: 'Ivanov',
         birthdate: Date.now()
      });
   })

   afterEach(async () => {
      await PersonModel.deleteMany();
   })

   afterAll(async () => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.connection.close();
   })

   test('should save Person', async () => {
      await personDao.save();
      let savedPerson = await personsRepository.save(personDao);
      expect(savedPerson).toStrictEqual(personDao);
   });

   test('should find all persons', async () => {
      await personDao.save();
      let persons = await personsRepository.findAll();
      expect(persons.length).toBe(1);
      expect(persons[0]).toStrictEqual(personDao.toJSON());
   });

   test('should find all persons2', async () => {
      await personDao.save();
      await personDao2.save();
      let persons = await personsRepository.findAll();
      expect(persons.length).toBe(2);
      expect(persons[0]).toStrictEqual(personDao.toJSON());
      expect(persons[1]).toStrictEqual(personDao2.toJSON());
   });

   test('should find person by id', async () => {
      await personDao.save();
      await personDao2.save();
      let person = await personsRepository.find(personDao.toJSON().id);
      expect(person).toStrictEqual(personDao.toJSON());
   });

   test('should delete person by id', async () => {
      await personDao.save();
      let query = await personsRepository.deleteOne(personDao.toJSON().id);
      expect(query.deletedCount).toBe(1);
      let persons = await PersonModel.find();
      expect(persons.length).toBe(0);
   });

   test('should update person by filter', async () => {
      await personDao.save();
      const query =
         await personsRepository.updateOne({"id": personDao.toJSON().id},
            {"name": "Sergey2"});
      expect(query.matchedCount).toBe(1);
      expect(query.modifiedCount).toBe(1);
      const personActual = (await PersonModel.find({"id": personDao.toJSON().id}))[0].toJSON();
      const personExpected = personDao.toJSON();
      personExpected.name = 'Sergey2';
      expect(personActual).toStrictEqual(personExpected);
   });
});