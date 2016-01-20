var _ = require('lodash');

//////////////////////////////////////
// Functions as units of abstraction
//////////////////////////////////////
function parseAge(age) {
  if (!_.isString(age)) fail('Expecting a String');
  var a;
  
  note('Attempting to parse an age', age);
  
  a = parseInt(age, 10);
  if (isNaN(a)) {
    warn('Could not parse age', age)
    a = 0;
  }
  
  return a;
}

// Abstract the error handling
function fail(thing) {
  throw new Error(thing);
}

function warn(message, thing) {
  console.log('**WARNING: ' + message + ' (' + thing + ')');
}

function note(message, thing) {
  console.log('*NOTE: ' + message + ' (' + thing + ')');
}

//console.log(parseAge('42'));
//console.log(parseAge('Adam'));
//console.log(parseAge(42));


//////////////////////////////////////
// Functions as units of behavior
//////////////////////////////////////
var letters = ['a', 'b', 'c', 'd', 'e', 'f'];

// Abstracting the behavior of indexing into a function
function nth(data, index) {
  if (!_.isNumber(index)) fail('Expected a number as the index');
  if (!isIndexed(data)) fail('Not supported on non-indexed type');
  if ((index < 0) || (index > data.length)) fail('Indexed value is out of bounds');
    
  return data[index];
}

function isIndexed(data) {
  return _.isArray(data) || _.isString(data)
}

//console.log(nth(letters, 4));
//console.log(nth('Hey There!', 4));
//console.log(nth(letters, 7));
//console.log(nth({}, 2));
//console.log(nth({}, '2'));

// Now we can build further abstractions
function second(data) {
  return nth(data, 1);
}

//console.log(second(['Willy', 'Wonka']));
//console.log(second({}));

// Fun with native sorting
// By default, the Array#sort method does a string comparison
// We can pass it a comparator function
var sorty = [2, 3, -1, -6, 0, -108, 42, 10].sort(compareInts);

// Comparator function
function compareInts(x, y) {
  if (x < y) return -1;
  if (x > y) return 1;
  return 0;
}

// Predicate functions can be more useful for controlling sort order
function ascending(x, y) {
  return x <= y;
}

function descending(x, y) {
  return x >= y;
}

var sortAscending  = [2, 3, -1, -6, 0, -108, 42, 10].sort(ascending);
var sortDescending = [2, 3, -1, -6, 0, -108, 42, 10].sort(descending);

//console.log(sorty);
//console.log(sortAscending);
//console.log(sortDescending);


//////////////////////////////////////
// Data as abstraction
//////////////////////////////////////
var csvData = 'NAME,AGE,HAIR\nMerble,35,red\nBob,64,blonde\nAdam,29,brown';
var peopleTable = lameCSV(csvData);

function lameCSV(str) {
  return _.reduce(str.split('\n'), function(table, row) {
    table.push(_.map(row.split(','), function(c) { 
      return c.trim(); 
    }));
    return table;
  }, []);
}

// These selector functions assume you know the structure of the table
function selectName(table) {
  return _.tail(_.map(table, _.first));
}

function selectAge(table) {
  return _.tail(_.map(table, second));
}

function selectHairColor(table) {
  return _.tail(_.map(table, function(row){
    return nth(row, 2);
  }));
}

var mergeResults = _.zip;

//console.log(peopleTable);
//console.log(_.tail(peopleTable).sort())
//console.log(selectName(peopleTable))
//console.log(selectAge(peopleTable))
//console.log(selectHairColor(peopleTable))

// Composes nicely
//console.log(mergeResults(selectName(peopleTable).sort(), selectAge(peopleTable)));


//////////////////////////////////////
// Moar functional programming
//////////////////////////////////////

// Some useful functions, please use them!
function existy(x) { 
  return x != null;
}

function truthy(x) {
  return (x !== false) && existy(x);
}

//console.log('Should be false', existy(null))
//console.log('Should be false', existy(undefined))
//console.log('Should be false', existy({}.notHere))
//console.log('Should be false', existy(function(){}));
//console.log('Should be true', existy(0))
//console.log('Should be true', existy(false))
//
//console.log('Should be false', truthy(false))
//console.log('Should be false', truthy(undefined))
//console.log('Should be true', truthy(0))
//console.log('Should be true', truthy(''))

