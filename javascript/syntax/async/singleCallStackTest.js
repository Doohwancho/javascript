//자바스크립트의 타이머는 우리가 요청한 시간에, 해당함수를 실행하는 것을 보장하지 않음.

//왜? - 싱글스레드와 밀접한 관계 때문.

function yo(){
    setTimeout(function (){ //1.5초뒤에 큐에 집어넣음. call stack이 끝나고 main함수까지 완전히 종료되야 실행.
        console.log('1.5초 타이머 끝!');
    }, 1500);

    function fakeSetTimeout(callback, delay){
        callback();
    }

    for(let i = 0; i < 3; i++){
        // doSomething(); //가정 # 매번 1초가 걸리는 일
        
        fakeSetTimeout(function(){
            console.log('1초 타이머 끝!');
        }, 1000);
        console.log(i);
    }
    console.log('3초 걸리는 for문 끝!');
}

yo();

console.log('main 끝!'); //main함수가 끝나고 나서야 큐에있는 setTimeout function끄내서 실행. 