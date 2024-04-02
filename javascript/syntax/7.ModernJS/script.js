// Lecture : let and const

/*
// ES5
var name5 = 'Jane Smith';
var age5 = s3;
name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6); //error - assignment to constant variable
*/

/*
// ES5
function driversLicense5(passedTest){
    if(passedTest){
        console.log(firstName); //undefined
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    //var is function scoped. if console.log were moved outside the function driversLicense5, it would not work.
    console.log(firstName + ', born in '+yearOfBirth+' , is now officially allowed to drive a car.');
}

driversLicense5(true);

// ES6
function driversLicense6(passedTest){
    
    console.log(firstName); //error - firstName is not defined. better than ES5 undefined, b/c it prevents an error
    let firstName; //now works b/c it's declared outside the block
    const yearOfBirth = 1990;
    
    if(passedTest){
        firstName = 'John';
    }
    //error - firstName X defined. why?
    //let and const are not function scoped, but block scoped.
    console.log(firstName + ', born in '+yearOfBirth+' , is now officially allowed to drive a car.');
}

driversLicense6(true);
*/

/*
//if var i, console.log would look like 0,1,2,3,4,5 not 0,1,2,3,4,23;
let i = 23;
for(let i = 0; i < 5; i++){ //i here is completely different variable from i outside the for-loop b/c let is block-scoped, not function scoped.
    console.log(i);
}

console.log(i);

*/

/*
///////////////////////////////////////////////////////
// Lecture: Block and IIFEs

// ES6 - IIFE
{
    const a = 1; //much simpler in terms of data privacy
    let b = 2;
    var c = 3; 
}

console.log(a + b); //error b/c const, let are block-scoped, not function-scoped. not accessable
console.log(c);

// ES5 - IIFE
(function(){
    var c = 3; //variable not accessible from the outside
})();

console.log(c); //error
*/

/*
///////////////////////////////////////////////
// Lecture : Strings

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1993;

function calcAge(year){
    return 2019-year;
}

// ES5
console.log('This is '+ firstName + ' '+ lastName+' he was born in'+yearOfBirth+'. today he is '+calcAge(yearOfBirth)+' years old.');

// ES6
console.log(`This is ${firstName}${lastName}. He was born in ${yearOfBirth}. he is now ${calcAge(yearOfBirth)}.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes('oh'));
console.log(`${firstName}`.repeat(5));

*/
/*
////////////////////////////////////////
// Lecture: Arrow Functions


const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el){
    return 2019-el;
});
console.log(ages5);

// ES6
//if one liner
let ages6 = years.map(el => 2019-el);
console.log(ages6);

//if one liner with multiple arguments
ages6 = years.map((el, index) => `Age element ${index + 1}: ${ 2019 - el}.`);
console.log(ages6);

//if multiple liner with multiple arguments
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);
*/

/*
//advantage of arrow function = share this keyword

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function(){
        // document.querySelector('.green').addEventListener('click', function(){
        //     var str = 'This is box number '+ this.position + ' and it is '+ this.color;
        //     alert(str);

        var self = this;
        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This is box number '+ self.position + ' and it is '+ self.color;
            alert(str);
        });
    }
}
box5.clickMe(); //this is box number undefined, it is undefined.
//why?
//this keyword points to window object, not box5 object. b/c .addEventListener is not a method, it is a regular function call.
//some say it's bug in js, others say it's common pattern.



// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function(){
        //no need to make var self = this, and do self.position b/c arrow function already preserve 'this'
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number '+ this.position + ' and it is '+ this.color;
            alert(str);
        });
    }
}
box6.clickMe();


// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: () => { //now it says undefined again. so be careful
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number '+ this.position + ' and it is '+ this.color;
            alert(str);
        });
    }
}
box6.clickMe();
*/
/*
function Person(name){
    this.name = name;
}

//ES5 - bind
Person.prototype.myFriends5 = function(friends){
    // var arr = friends.map(function(el){
    //     return this.name+' is friends with '+el;
    // });
    //var self = this; //solution 1: use var self=this; and do self.name;
    var arr = friends.map(function(el){
        return this.name+' is friends with '+el;
    }.bind(this)); //outside, we still have access to this variable that points to Person('John'), so pass it to this function simply by creating a copy of this function with manually defined this keyword with 'bind'  
    console.log(arr);
}

var friends = ['Bob','Jane','Mark'];
new Person('John').myFriends5(friends); //name is not defined. this keyword points to global object window. 



//ES6
Person.prototype.myFriends6 = function(friends){
    var arr = friends.map(el => `${this.name} is friends with ${el}.`);
    console.log(arr);
}
var friends = ['Bob','Jane','Mark'];
new Person('Mike').myFriends6(friends);
*/


/*
///////////////////////////////////////////
// Lecture: Destructuring

// ES5
var john = ['John',26];
// var name = john[0];
// var age = john[1];


// ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);



function calcAgeRetirement(year){
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1993);
console.log(age2);
console.log(retirement);
*/

