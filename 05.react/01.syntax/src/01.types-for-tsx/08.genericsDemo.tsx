import React from'react';

//step1) parameter에 []를 씌움. arrow function
//<T,>에서 ',' 붙이는 이유는 <T>라고 쓰면 <button>처럼 인식해서 , 붙이는 것 
const convertToArray1 = <T,>(value: T): T[] => {
    return [value];
};

//step2) 그냥 function
function convertToArray2<T>(value: T): T[] {
    return [value];
}

convertToArray1(1);
convertToArray2("hello");

type ButtonProps<T> = {
    countValue: T,
    countHistory: T[],
}   

function CButton<T>({countValue, countHistory} : ButtonProps<T>) {
    return <button>Click Me!</button>
}

export default function Main() {
    return (
        <div>
            <CButton countValue={5} countHistory={[1,2,3]}/>
        </div>
    );
}