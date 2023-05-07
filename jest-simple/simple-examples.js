'use strict'

function sum(a, b) {
   return a + b;
}

function concat(a, b) {
   return `${a} ${b}`
}

function getDate(date, days) {
   date.setDate(date.getDate() + days);
   return date;
}

function getUndefined() {
   let x;
   return x;
}

function getUndefined2() {
}

function getNull() {
   return null;
}

function getTrue() {
   return true;
}

function getFalse() {
   return false;
}

const a = 12345..toString(36);
module.exports = {
   sum: sum,
   concat: concat,
   getDate: getDate,
   getUndefined: getUndefined,
   getNull: getNull,
   getTrue: getTrue,
   getUndefined2: getUndefined2,
   getFalse: getFalse
};