/*
///////////////////////////////////////////////
// Lecture: Arrays

const boxes = document.querySelectorAll('.box');
//transform node-list to array


//ES5

var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur){
    cur.style.backgroundColor = 'dodgerblue';
});


//ES6
const boxesArr6 = Array.from(boxes); //.from makes it shorter and better
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue'); //use arrow function


//ES5

for(var i = 0; i < boxesArr5.length; i++){
    if(boxesArr5[i].className === 'box blue'){
        // continue;
        break;
    }
    boxesArr5[i].textContent = 'I changed to blue!';
}


//ES6

//sidenote - difference between for..in and for..of

//for..of used in array, while
//for..in used in object
for(const cur of boxesArr6){
    if(cur.className.includes('blue')){
        continue;
    }
    cur.textContent = 'I changed to blue!';
}


//ES5
var ages = [12,17,8,21,14,11];

var full = ages.map(function(cur){
    return cur >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);


//ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
*/


/*
/////////////////////////////////////////////////////
// Lecture : Spread operator

function addFourAges (a, b, c, d){
    return a + b + c + d;
}

var sum1 = addFourAges(18,30,12,21);
console.log(sum1);

//ES5
var ages = [18,30,12,21];
var sum2 = addFourAges.apply(null, ages); //.apply receives an array. first parameter is for bind/call 
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages); //... is spread operator. it expands this array into its commonent(18,30,...)
console.log(sum3);

const familySmith = ['John','Jane','Mark'];
const familyMiller = ['Mary','Bob','Ann'];
const bigFamily = [...familySmith,'Lily', ...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];
console.log(all);

Array.from(all).forEach(cur => cur.style.color = 'purple'); //node to array using .from

*/

/*
/////////////////////////////////////
// Lecture : Rest parameters

//receives single value and transform it into multiple parameters

//ES5
function isFullAge5(){
    // console.log(arguments); //arguments is array-like structure, but it's not an array.
    var argsArr = Array.prototype.slice.call(arguments);
    argsArr.forEach(function(cur){
        console.log((2019 - cur) >= 25);
    })
};

// isFullAge5(1990,1999,1965);
// isFullAge5(1990, 1999, 1965, 2016, 1900);


//ES6
function isFullAge6(...years){
    // console.log(years);
    years.forEach(cur => console.log((2019-cur) >= 25));
}

isFullAge6(1990,1999,1965,2017,1900);




//ES5 - complicated with arguments
function isFullAge5(limit){
    // console.log(arguments); //arguments is array-like structure, but it's not an array.
    var argsArr = Array.prototype.slice.call(arguments, 1); //exclude first argument
    
    argsArr.forEach(function(cur){
        console.log((2019 - cur) >= limit);
    })
};

isFullAge5(25, 1990,1999,1965);
// isFullAge5(1990, 1999, 1965, 2016, 1900);


//ES6 - easier with arguments
function isFullAge6(limit, ...years){
    // console.log(years);
    years.forEach(cur => console.log((2019-cur) >= limit));
}

isFullAge6(17, 1990,1999,1965,2017,1900);
*/

/*
///////////////////////////////////
// Lecture: Default parameters


//ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality){
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'america' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}


//ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'america'){
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John',1993); //assign undefined to lastname, nationality
console.log(john);
var emily = new SmithPerson('Emily',1983, 'Diaz','spanish');

*/

/*
/////////////////////////////////////////
// Lecture: Maps

const question = new Map();
question.set('question','What is the official name of the latest major Javascript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true,'Correct answer :D');
question.set(false, 'Wrong, please try again!');

// 

// question.clear();

// question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}.`));
//.forEach not only work for array, but also works for maps

for(let [key,value] of question.entries()){
    // console.log(`This is ${key}, and it's set to ${value}.`);
    if(typeof(key) === 'number'){
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));
*/

/*
//////////////////////////////////////////////
// Lecture : Classes

//ES5
var Person5 = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

//object-oriented nature of inheritance in javascript. this is how inheritance works behind the scene in js
Person5.prototype.calculateAge = function(){
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John',1990,'teacher');

//ES6
class Person6 {
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge(){
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }
    static greeting(){ //?? static methods: methods that are simply attached to the class, but not inherited by class instances
        console.log('Hey there!');
    }
}

const john6 = new Person6('John', 1993, 'teacher');
// console.log(john5);
// console.log(john6);

Person6.greeting();

*/

/*
//////////////////////////////////////////////////
// Lecture: Classes and subclasses


//ES5
var Person5 = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

//Athelete class를 Person class에 inherit
var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals){
    //call super class function construct first
    Person5.call(this, name, yearOfBirth, job);

    this.olympicGames = olympicGames;
    this.medals = medals;
};

//inherit - connect two constructs between parents and child
Athlete5.prototype = Object.create(Person5.prototype);

//below codes should be placed after we connect these two function constructors above
Athlete5.prototype.wonMedal = function(){
    this.medals++;
    console.log(this.medals);
};

var johnAthelete5 = new Athlete5('John', 1993, 'swimmer', 3, 10);
console.log(johnAthelete5); //__proto__:Person5. so we also have calculateAge() function 

johnAthelete5.calculateAge();
johnAthelete5.wonMedal();

*/

//ES6
class Person6 {
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
    static greeting(){ 
        console.log('Hey there!');
    }
}

class Athelete6 extends Person6{
    constructor(name, yearOfBirth, job, olympicGames, medals){
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    };

    wonMedal(){
        this.medals++;
        console.log(this.medals);
    }
}
const johnAthelete6 = new Athelete6('John', 1990, 'swimmer', 3, 10);

johnAthelete6.wonMedal();
johnAthelete6.calculateAge();

