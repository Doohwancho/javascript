// ECMAScript Modules (ESM) is the standard module system for modern JavaScript
// 주의!) node는 es6 지원을 안하기 때문에, .mjs로 바꾸어서 실행해주자.
import { add } from './math.mjs';

console.log(add(3, 3)); // Output: 6