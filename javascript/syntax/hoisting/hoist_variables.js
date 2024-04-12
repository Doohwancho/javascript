// variablesx

console.log(age);//undefined. in the creation phase of variable object, code is scanned for variable decoration, and then variable is set to undefined. 
var age = 23;    
console.log(age); //23

// console.log(age_2); //error. not even go through creation phase of variable. so 'undefined' is not even get inserted.

function foo(){
    // console.log(age);
    var age = 65;    //this variable is completely different from global execution variable 'age'
    console.log(age); //65
}
foo();
console.log(age); //23

