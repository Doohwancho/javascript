
//scope의 기본은 함수단위
//스코프체인 -> inner 스코프와 outer스코프와 연결되있고, outer 스코프와 global 스코프와 연결되있음.

//closure - 생성한 시점에 scope chain을 그대로 들고 있는다.
//그래서 outer()가 실행된 다음에도, outer의 scope를 계속 접근할 수 있는 것.

var d = 'D';

function outer(){
    var a = 1;
    var b = 'B';

    function inner(){
        var a = 2;
        console.log(b);
    }
    return inner();
}

var someFun = outer();
someFun; //B
