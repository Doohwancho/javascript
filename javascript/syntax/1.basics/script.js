// console.log('Hello World from JS!');

var firstName = "John";
console.log(firstName);

var lastName = "Smith";
age = 28;

var fullAge = true;
console.log(fullAge);

var job;
console.log(job); //undefined

job = 'Teacher';
console.log(job);

/***************************
 * variable mutation and type coercion
 */

var firstName = 'Jone';
var age = 28;

//automatic type conversion
console.log(firstName + ' ' + age); 

var job, isMarried;
job = 'teacher';
isMarried=false;

console.log(firstName+' is a '+age+' year old'+job +'. Is he married? '+ isMarried);

//Variable mutation
age = 'twenty eight';
job = 'driver';

var lastName = prompt('what is his last name?');
console.log(firstName + ' '+lastName);


/****************
 * Basic operator
 */

var year, yearJohn, yearMark;
now = 2018
ageJohn = 28;
ageMark = 33;

//Math operators
yearJohn = now-28;
yearMark = now-23;
console.log(yearJohn);

console.log(now+2);
console.log(now*2);
console.log(now/2);

// Logical operators
var johnOlder = ageJohn > ageMark;
console.log(johnOlder);

// typeof operator -- 단, 작동 이상하다고 비판받음.
console.log(typeof johnOlder);
console.log(typeof ageJohn);
console.log(typeof 'Mark is older than John');
var x;
console.log(typeof x); //undefined

/*******************
 *  Operator precedence
 */

var now = 2018;
var yearJohn = 1989;
var fullAge = 18;

//Multiple operator
var isFullAge = now - yearJohn >= fullAge;

//Grouping
var ageJohn = now - yearJohn;
var ageMark = 35;
var average = (ageJohn+ageMark) / 2;
console.log(average);

//Multiple assignments
var x, y;
x = y = (3 + 5) * 4 - 6;

//More operator
x *= 2;
x += 10;
x++;


/*********************
 * If /else statements
 */

var firstName = 'John';
var civilStatus = 'single';

if(civilStatus === 'married'){
    console.log(firstName + ' is married!');
} else {
    console.log(":(");
}

var isMarried = true;
if(isMarried){
    console.log(firstName + ' is married!');
} else {
    console.log(":(");
}


//ternary operator
var age = 14;
age >= 18 ? console.log('1') : console.log('2');

//switch statemenet
var job = 'teacher';
switch(job){ //put true instead of job(sometimes)
    case 'teacher':
        console.log('1');
        break;
    case 'driver':
        console.log('2');
        break;
    default:
        console.log('3');
        break;
}

/***********************************
 *  truthy and falsy value and equality operators
 */

// falsy values: undefined, null, 0, '', NaN
// truthy values: NOT falsy values

var height;
height = 23;

if(height || height === 0){ //way of checking whether variable is defined, except for variable = 0;
    console.log('Variable is defined');
} else {
    console.log('Variable has NOT been defined'); // triggered
}

if(height == '23') { //true
    console.log('The == operator does type coercion!');
}

if(height === '23') { //false. more stricter
    console.log('The == operator does type coercion!');
}


/***************************
 * Functions
 */

function calculateAge(birthYear){
    return 2018 - birthYear;
}
const myAge = calculateAge(1993);
const herAge = calculateAge(1993);
console.log(myAge, herAge);

function yearsUntilRetirement(year, firstName){
    var age = calculateAGe(year);
    var retirement = 65- age;
    console.log(firstName+ ' retires in ' + retirement + ' years.');
}

yearsUntilRetirement(1990, 'John');


/*************************
 * Function Statements and Expressions
 */

//Function declaration
//function whatDoYouDo(job, firstName){}

// Function expression
var whatDoYouDo = function(job, firstName){
switch(job){
    case 'teacher':
        return firstName + 'teaches kids how to code';
    case 'driver':
        return firstName + 'drives a cab in Lisbon.'
    default:
        return firstName + 'does something else';
}
}
console.log(whatDoYouDo('teacher','John'));



/**********************
 * Arrays
 */

var names = ['John','Mark','Jane'];
var years = new Array(1990, 1969, 1948);

console.log(names[0]);

//Mutate array data
names[1] = 'Ben';
names[5] = 'Marry'; //3,4 == empty
names[names.length]= 'Tom' //가장 마지막 index에 더하는 방법
console.log(names);

// Different data types
var john = ['John', 'Smith', 1990, 'teacher', false];
john.push('blue');
john.unshift('Mr.'); //push to index 0
john.pop(); //removes element from the end
john.shift(); //removes element from the start
console.log(john);

//3항연산자
var isDesigner = john.indexOf('designer') === -1 ? 'John is NOT a designer' : 'John IS a designer';


/*******************************
 * Objects and properties
 */

 //Object literal
var john = {
    firstName: 'John',
    lastName: 'Smith',
    birthYear: 1990,
    family: ['Jane','Mark','Bob','Emily'],
    job: 'teacher',
    isMarried: false
};
console.log(john.firstName);
console.log(john['job']);
var x = 'birthYear';
console.log(john[x]);

//mutate the data
john.job = 'designer';
john['isMarried'] = true;

// new Object syntax
var jane = new Object();
jane.name = 'Jane';
jane.birthYear = 1969;
jane['lastName'] = 'Smith';
console.log(jane);



/****************************
 * Objects and methods
 */

var john = {
    firstName: 'John',
    lastName: 'Smith',
    birthYear: 1990,
    family: ['Jane','Mark','Bob','Emily'],
    job: 'teacher',
    isMarried: false,
    calcAge: function(){
        this.age = 2019-this.birthYear; //this points to its object
    }
};
// var age = john.calcAge();
// john.age = john.calcAge();
console.log(john);



/*******************************
 * Loops and Iteration
 */

for(var i = 0; i < 10; i++){
    console.log(i);
}

var i = 0;
while(i < john.length){
    console.log(john[i]);
    i++;
}






















