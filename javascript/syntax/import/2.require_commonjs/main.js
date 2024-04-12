//CommonJS is the module system used in Node.js
// module.exports = { add }; 로 export,
// require()로 import
// node에서 default로 쓰는 import system. es6에서는 안쓰나봄. 

// main.js
const { add } = require('./math.js');
console.log(add(2, 3)); // Output: 5