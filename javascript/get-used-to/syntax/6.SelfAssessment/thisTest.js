//reference : 코드종

//this === 호출한 놈.
//누가 실행했냐.

//자바스크립트에서 this는, 다른언어에서의 this와는 다르게
//호출하는 방법에 따라 달라진다.

var someone = {
    name: 'codejong',
    whoAmI : function(){
        console.log(this);
    }
};

// { name: 'codejong', whoAmI: [Function: whoAmI] }
// 왜? 호출하는 애가 someone이니까. (someone.?? 에 마침표는, someone이 하라고 했다는 뜻)
someone.whoAmI(); 

// window object or global object
// 왜? 자바스크립트 코드를 실행하는 그 자체(window),가 호출했으니까.
var myWhoAmI = someone.whoAmI;
myWhoAmI(); 

//<button id="btn">...</button>
// 왜? 버튼이 호출했으니까.
var btn = document.getElementById('btn');
btn.addEventListener('click', someone.whoAmI); 

// { name: 'codejong', whoAmI: [Function: whoAmI] }
// 왜? bind로 this는 무조건 someone을 가리키게 했으니까.
var bindedWhoAmI = myWhoAmI.bind(someone); //someone을 무조건 this라고 하겠다라는 것.
btn.addEventListener('click', bindedWhoAmI); 

// { name: 'codejong', whoAmI: [Function: whoAmI] }
bindedWhoAmI();

