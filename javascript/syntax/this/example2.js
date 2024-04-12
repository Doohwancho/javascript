var john = {
    name:'John',
    yearOfBirth: 1990,
    calculateAge:function(){ //function expression, not declaration
        //case1)
        console.log(this); //refers to john object
        /*
        {
            name: 'John',
            yearOfBirth: 1990,
            calculateAge: [Function: calculateAge]
        }
        */
        
        //case2)
        console.log(2024-this.yearOfBirth); //34

        //case3)
        function innerFunction(){ //refers to window object.b/c when regular function happens, it refers to window. it's not method. method is calculateAge() 
            // console.log(this);
            /*
                <ref *1> Object [global] {
                    global: [Circular *1],
                    clearInterval: [Function: clearInterval],
                    clearTimeout: [Function: clearTimeout],
                    setInterval: [Function: setInterval],
                    setTimeout: [Function: setTimeout] {
                        [Symbol(nodejs.util.promisify.custom)]: [Getter]
                },
                queueMicrotask: [Function: queueMicrotask],
                performance: Performance {
                    nodeTiming: PerformanceNodeTiming {
                    name: 'node',
                    entryType: 'node',
                    startTime: 0,
                    duration: 20.185707807540894,
                    nodeStart: 0.6306657791137695,
                    v8Start: 1.8146657943725586,
                    bootstrapComplete: 16.368290901184082,
                    environment: 8.385665893554688,
                    loopStart: -1,
                    loopExit: -1,
                    idleTime: 0
                    },
                    timeOrigin: 1712825849920.013
                },
                clearImmediate: [Function: clearImmediate],
                setImmediate: [Function: setImmediate] {
                    [Symbol(nodejs.util.promisify.custom)]: [Getter]
                }
            }
            */
        }
        innerFunction();
    }
};
john.calculateAge();

var mike = {
    name:'Mike',
    yearOfBirth: 1984
};

//method borrowing(john's to mike)
mike.calculateAge = john.calculateAge; // b/c function() runs function while function just refers to the function. 
mike.calculateAge(); //40 - this now refers to mike, not john
                    /*
                        {
                        name: 'Mike',
                        yearOfBirth: 1984,
                        calculateAge: [Function: calculateAge]
                        }
                    */