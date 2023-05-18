import React, { ReactNode } from 'react';
import classes from './Card.module.css';

interface CardProps {
    className?: string;
    children?: ReactNode;
  }

const Card: React.FC<CardProps> = (props) => { //TODO - what is React.FC?
    return (
        <div className = {`${classes.card} ${props.className}`} >
            {props.children}
        </div>
    )
}

export default Card;