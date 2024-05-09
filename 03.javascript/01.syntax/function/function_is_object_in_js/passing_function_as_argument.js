//////////////////////////////
// Lecture: Passing functions as arguments

// Functions are first-class citizens in JavaScript, 
// meaning they can be passed around as arguments, returned from other functions,
// and assigned to variables.

// While functions are objects in JavaScript, 
//they are a special type of object that can be invoked.

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