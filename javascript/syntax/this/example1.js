///////////////////////////////////////
// Lecture: this

console.log(this); //{}
                   //window. b/c window is default object and this points to object when called


calculateAge(1993);

function calculateAge(year){
    console.log(2024-year);
    console.log(this);
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
            duration: 19.266957998275757,
            nodeStart: 0.6306250095367432,
            v8Start: 2.2542080879211426,
            bootstrapComplete: 15.518874883651733,
            environment: 8.6947500705719,
            loopStart: -1,
            loopExit: -1,
            idleTime: 0
            },
            timeOrigin: 1712825568482.56
        },
        clearImmediate: [Function: clearImmediate],
        setImmediate: [Function: setImmediate] {
            [Symbol(nodejs.util.promisify.custom)]: [Getter]
        }
    }
    */
}

