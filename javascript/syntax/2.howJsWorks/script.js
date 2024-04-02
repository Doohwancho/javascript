///////////////////////////////////////
// Lecture: Hoisting

// functions
calculateAge(1993); //this is hoisting. still works.
//even before execution phase, 
//function calculateAge() is already stored in a variable object.
//b/c calculateAge() is function declaration

function calculateAge(year){
    console.log(2019 - year);
}


// retirement(1990); //does not work. b/c below is function expression, not function declaration.

var retirement = function(year){
    console.log(65 - (2019-year));
}


// variablesx

console.log(age);
var age = 23;    //undefined. in the creation phase of variable object, code is scanned for variable decoration, and then variable is set to undefined. 
console.log(age);

// console.log(age_2); //error. not even go through creation phase of variable. so 'undefined' is not even get inserted.

function foo(){
    // console.log(age);
    var age = 65;    //this variable is completely different from global execution variable 'age'
    console.log(age);
}
foo();
console.log(age);



///////////////////////////////////////
// Lecture: Scoping


// First scoping example


var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}




// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    // console.log(a);
    // console.log(b); //error. b is not defined. 
    console.log(c); //third function was called from second function. b/c of scoping(scope chain).
    //but third() can't access to variable c, b/c execution stack is different from scope chain.
}
*/



///////////////////////////////////////
// Lecture: The this keyword

//console.log(this); //window. b/c window is default object and this points to object when called

/*
calculateAge(1993);

function calculateAge(year){
    console.log(2019-year);
    console.log(this);
}
*/

var john = {
    name:'John',
    yearOfBirth: 1990,
    calculateAge:function(){ //function expression, not declaration
        console.log(this); //refers to john object
        console.log(2019-this.yearOfBirth);
        // function innerFunction(){ //refers to window object.b/c when regular function happens, it refers to window. it's not method. method is calculateAge() 
        //     console.log(this);
        // }
        // innerFunction();
    }
};
john.calculateAge();

var mike = {
    name:'Mike',
    yearOfBirth: 1984
};

//method borrowing(john's to mike)
mike.calculateAge = john.calculateAge; // b/c function() runs function while function just refers to the function. 
mike.calculateAge(); //this now refers to mike, not john

