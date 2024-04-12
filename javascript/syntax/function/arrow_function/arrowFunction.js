//ES6에 추가된 arrow function ()=>{}은
//이름, this(고로 prototype도), argument가 없음

/*
//1. 이름이 없다
//ES5
const myFunc = function(){

}

//ES6
const myFunc = () => {

}
*/
/*
//2. this가 없다
const btn = document.getElementById('btn0');
var myObj = {
    count:3,
    setCounter : function(){
        console.log(this.count);
        // btn.addEventListener('click', function(){
        //     console.log(this); //this가 버튼을 가리킴
        // });
        btn.addEventListener('click', ()=>{
            console.log(this); //this가 myObj객체를 가리킴            
        });
    }
};

myObj.setCounter();
*/

const myFunc1 = function() {
    console.log(arguments);
}
//ES6에서 파라미터를 ...args로 받음
const myFunc2 = (...args)=>{
    console.log(args);
}
function outer(){
    const myFunc3 = () =>{
        console.log(arguments);
    }
    myFunc3();
}

myFunc1(1,2,3,4);
myFunc2(1,2,3,4); 
outer(1,2,3,4);

//장점1. 코드량 줄음
//장점2. this를 bind 굳이 안해도됨.

