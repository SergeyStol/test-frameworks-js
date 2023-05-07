'use strict';

const mongoose = require('mongoose');

class PersonsRepository {
   #personSchema = new mongoose.Schema({
      id: { type: Number, unique: true },
      name: String,
      surname: String,
      birthdate: Date
   });
   #PersonModel = mongoose.model('persons', this.#personSchema);

   constructor(uri) {
      console.log(`DB connection string: ${uri}`);
      mongoose.connect(uri);
   }

   async save(person) {
      return person.save();
   }

   async findAll() {
      let personModel = await this.#PersonModel.find();
      return personModel
         .map(personModel => personModel.toJSON());
   }

   async find(id) {
      return (await this.#PersonModel.find({"id": id}))[0].toJSON();
   }

   async deleteOne(id) {
      return this.#PersonModel.deleteOne({"id": id});
   }

   async updateOne(filter, updateData) {
      return this.#PersonModel.updateOne(filter, updateData);
   }

   get model() {
      return this.#PersonModel;
   }

   get schema() {
      return this.#personSchema;
   }
}

module.exports = PersonsRepository