function 오브젝트_복사_기계() { //parent, 본체
    this.a = 'hello';
    this.b = 'world';
}
오브젝트_복사_기계.prototype.c = '와자뵤'; //child에 넣지 않고 본체에만 넣는게 prototype**

var child = new 오브젝트_복사_기계(); //본체를 기반으로 child를 찍어낸 것.

console.log(child); //a,b만 있고 c는 없다. 왜냐면 child만 출력했으니까.
console.log(child.a);
console.log(child.c); //근데 child에서 c를 찾고 없으면 계속 parent를 recursive하게 돌면서 찾음. 