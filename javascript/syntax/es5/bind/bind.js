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

//case1) object 안에 function 쓰기 
// john.presentation('formal','morning');

//case2) .call()
// john.presentation.call(emily, 'friendly','afternoon'); //call sets this variable. this variable pointing to john now points to emily due to  .call() method. this is called called method borrowing.

//case3) .apply()
// john.presentation.apply(emily, ['friendly', 'afternoon']); //works only when parameter takes in array.

//case4) .bind()
var johnFriendly = john.presentation.bind(john, 'friendly'); //parameter 하나만 저장해 두었다가

johnFriendly('morning'); //나중에 유동적으로 변하는 하나의 parameter만 바꿔서 계쏙 써먹을 수 있음.
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');