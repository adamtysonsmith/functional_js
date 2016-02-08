//////////////////////////////////////
// EXAMPLE 1: Reducing to a number
//////////////////////////////////////
var nums = [1, 2, 3, 4, 5, 6, 7];

// We want to average the numbers
function average(result, item, index, array) {
  var currentValue = result + item;
  
  if (index === array.length - 1) {
    return currentValue / array.length;
  } else {
    return currentValue;
  }
}

var mean = nums.reduce(average, 0);
console.log('The average is', mean);

/* RESULT ==>
   The average is 4
*/


//////////////////////////////////////
// EXAMPLE 2: Reducing to an object
//////////////////////////////////////
var animals = [
  { name: 'giraffe', color: 'orange', region: 'Africa' },
  { name: 'lion', color: 'tan', region: 'Africa' },
  { name: 'polar bear', color: 'white', region: 'North Pole' },
  { name: 'black bear', color: 'black', region: 'North America' },
  { name: 'teddy bear', color: 'brown', region: 'North America' }
];

// We want an object that groups animals by region
function animalsToObject(result, item, index, array) {
  result[item.region] = result[item.region] || [];
  result[item.region].push({
    name: item.name,
    color: item.color
  });
  return result;
}

var animalsByRegion = animals.reduce(animalsToObject, {});
console.log('Animals by region', animalsByRegion);

/* RESULT ==>
   Animals by region 
   { 
     'Africa': [ 
       { name: 'giraffe', color: 'orange' },
       { name: 'lion', color: 'tan' } 
      ],
     'North Pole': [ 
       { name: 'polar bear', color: 'white' } 
      ],
     'North America': [
       { name: 'black bear', color: 'black' },
       { name: 'teddy bear', color: 'brown' } 
      ]
   }
*/


//////////////////////////////////////
// EXAMPLE 3: Reducing to an object
//////////////////////////////////////
var votes = [
  'Hilary Clinton',
  'Hilary Clinton',
  'Bernie Sanders',
  'Chuck Norris',
  'Bernie Sanders',
  'Chuck Norris',
  'Chuck Norris',
  'Chuck Norris',
  'Chuck Norris',
  'Inanimate potato',
  'Donald Trump',
  'Inanimate potato',
  'Inanimate potato'
]

function tallyVotes(result, item, index, array) {
  if (!result[item]) {
    // Create a new key if it does't exist
    result[item] = 1;
  } else {
    // Increment the vote for this key
    result[item] += 1;
  }
  
  return result;
}

var tally = votes.reduce(tallyVotes, {});
console.log('The presidential election results', tally);

/* RESULT ==>
   The presidential election results
   { 
    'Hilary Clinton': 2,
    'Bernie Sanders': 2,
    'Chuck Norris': 5,
    'Donald Trump': 1,
    'Inanimate potato': 2
  }
  
*/



//////////////////////////////////////
// EXAMPLE 4: Implementing Map
//////////////////////////////////////
var doubled = nums.reduce(function(result, item) {
  result.push(item * 2);
  return result;
}, []);

// Reduces to new array with the same length
console.log('Mapping Nums', doubled);

/* RESULT ==> 
   Mapping Nums [ 2, 4, 6, 8, 10, 12, 14 ]
*/



//////////////////////////////////////
// EXAMPLE 5: Implementing Filter
//////////////////////////////////////
var evens = nums.reduce(function(result, item) {
  if (item % 2 === 0) {
    result.push(item);
  }
  return result;
}, []);

// Reduces to new array with only even numbers
console.log('Filtering Evens', evens);

/* RESULT ==> 
   Filtering Evens [ 2, 4, 6 ]
*/



//////////////////////////////////////
// EXAMPLE 6: Flat Map
//////////////////////////////////////
var movies = [
  {
    title: "Batman Begins",
    year: 2005,
    cast: [
      "Christian Bale",
      "Michael Caine",
      "Liam Neeson",
      "Katie Holmes",
      "Gary Oldman",
      "Cillian Murphy"
    ]
  },
  {
    title: "The Dark Knight",
    year: 2008,
    cast: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine",
      "Maggie Gyllenhal",
      "Gary Oldman",
      "Morgan Freeman"
    ]
  },
  {
    title: "The Dark Knight Rises",
    year: 2012,
    cast: [
      "Christian Bale",
      "Gary Oldman",
      "Tom Hardy",
      "Joseph Gordon-Levitt",
      "Anne Hathaway",
      "Marion Cotillard",
      "Morgan Freeman",
      "Michael Caine"
    ]
  }
];

var actors = movies.reduce(function(result, item) {
  item.cast.forEach(function(actor) {
    if (result.indexOf(actor) === -1) {
      result.push(actor);
    }
  })
  return result;
}, []);

// Pushes each actor name into a new array
console.log('The actors', actors);

/* RESULT ==> 
   The actors [ 
    'Christian Bale',
    'Michael Caine',
    'Liam Neeson',
    'Katie Holmes',
    'Gary Oldman',
    'Cillian Murphy',
    'Heath Ledger',
    'Aaron Eckhart',
    'Maggie Gyllenhal',
    'Morgan Freeman',
    'Tom Hardy',
    'Joseph Gordon-Levitt',
    'Anne Hathaway',
    'Marion Cotillard' 
  ]
  
*/



/////////////////////////////////////////
// EXAMPLE 7: Using reduce for pipelines
/////////////////////////////////////////
function increment(x) { return x + 1; }
function decrement(x) { return x - 1; }
function double(x) { return x * 2; }
function half(x) { return x / 2; }

var initial = 10;

var pipeline = [
  increment,
  increment,
  double,
  double,
  half,
  decrement
];

var transformed = pipeline.reduce(function(value, func) {
  // Return a value each time
  return func(value);
}, initial);

// This will pass the value through all the functions
console.log('The transformed result is', transformed);

/* RESULT ==> 
   The transformed result is 23
*/



/////////////////////////////////////////
// EXAMPLE 8: Passing an initial data structure
/////////////////////////////////////////
var initialData = {
  a: [],
  b: [],
  c: []
}

