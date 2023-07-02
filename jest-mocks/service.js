const repo = require('./repository');

function add() {
   let number = repo.save();
   console.log(number);
   return number;
}

module.exports = {
   add,
}