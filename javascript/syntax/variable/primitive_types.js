//case1) string
const str = "Hello, world!"; // String primitive
console.log(typeof str); // Output: "string"

//case2) Number
const num = 42; // Number primitive
console.log(typeof num); // Output: "number"

//case3) Boolean
const bool = true; // Boolean primitive
console.log(typeof bool); // Output: "boolean"

//case4) BigInt
const bigint = BigInt(10); // BigInt primitive
console.log(typeof bigint); // Output: "bigint"

//case5) null
const n = null; // Null primitive
console.log(typeof n); // Output: "object" (Note: typeof null is "object", which is a historical quirk/bug in JavaScript)

//case6) undefined
let u; // Undefined primitive
console.log(typeof u); // Output: "undefined"