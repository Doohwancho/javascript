/*
// Function constructor

var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

var Person = function(name, yearOfBirth, job){//use capital for function constructor
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
Person.prototype.calculateAge =         //how inheritance works. inheritant method shared in prototype
    function(){
    console.log(2019-this.yearOfBirth);
};

Person.prototype.lastName = 'Smith'; //john.__proto__ === Person.prototype

//new creates a new object. now, this points to Person, not global object 'window'.
var john = new Person('John', 1990,'teacher'); //instatiation
var jane = new Person('Jane',1969,'designer');
var mark = new Person('Mark',1949,'fighter');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(jane.lastName);
console.log(mark.lastName);

john.hasOwnProperty('job'); //true
john.hasOwnProperty('lastName'); //false. b/c it's not john's own property. it's in prototype(shared)
john instanceof Person //true;


*/

/*
//Object.create

var personProto = {
    calculateAge: function(){
        console.log(2019-this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto,
    {
        name: {value: 'Jane'},
        yearOfBirth: {value: 1969},
        job: {value: 'designer'},
    });


// The difference between object.create and the function constructor pattern is that 

// object.create builds an object that inherits directly from the one that we passed into the first argument.

// While, on the other hand, the function constructor, the newly created object, inherits from the constructor's prototype property.

// that's the big difference,

// Actually, one of the biggest benefits of object.create is that it allows us to implement a really complex inheritant structures in an easier way

// than function constructors because it allows us to directly specify which object should be a prototype.
 */

/*

//primitives vs objects

//variable contains primitives' data, while variable contains objects' reference

// Primitives
var a = 23;
var b = a;
a = 46
console.log(a); //46
console.log(b); //23


// Objects
var obj1 = {
    name: 'John',
    age: 26
};
var obj2 = obj1;
obj1.age = 30;

console.log(obj1.age); //30
console.log(obj2.age); //30


// Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b){
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);      //27
console.log(obj.city); //San Francisco

*/

/*
//////////////////////////////
// Lecture: Passing functions as arguments

var years = [1990, 1934, 1957, 1937, 2002];

function arrayCalc(arr, fn) { //fn function is called 'call-back function'
    var arrRes = [];
    for(var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el){ //call back function
    return 2019-el;
}

function isFullAge(el){
    return el >= 18;
}

function maxHeartRate(el){
    if(el >= 18 && el <= 81){
        return Math.round(206.9-(0.67*el));
    } else { 
        return -1;
    }
}


var ages = arrayCalc(years, calculateAge); //function의 주소만 보내면 되서 calculateAge()아님. ()빼고 주소만 보냄.
console.log(ages);

var fullAges = arrayCalc(ages, isFullAge);
console.log(fullAges);

var rates = arrayCalc(ages, maxHeartRate);
console.log(rates);
*/

/*
/////////////////////////////
// Lecture: Function returning functions

function interviewQuestion(job){
    if(job === 'designer'){
        return function(name){
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher'){
        return function(name) {
        console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name){
            console.log('Hello ' + name+ ', what do you do?');
        }
    }
}


var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');
console.log(teacherQuestion('Cho'));
console.log(designerQuestion('John'));
console.log(interviewQuestion('teacher')('Mark'));

*/

//////////////////////////
// IIFE - for data privacy, not for a function that is used over and over again

/*
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();


// function () { //error

// }

//IIFE
(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

//if we just go like this without name, js parser recognizes it as function declaration. 
//and since we don't have any name for declaration, it throws an error. 
//so we need to trick parser that it's an expression, not declaration. 
//solution is to wrap the entire thing in a parenthesis. 
//b/c in javascript, what's wrapped in a parenthesis cannot be a statement. 
//so js will treat this like expression, not declaration.


(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);

*/


/*
//////////////////////////////
// Lecture : Closures

//an inner function has always access to the variables and parameters of its outer functions,
//even after the outer function has returned.

function retirement(retirementAge){
    var a = ' years left until retirements.';
    return function(yearOfBirth){
        var age = 2019 - yearOfBirth;
        console.log((retirementAge-age) + a); //retirement()가 끝났는데 아직 yearOfBirth변수(매개변수) 사용 가능
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);
// retirement(66)(1993);

retirementUS(1993);
retirementGermany(1993);
retirementIceland(1993);

function interviewQuestion(job){
    var designer_words = 'UX';
    var teacher_words = 'teach';
    var default_words = 'what do you do?';
    return function(name){
        switch(job){
            case 'designer':
                console.log(designer_words);
                break;
            case 'teacher':
                console.log(teacher_words);
                break;
            default:
                console.log(default_words);
                break;
        }
    }
}

var designer = interviewQuestion('designer');
designer('John');
designer('Cho');
interviewQuestion('teacher')('Marry');

*/

/*
/////////////////////////////////////////
// Lecture: Bind, call and apply

var john = {
    name: 'John',
    age: 27,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if(style === 'formal'){
            console.log('Good '+ timeOfDay + ', Ladies and gentleman! I\'m '+this.name+ ', I\'m '+this.job+', and I\'m '+this.age);
        } else if (style === 'friendly'){
            console.log('Hey! What\'s up? I\'m '+this.name+ ', I\'m '+this.job+', and I\'m '+this.age+'. Have a nice '+timeOfDay+'.');
        }
    }
}
var emily = {
    name: 'Emily',
    age: 35,
    job:'designer'
}

john.presentation('formal','morning');

john.presentation.call(emily, 'friendly','afternoon'); //call sets this variable. this variable pointing to john now points to emily due to  .call() method. this is called called method borrowing.

// john.presentation.apply(emily, ['friendly', 'afternoon']); //works only when parameter takes in array.

var johnFriendly = john.presentation.bind(john, 'friendly'); //parameter 하나만 저장해 두었다가

johnFriendly('morning'); //나중에 유동적으로 변하는 하나의 parameter만 바꿔서 계쏙 써먹을 수 있음.
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

*/


var years = [1990, 1934, 1957, 1937, 2002];

function arrayCalc(arr, fn) { //fn function is called 'call-back function'
    var arrRes = [];
    for(var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el){ //call back function
    return 2019-el;
}

function isFullAge(limit, el){ //what if age restriction differs in different countries?
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
console.log(ages);

var test = arrayCalc(ages, isFullAge.bind(this, 15));
console.log(test);

var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(fullJapan);














