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

john.calculateAge(); //29
jane.calculateAge(); //50
mark.calculateAge(); //70

console.log(jane.lastName); //Smith
console.log(mark.lastName); //Smith

john.hasOwnProperty('job'); //true
john.hasOwnProperty('lastName'); //false. b/c it's not john's own property. it's in prototype(shared)
john instanceof Person //true;