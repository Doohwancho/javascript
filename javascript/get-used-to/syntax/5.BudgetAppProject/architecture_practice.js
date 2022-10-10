//IIFE - an anonymous function read in parenthesis 
//allows to have data privacy, b/c it creates a new scope that is invisible from the outside scope 
var budgetController = (function() {
    var x = 23; //budgetController.x == undefined
    //IIFE creates data privacy for var x
    //cannot access to inner variables from the outside.
    
    var add = function(a){ //budgetController.add(5) == error. budgetController.add is not a function
        return x + a;
    }
    //IIFE creates data privacy for var add function

    return {
        //closure
        //inner function can have access to variables and parameters of its outer function, even after outer function has returned
        //even after IIFE function has been returned, publicTest and var x, add are in closure
        publicTest: function(b){ //budgetController.publicTest(5) == 28
            return add(b); 
        }
    }
})();

// console.log(budgetController); //publicTest object returned
// console.log(budgetController()); //error - budgetController is not a function
// console.log(budgetController.x); //undefined
// console.log(budgetController.add); //undefined
// console.log(budgetController.add(2)); //error - budge.Controller.add is not a function -- IIFE's data privacy
// budgetController.publicTest(1) // 24
// console.log(budgetController.publicTest(1)); //24 \n undefined. publicTest값 반환하고, 해당 publicTest의 주소가 undefined라고 뜨나?

var UIController = (function(){
    // Some code
})();


var controller = (function(budgetCtrl, UICtrl) {
    // budgetController.publicTest() //파라미터로 컨트롤러 안받고 컨트롤러.메소드()로 하면 단점이, 컨트롤러가 새롭게 바뀌면, 안에 컨트롤러 이름 다 바꿔줘야 하기 때문. independent하게 만들라고.
    var z = budgetCtrl.publicTest(5);

    return {
        anotherPublic: function(){
            console.log(z);
        }
    }
})(budgetController, UIController);

controller.anotherPublic();
