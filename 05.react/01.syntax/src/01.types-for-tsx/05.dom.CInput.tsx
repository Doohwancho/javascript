import React from 'react';

//case) & React.DetailedHTMLProps로 커스텀 타입 + <input>의 기본 타입들까지 합쳐서 받기
export interface InputProps {
  isValid?: boolean;
  hasUnderline?: boolean;
}

const CInput = ({
  isValid = true,
  hasUnderline = false,
  ...inputAttributes
}: InputProps &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return (
    <div>
      <input
        type="text"
        className={`${isValid ? 'border-green-500' : 'border-red-500'} ${
          hasUnderline ? 'border-b-2' : ''
        }`}
        {...inputAttributes} //이렇게 <input>의 default type들을 & React.DetailedHTMLProps로 받아, { ...inputAttributes }로 deconstructing 해줘야함 해서 내려줘야 한다.
      />
    </div>
  );
};

export default CInput;