'use strict';

const mongoose = require('mongoose');

class PersonsRepository {
   constructor(uri) {
      console.log(`DB connection string: ${uri}`);
      mongoose.connect(uri);
      this.personSchema = new mongoose.Schema({
         id: Number,
         name: String,
         surname: String,
         birthdate: Date
      });
      this.PersonModel = mongoose.model('persons', this.personSchema);
   }

   async save(person) {
      return person.save();
   }

   async addNewPersons(persons) {
      if (persons?.length === 0)
         return [];
      const ops = persons.map(person => ({
         updateOne: {
            filter: { id: person.id },
            update: { $setOnInsert: person },
            upsert: true,
         },
      }));

      let result = await this.PersonModel.bulkWrite(ops, { ordered: false });
      return result.getUpsertedIds().map(el => el._id.toString());
   }

   async findAll() {
      let personModel = await this.PersonModel.find();
      return personModel
         .map(personModel => personModel.toJSON());
   }

   async find(id) {
      return (await this.PersonModel.find({"id": id}))[0].toJSON();
   }

   async findPersonsAndGetIdsOnly(_ids) {
      let personsIds = await this.PersonModel.find({
         _id: {$in: _ids}
      }).select('id');
      return personsIds.map(personId => personId.id.toString());
   }

   async deleteOne(id) {
      return this.PersonModel.deleteOne({"id": id});
   }

   async updateOne(filter, updateData) {
      return this.PersonModel.updateOne(filter, updateData);
   }

   getModel() {
      return this.PersonModel;
   }

   getSchema() {
      return this.personSchema;
   }
}

module.exports = PersonsRepository