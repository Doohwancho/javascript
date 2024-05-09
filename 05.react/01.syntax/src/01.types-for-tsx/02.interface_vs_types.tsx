import React from'react';

//case1) interface
//       단점: 무적권 객체로 받음. 불편.
// interface URL {
//     url: string
// }

//case2) type
//       장점: 객체가 아닌 primitive type으로 받을 수 있음. 
//            union type도 가능함.
//       인터페이스 쓰지 말고 타입만 쓰자. 
type URL = string;

const url: URL = "https://www.google.com";

export default function Main() {
    return (
        <div>
            <h1>Hello World</h1>
            {/* <a href={url.url}>google</a> */}
            <a href={url}>google</a>
        </div>
    );
}