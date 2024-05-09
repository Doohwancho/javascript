//AMD(async_module_definition)
//node(server)에서는 안쓰고 브라우저에서 import & export하는 방법
//define으로 export하고 require()로 import하는 것 같다.
//이 코드를 노드에서 실행시키려면 웹팩 설정하고 해서 복잡함

// main.js
require(['math'], function(math) {
    console.log(math.add(2, 3)); // Output: 5
});