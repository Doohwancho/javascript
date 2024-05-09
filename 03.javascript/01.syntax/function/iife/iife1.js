//////////////////////////
// IIFE - for data privacy, not for a function that is used over and over again

function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();


// function () { //error

// }

//IIFE
(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

//if we just go like this without name, js parser recognizes it as function declaration. 
//and since we don't have any name for declaration, it throws an error. 
//so we need to trick parser that it's an expression, not declaration. 
//solution is to wrap the entire thing in a parenthesis. 
//b/c in javascript, what's wrapped in a parenthesis cannot be a statement. 
//so js will treat this like expression, not declaration.


(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);