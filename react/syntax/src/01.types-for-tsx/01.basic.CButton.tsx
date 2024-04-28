import React from 'react';
import { Button } from 'semantic-ui-react';

//case1) let url만 쓰고 마우스 커서 hover하면 vsc linter가 type 알려줌
const url: string = 'https://www.google.com';

//case2) type for function parameter + return type
function convertCurrency(amount: number, currency: string): number {
  if(currency === 'USD') {
    return amount * 1.1;
  }
  return amount;
}

const outcome: number = convertCurrency(1000, 'USD'); //return type인 number로 받음

//case3) function component (traditional approach. it has some defects)
const ExampleComponent: React.FC = () => {
  return (
    <h1>Example Component</h1>
  );
};

//case4-1) props에 type 정의하기
const ButtonComponent4_1 = (props: {
  backgroundColor: string,
  children: React.ReactNode,
}) => {
  const { backgroundColor, children } = props; //파라미터에서 받은 애들 deconstructoring을 여기서 따로 해줘야함함

  return (
    <button 
      className="bg-blue-500 text-white rounded px-4 py-2"
      style={{backgroundColor}}
      onClick={() => {alert('clicked')}}>
      {children}
    </button>
  )
}

//case4-2) props에 type 정의하는데, 여러개 types을 deconstructor하는 경우. (더 일반적으로 쓰임)
const ButtonComponent4_2 = ( { backgroundColor, children }: {
  backgroundColor: string,
  children: React.ReactNode,
}) => {
  return (
    <button
      className={backgroundColor}
      onClick={() => {alert('clicked')}}
    >
      {children}
    </button>
  )
}

type ButtonComponent4_3Type = {
  backgroundColor: string,
  children: React.ReactNode,
}

//case4-3) 파라미터에 props를 type으로 따로 빼기 (일반적으로 쓰임)
const ButtonComponent4_3 = ( { backgroundColor, children }: ButtonComponent4_3Type) => {
  return (
    <button
      className={backgroundColor}
      onClick={() => {alert('clicked')}}
    >
      {children}
    </button>
  )
}

//case5-1) union type: type | type | type;
type ButtonType = 'button' | 'reset' |'submit'; //button type에 뭐가들어가는지는, w3school에서 확인 (https://www.w3schools.com/tags/tag_button.asp)

type ButtonComponent5_1Type = {
  backgroundColor: string, //?가 없기 떄문에, 이 파라미터는 mandatory. 안넣으면 에러남. 
  type?: ButtonType, //? = optional. ?가 있다는건 이 타입을 안넣어도 에러 안남. 또한 optional parameter는 undefined가 들어올 수 있다는 것!
  children: React.ReactNode,
}

const ButtonComponent5_1 = ( { backgroundColor, type, children }: ButtonComponent5_1Type) => {
  return (
    <button
      className={backgroundColor}
      type={type}
      onClick={() => {alert('clicked')}}
    >
      {children}
    </button>
  )
}

//case5-2) tuple type
type ButtonComponent5_2Type = {
  backgroundColor: string, 
  padding: number[], //[number, number, number, number] 도 가능하고, [number, string, number]도 가능
  children: React.ReactNode,
}

const ButtonComponent5_2 = ( { backgroundColor, padding, children }: ButtonComponent5_2Type) => {
  return (
    <button
      style={
        {
          backgroundColor,
          paddingTop: `${padding[0]}px`,
          paddingRight: `${padding[1]}px`,
          paddingBottom: `${padding[2]}px`,
          paddingLeft: `${padding[3]}px`,
        }
      }
      onClick={() => {alert('clicked')}}
    >
      {children}
    </button>
  )
}

//case5-3) record type (Map<Key:Value>)
type ButtonComponent5_3Type = {
  borderRadius: Record<string, number>
}
const ButtonComponent5_3 = ({ borderRadius }: ButtonComponent5_3Type) => {
  return (
    <button style={borderRadius}>
      Click Me
    </button>
  )
}

const ButtonComponent5_3_Main = () => {
  return (
    <ButtonComponent5_3
      borderRadius={{
        topLeft: 5,
        topRight: 5,
        bottomRight: 5,
        bottomLeft: 5,
      }}
    />
  )
}


//case6) return type
const ButtonComponent6 = ():React.JSX.Element => { //react function component의 return type을 지정하지 않아도, 컴포넌트 이름에 mouse hover만 해도 return type이 뭔지 알려준다.
  return (
    <button>button</button>
  )
}

//case7) any type vs specific type
type ButtonComponent7Type = {
  fontSize: number,  //any일 수도, number일 수도 있지만, 더 자세한 number로 찾아 지정하는게 좋다.
  children: React.ReactNode,
}

const ButtonComponent7 = ( { fontSize, children }: ButtonComponent7Type) => {
  fontSize.toExponential(); //fontSize가 number type으로 정의되어 있으면, number type의 함수를 .찍어서 쓸 수 있는데, any 타입이면 못씀

  return (
    <button
      onClick={() => {alert('clicked')}}
    >
      {children}
    </button>
  )
}

//case8) typing function 
const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  alert('clicked');
}

type ButtonProps8 = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  children: React.ReactNode,
}

const ButtonComponent8 = ( { onClick, children }: ButtonProps8) => {
  return (
    <button
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const ButtonComponent8_Main = () => {
  return (
    <ButtonComponent8
      onClick={onClick}
    >
      Click Me
    </ButtonComponent8>
  )
}

export default function CButton() {

  return (
    <>
      <ExampleComponent />
      <ButtonComponent4_1 backgroundColor="bg-blue-500" children="button"/>
      <ButtonComponent4_2 backgroundColor="bg-blue-500" children="button"/>
      <ButtonComponent4_3 backgroundColor="bg-blue-500" children="button"/>
      <ButtonComponent5_1 backgroundColor="bg-blue-500" type='button' children="button"/>
      {/* 5_1에서 주목할 점은 type='만 누르면, 미리 union type으로 정의해둔 선택지 3개가 뜸*/}
      <ButtonComponent5_2 backgroundColor="bg-blue-500" padding={[10, 20, 30, 40]} children="button"/>
      <ButtonComponent6 />
      <ButtonComponent7 fontSize={10} children="button"/>
    </>
  )
}