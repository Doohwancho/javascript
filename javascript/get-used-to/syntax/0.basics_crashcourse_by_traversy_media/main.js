//Alerts **

//alert('error'); //instead of alert(), use console when debug(F12 for chrome)
// console.log('Hello World');
//https://developer.mozilla.org/ko/docs/Web/Tutorials
// console.error("error");
// console.warn('This is a warning');



// Variables **

//var, let, const

//var - you don't want to use it for the most part. b/c it's globally scoped

//let and const were added after ES6 or ES2015

//let : you can re-assign values
// let age = 30;
// age = 31;
// console.log(age);

// //const : you can't re-assign values. so you only want to use it when you DO NOT want to change the value
// const age_const = 20;
// age_const = 20;
// console.log(age_const);
// const initial_const; //can't even initialize with const



// Datatypes **

// String, Numbers, Boolean, null, undefined, Symbol

// const name='John';
// const age = 30;
// const rating = 4.5; //type:number. same as age
// const isCool = true;
// const x = null;    //object type
// const y = undefined;    //undefined
// let z; //undefined as well //undefined

// //difference between null and undefined?


// console.log(typeof name);
// console.log(typeof age);
// console.log(typeof rating);
// console.log(typeof isCool);
// console.log(typeof x); // you get object. but it's error.
// console.log(typeof y);
// console.log(typeof z);






//Concatenation **

// const name='John';
// const age = 30;

// console.log('My name is '+ name + 'and I am '+ age);

// // Template String(after ES6) using grave accent
// const hello = `My name is ${name} and I am ${age}`;

// console.log(hello);




// String manipulation **

// const s = 'Hello World';

// console.log(s);
// console.log(s.toUpperCase());
// console.log(s.substring(0, 5));
// console.log(s.split(''));



// // Arrays ** - variables that hold multiple values

// //const numbers = new Array(1,2,3,4,5);
// const fruits = ['apples','oranges','pears',10,true]; //type-free

// fruits[3] = 'grapes';

// fruits.push('mangos');

// fruits.unshift('straberries');

// fruits.pop();

// console.log(fruits[1]);
// console.log(fruits);

// console.log(Array.isArray(fruits));

// console.log(fruits.indexOf('oranges'));

// const person = {
//     firstName: 'John',
//     lastName: 'Doe',
//     age: 30,
//     hobbies: ['music', 'movies', 'sports'],
//     address:{
//         street: '50 main st',
//         city: 'Boston',
//         state: 'MA'
//     }
// }

// console.log(person.hobbies[1]);
// console.log(person.address.city);

// person.email = 'john@gmail.com'; //add info into person object
// console.log(person.email);


// const{ firstName, latName, address: {city } } = person;

// console.log(firstName);
// console.log(city);


// const todos = [
//     {
//         id:1,
//         text: '1111',
//         isCompleted: true
//     },
//     {
//         id:2,
//         text: '2222',
//         isCompleted: false
//     },
//     {
//         id:3,
//         text: '3333',
//         isCompleted: true
//     }
// ];

// console.log(todos[1].text);





// convert to JSON **

// //if you want to conver this to json, (cuz you need it when sending it to server)
// const todoJson = JSON.stringify(todos);
// console.log(todoJson);





//For Loop **


// for(let i = 0; i < todos.length; i++){
//     // console.log(`for loop number: ${i}`);
//     console.log(todos[i].text);
// }

// //better way
// for(let todo of todos){
//     console.log(todo.text);
// }




//While **


// let i = 0;
// while(i < 10){
//     console.log(`While Loop Number: ${i}`);
//     i++;
// }



// forEach, map, filter **


// todos.forEach(function(todo){
//     console.log(todo.text);
// });

// const todoText = todos.map(function(todo){ //map return an array
//     return todo.text;
// });

// console.log(todoText);

// const todoCompleted = todos.filter(function(todo){ //map return an array
//     return todo.isCompleted === true;
// }).map(function(todo){
//     return todo.text;
// });

// console.log(todoCompleted);




// 등호**

// const x = '4';

// if(x == 4){ //triple === matches data types also. just always use triples. "10"===10
//     console.log('true');
// } 


// const x = 10;

// const color = x > 10 ? 'red' : 'blue';

// console.log(color);



// switch **


// switch(color){
//     case 'red':
//         console.log('color is red');
//         break;
//     case 'blue':
//         console.log('color is blue');
//         break;
//     default:
//         console.log('color is NOT RED OR BLUE');
//         break;
// }



// arrow function ** 

// function addNum(num1 = 1, num2 = 2){
//     console.log(num1+num2);
// }

// addNum(5,4);
// addNum();

// const addNums = (num1 = 1, num2 = 3) => {
//     return num1+num2;
// }

//use arrow function - slim it down a lot
// const addNums = (num1 = 1, num2 = 3) => num1+num2;
// const addation = num1 => num1+5;

// addNums(5,5);
// console.log(addation(2));





//OOP with ES5


//Constructor function **

// function Person(firstName, lastName, dob){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.dob = new Date(dob); //date object
// }

// Person.prototype.getBirthYear = function(){ //put function in prototype b/c you don't want a function on every object
//     return this.dob.getFullYear();
// }

// Person.prototype.getFullName = function(){
//     return `${this.firstName} ${this.lastName}`;
// }





// //Class ** - doing the same thing(class added after ES6) but prettier way


// class Person{
//     constructor(firstName, lastName, dob){
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.dob = new Date(dob); //date object
//     }

//     getBirthYear(){
//         return this.dob.getFullYear();
//     }

//     getFullName(){
//         return `${this.firstName} ${this.lastName}`;
//     }
// }





//Instantiate object 

// const person1 = new Person('John','Doe','4-3-1980');
// const person2 = new Person('Mary','smith','2-5-2980');

// console.log(person1);
// console.log(person2.firstName);
// console.log(person2.dob.getFullYear); // can use all the function from date object

// console.log(person1.getBirthYear());
// console.log(person2.getFullName());






//DOM - 이런식으로 js와 활용 가능

// const items = document.querySelectorAll('.items');
// items.forEach(item) => console.log(item);
// items.remove();
// items.lastElementChild.remove();
// items.firstElementChild.textContent = 'Hello';
// items.Children[1].innerTExt = 'Brad';
// items.lastElementChild.innerHTML = '<h1>HEllO<h1>';

// const btn = document.querySelector('.btn');
// btn.style.background = 'red';

// btn.addEventListener('click', (e) =>{
//  e.preventDefault();   
// document.querySelector('#my-form').style.background="#ccc";
// });
