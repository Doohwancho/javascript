/**
 * Object.create
 */
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

console.log(jane.name); //Jane
console.log(jane.yearOfBirth); //1969
console.log(jane.job); //designer


// The difference between object.create and the function constructor pattern is that 
// object.create builds an object that inherits directly from the one that we passed into the first argument.
// While, on the other hand, the function constructor, the newly created object, inherits from the constructor's prototype property.
// that's the big difference,
// Actually, one of the biggest benefits of object.create is that it allows us to implement a really complex inheritant structures in an easier way
// than function constructors because it allows us to directly specify which object should be a prototype.