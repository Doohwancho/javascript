import React, { InputHTMLAttributes } from 'react';
import classes from './Input.module.css';


interface InputProps {
  label: string;
  input: InputHTMLAttributes<HTMLInputElement>;
}


const Input: React.FC<InputProps> = props => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} />
        </div>
    )
}

export default Input;