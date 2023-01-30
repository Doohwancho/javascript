import React from "react";

export const MyComponent: React.FC = () => {
  const [numero, setNumero] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
  	  //before
	  //setNumero(numero + 1); // 1 -> 1

	  //before은 closure로 감싸져 있어 async call하고 die하면, closure안에 die한 값이 보전되거 계속 그 값을 반환함.

	  //after
	  setNumero((numero) => numero + 1); // 1 -> 2

	  //after은 새로운 함수를 반환하는거라, closure에서 예전 값 꺼내오는게 아님.
    }, 1500);
    setNumero(1);
  }, []);

  return (
    <>
      <h4>El numero: {numero}</h4>
    </>
  );
};
