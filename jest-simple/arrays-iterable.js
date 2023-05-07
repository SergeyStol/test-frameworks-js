const arr = ['a', 'b', 'c', 'd', 'e',];

function getArray(...elements) {
   return elements;
}

function getSet(...elements) {
   return new Set(elements);
}

module.exports = {
   getArray: getArray,
   getSet: getSet
}