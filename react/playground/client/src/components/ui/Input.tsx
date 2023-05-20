import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import classes from './Input.module.css';


interface PropType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  input: InputHTMLAttributes<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}


const Input = ({ input, onChange, label }: PropType)=> {
    return (
      <div className={classes.input} >
        <label htmlFor={input.id} >{label}</label>
        <input onChange={onChange} {...input} /> 
      </div>
    );
  };
  

export default Input;