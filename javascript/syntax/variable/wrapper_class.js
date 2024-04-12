//case1) String
const str = new String("Hello"); // String object wrapper
console.log(typeof str); // Output: "object"
console.log(str.length); // Output: 5 (Accessing property of the string object wrapper)

//case2) Number
const num = new Number(42); // Number object wrapper
console.log(typeof num); // Output: "object"
console.log(num.toFixed(2)); // Output: "42.00" (Using method of the number object wrapper)

//case3) Boolean
const bool = new Boolean(true); // Boolean object wrapper
console.log(typeof bool); // Output: "object"
console.log(bool.valueOf()); // Output: true (Using method of the boolean object wrapper)

//case4) Symbol
const sym = Symbol("foo"); // Symbol primitive
const symObj = Object(sym); // Symbol object wrapper
console.log(typeof symObj); // Output: "object"
