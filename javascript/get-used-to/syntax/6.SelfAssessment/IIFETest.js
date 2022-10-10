//IIFE - Immediately Invoked Function Expressions
//detailed explanation : https://velog.io/@doondoony/javascript-iife

/*
//1. 즉시 호출

//실행도 안했는데 로그 1찍힘.
(function () { 
    console.log(1);
    }
)();

function x() {
    console.log(2);
};
*/

//2. 함수의 선언(function declaration)과 표현(function expression)

//함수 선언(declaration)은 미리 자바 스크립트의 실행 컨텍스트(execution context)에 로딩 되어 있으므로 
//언제든지 호출할 수 있지만, 표현식(Expression)은 인터프리터가 해당 라인에 도달 하였을때만 실행이 됩니다.

/*
foo(); // success!
function foo() {  //선언
    console.log(1);
}

foo(); // "foo" is not defined.
var foo = function() { //표현
    console.log(2);
};

console.log(foo); // "foo" is not defined.
(function foo () {  //괄호쌍이 익명의 함수를 감싸서 함수 선언(declaration)을 함수 표현식(expression)으로 표현될 수 있습니다.
    console.log(3);
});  
console.log(foo); // "foo" is not defined.
*/

(showName = function (name) {
    console.log(name || "No Name")
    }
  ) (); // No Name
  showName("Rich"); // Rich
  showName(); // No Name
