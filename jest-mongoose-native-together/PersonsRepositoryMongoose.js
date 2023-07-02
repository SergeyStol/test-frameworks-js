'use strict';

const mongoose = require('mongoose');

const PERSONS_COLLECTION_TITLE = 'persons';

class PersonsRepositoryMongoose {
   constructor(uri) {
      console.log(`DB connection string: ${uri}`);
      mongoose.connect(uri);
      this.personSchema = new mongoose.Schema({
         id: { type: Number, unique: true },
         name: String,
         surname: String,
         birthdate: Date
      });
      this.PersonModel = mongoose.model(PERSONS_COLLECTION_TITLE, this.personSchema);
   }

   async save(person) {
      return new this.PersonModel(person).save();
   }

   async findAll() {
      let personModel = await this.PersonModel.find();
      return personModel
         .map(personModel => personModel.toJSON());
   }

   async find(id) {
      return (await this.PersonModel.find({"id": id}))[0].toJSON();
   }

   async deleteOne(id) {
      return this.PersonModel.deleteOne({"id": id});
   }

   async updateOne(filter, updateData) {
      return this.PersonModel.updateOne(filter, updateData);
   }

   async addNewPersons(persons) {
      if (!persons || persons.length === 0) {
         return [];
      }
      const ops = persons.map(person => ({
         updateOne: {
            filter: { personId: person.personId },
            update: { $setOnInsert: person },
            upsert: true,
         },
      }));
      if (!ops || ops.length === 0) {
         return [];
      }
      let result = await this.PersonModel.bulkWrite(ops, { ordered: false });
      return result.getUpsertedIds().map(el => el._id.toString());
   }

   getModel() {
      return this.PersonModel;
   }

   getSchema() {
      return this.personSchema;
   }
}

module.exports = PersonsRepositoryMongoose