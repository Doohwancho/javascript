///////////////////////////////////////
// Lecture: Hoisting

// case1
calculateAge(1993); //this is hoisting. still works.
//even before execution phase, 
//function calculateAge() is already stored in a variable object.
//b/c calculateAge() is function declaration

function calculateAge(year){
    console.log(2019 - year);
}


//case2
retirement(1990); //type error - retirement is not a function. 
                  //b/c below is function expression, not function declaration.

var retirement = function(year){
    console.log(65 - (2019-year));
}