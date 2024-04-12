//ex1

//var과 let의 차이점

//var은 {}에 국한되지 않고 function내에서 자유롭게 쓰임

//let은 해당 {} 스코프 안에서만 쓰임.

function x(){
    {
        {
            var v = 1;
            let l = 2;
        }
    }
    console.log(v); //1
    // console.log(l); //error - not defined
}
x();
// console.log(v); //error - not defined



//ex2

var btns = [
    document.getElementById('btn0'),
    document.getElementById('btn1'),
    document.getElementById('btn2')
];

//var i일땐 어느 버튼을 클릭하던 3, let i일땐 버튼 번호에 맞춰서 출력. 왜?
function setClickVar(){
    for(var i = 0; i < 3; i++){ 
        btns[i].onclick = function(){
            console.log(i);
        }
    }
};

function setClickLet(){
    for(var i = 0; i < 3; i++){ 
        btns[i].onclick = function(){
            console.log(i);
        }
    }
};


setClickVar(); //3 3 3 
setClickLet(); //0 1 2

//for문 돌 때, onclick에 function()붙여주고 넘어가는걸 i가 3될때까지(for문 끝날때까지) 진행.

//onclick시작되면, console.log(i)에서 i를 찾아봄. 없으면,

//scope chain때문에 setClick()에서 i를 찾아봄. setClick에도 없었다면 global scope를 찾아봤겠지.

//i는 setClick에서 3이 되있음. 그래서 var일때 계속 3이 나오는 것.




//근데 let으로 바꾸면 정상작동하잖아?

//onclick을 감싸고있는 중괄호가 존재하는데, 

//onclick에서 i뒤져서 없으면, scope chain으로 형성된 for문의 중괄호,

//let으로 형성된 중괄호를 뒤져보고, 그래도 없으면

//setClick scope뒤져보고, 그래도 없으면 global scope뒤지는 순서임.

//let을하게되면, setClick scope전에 중괄호에 형성이됨.

//그래서 onclick과 setclick사이 중괄호에 {i = 1,2,3}

//ES5식은 이렇게 생김

"use strict";

function setClickLet(){
    var _loop = function _loop(i){
        btns[i].onclick = function(){
            console.info(i);
        };
    };

    for(var i = 0; i < 3; i++){
        _loop(i);
    }
};
