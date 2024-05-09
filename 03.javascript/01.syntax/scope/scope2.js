/**
 * summary
 * 
 * var a는 global scale이라 third();에서 접근 가능
 * var b,c는 local scope이라 third()에서 접근 불가
 */

var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third();
    }
}

function third() {
    var d = 'John';
    console.log(a); //hello
    console.log(b); //error. b is not defined. 
    console.log(c); //error - c is not defined
                    //third function was called from second function. b/c of scoping(scope chain).
                    //but third() can't access to variable c, b/c execution stack is different from scope chain.
}

