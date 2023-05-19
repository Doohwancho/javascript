import React, { ReactNode } from 'react';
import classes from './Card.module.css';

interface CardProps {
    className?: string;
    children?: ReactNode;
  }

// const Card: React.FC<CardProps> = (props) => { 
//TODO - Q. what is React.FC?
//Function Component의 약자.
//문법적 장황함 때문에 아래와 같이 쓰는게 요즘 관례. 아래와 같이 써도 똑같이 작동한다. 

const Card = (props:CardProps) => {
    return (
        <div className = {`${classes.card} ${props.className}`} >
            {props.children}
        </div>
    )
}

export default Card;