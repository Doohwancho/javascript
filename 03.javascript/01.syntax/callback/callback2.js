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