'use strict';

const { MongoClient } = require("mongodb");

const PERSONS_COLLECTION_TITLE = 'persons';

class PersonsRepositoryNative {
   constructor(uri, db) {
      this.mongoClient = new MongoClient(uri);
      this.database = this.mongoClient.db(db);
      this.persons = this.database.collection(PERSONS_COLLECTION_TITLE);
   }

   async findAll() {
      return this.persons.find();
   }

   getCollection() {
      return this.persons;
   }
}

module.exports = PersonsRepositoryNative;