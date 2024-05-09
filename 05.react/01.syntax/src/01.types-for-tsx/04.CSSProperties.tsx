import React from 'react';

type Color = 'blue' |'red' | 'green' | 'yellow' | 'orange' | 'purple' | 'pink' | 'brown' | 'gray' | 'black' | 'white';

//case1)
// type ButtonProps = {
//     backgroundColor: Color,
//     textColor: Color,
//     fontSize: number;
//     pillShape?: boolean;
//     padding: [number, number, number, number];
// }

//case2) 
type ButtonProps = {
    style: React.CSSProperties //단, 이렇게 하면 해당 <button>에 css의 predefined 속성 이름에 맞춰야 함 
}

export function CButton ({
    style
}: ButtonProps) {
  return (
    <button style={style}>
      button
    </button>
  );
}


export default function Main() {
    return (
        <CButton style={{
            backgroundColor: 'blue',
            textColor: 'white', //textColor는 CSSProperties에 없으니까 color로 바꿔줘야 한다.
            fontSize: 16,
            pillShape: true,
            // padding: [10, 20, 30, 40],
            padding: "10, 20, 30, 40"
        }} />
    );
}