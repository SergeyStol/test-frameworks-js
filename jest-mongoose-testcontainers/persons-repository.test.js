'use strict';

const mongoose = require('mongoose');
const { GenericContainer } = require("testcontainers");
const PersonsRepository = require("./persons-repository");

describe('MongoDb', () => {
   let container;

   let PersonModel;
   let personDao1;
   let personDao2;
   let personDao3;

   let personsRepository;

   beforeAll(async () => {
      container = await new GenericContainer("mongo")
         .withExposedPorts(27017)
         .start();
      personsRepository = new PersonsRepository(`mongodb://localhost:${container.getFirstMappedPort()}`);
      PersonModel = personsRepository.getModel();
   })

   beforeEach(() => {
      personDao1 = {
         id: 1,
         name: 'name1',
         surname: 'surname1',
         birthdate: Date.now(),
      };

      personDao2 = {
         id: 2,
         name: 'name2',
         surname: 'surname2',
         birthdate: Date.now(),
      };

      personDao3 = {
         id: 3,
         name: 'name3',
         surname: 'surname3',
         birthdate: Date.now(),
      };
   })

   afterEach(async () => {
      await PersonModel.deleteMany();
   })

   afterAll(async () => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.connection.close();

      await container.stop();
   })

   test('should save Person', async () => {
      await personDao1.save();
      let savedPerson = await personsRepository.save(personDao1);
      expect(savedPerson).toStrictEqual(personDao1);
   });

   test('should find all persons', async () => {
      await personDao1.save();
      let persons = await personsRepository.findAll();
      expect(persons.length).toBe(1);
      expect(persons[0]).toStrictEqual(personDao1.toJSON());
   });

   test('should find all persons2', async () => {
      await personDao1.save();
      await personDao2.save();
      let persons = await personsRepository.findAll();
      expect(persons.length).toBe(2);
      expect(persons[0]).toStrictEqual(personDao1.toJSON());
      expect(persons[1]).toStrictEqual(personDao2.toJSON());
   });

   test('should find person by id', async () => {
      await personDao1.save();
      await personDao2.save();
      let person = await personsRepository.find(personDao1.toJSON().id);
      expect(person).toStrictEqual(personDao1.toJSON());
   });

   test('should delete person by id', async () => {
      await personDao1.save();
      let query = await personsRepository.deleteOne(personDao1.toJSON().id);
      expect(query.deletedCount).toBe(1);
      let persons = await PersonModel.find();
      expect(persons.length).toBe(0);
   });

   test('should update person by filter', async () => {
      await personDao1.save();
      const query =
         await personsRepository.updateOne({"id": personDao1.toJSON().id},
            {"name": "Sergey2"});
      expect(query.matchedCount).toBe(1);
      expect(query.modifiedCount).toBe(1);
      const personActual = (await PersonModel.find({"id": personDao1.toJSON().id}))[0].toJSON();
      const personExpected = personDao1.toJSON();
      personExpected.name = 'Sergey2';
      expect(personActual).toStrictEqual(personExpected);
   });

   test('addNewPersons should add just new persons', async () => {
      await new PersonModel(personDao1).save();

      let addedPersonsIds = await personsRepository.addNewPersons([personDao1, personDao2, personDao3]);
      expect(addedPersonsIds.length).toBe(2);
      let persons = await PersonModel.find();
      

      const query2 =
         await personsRepository.addNewPersons([personDao1, personDao2]);
      expect(query2.matchedCount).toBe(1);
      expect(query2.modifiedCount).toBe(1);
      const personActual = (await PersonModel.find({"id": personDao1.toJSON().id}))[0].toJSON();
      const personExpected = personDao1.toJSON();
      personExpected.name = 'Sergey2';
      expect(personActual).toStrictEqual(personExpected);
   });
});