import React, { InputHTMLAttributes } from 'react';

interface InputProps {
  label: string;
  input: InputHTMLAttributes<HTMLInputElement>;
}


const Input: React.FC<InputProps> = props => {
    return (
        <div>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} />
        </div>
    )
}

export default Input;