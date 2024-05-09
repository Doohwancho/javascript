//callback - 나중에 실행하는 함수

//함수를 인자,argument로 넘길 수 있음. 리턴값, 변수에도 함수를 넘길 수 있음.

//그래서 js에서 함수를 1급객체라고도 함
/*
//ex1
setTimeout(function() {
    console.log('Works!');
  }, 3000);

//set time out때 함수(console.log)를 인자로 넘기고, setTimeout()이 나중에 이함수를 실행해서 callback
*/

//동기적 callback과 비동기적 callback 비교
/*
//ex1)

//콜백함수의 '동기적' 실행
//0 -> hello -> 1
//fakeSetTimeout이 완전히 완료될때까지 로그 1이 안찍힘.
//순차적으로 된다는게 동기적이라는 것. 무조건 이게 끝나야 다음게 넘어감.
 
function fakeSetTimeout(callback, delay){
	callback();
}

console.log(0);
fakeSetTimeout(function(){
	console.log('hello');
}, 0);
console.log(1);
*/

//ex2
//진짜 setTimeout()은 비동기라 0 -> 1 - > hello가 나옴.
//timer는 자바스크립트 밖에 있음. 브라우저에서 웹 api를 통해 제공.
//setTimeout()실행되면, callback 함수를 js밖 timer에게 알려준다. 0초뒤에 큐에 넣으라고 해줌.
//console.log(1)까지 찍히면, 큐를 살펴보다가 callback이 들어있으면, 그걸 실행시킴.
//callback은 나중에 실행하라고 인자로써 넘겨주는 것.
//그럼 그 콜백을 받은 함수가, 자기 역할에 따라 받은 콜백 실행.
//만약 자바스크립트 내부에서만 연산만 되는거면, fakecallback처럼 동기적으로 실행.
//만약 외부, 서버의 데이터를 가져온다거나 timer같은거면, 그것은 call stack에서 실행되는게 아니라 큐에서 실행됨.
//그래서 큐에 넣냐 안넣냐로 동기냐 비동기냐 갈림

console.log(0);
setTimeout(function(){
	console.log('hello');
}, 0);
console.log(1);





// for( var i = 0; i < 5; i++) {
//     console.log(i);
//     setTimeout(function() {
//         console.log(i);
//     }, 1000);
// }
// console.log("완료");



/*
// 함수 정의
repeatConsoleLog = function(i, callback) {
    console.log(i+ " A")
	setTimeout(function() {
		console.log(i + " B");
		if (i >= 5) {
			callback();
		} else {
			repeatConsoleLog(i+1, callback);
		}
	}, 3000);
};

// 함수 실행
repeatConsoleLog(0, function() {
	// 함수의 실행이 모두 끝난 뒤에 이곳에 있는 코드가 실행된다.
	console.log('완료');
});
*/

