import React, { useState } from "react";

import Input from "../../ui/Input";

import classes from  "./ToppingItemForm.module.css";

type Topping = {
    id: string;
    name: string;
    description: string;
    price: number;
    amount: number;
  };

  type PropType = {
    id: string;
    topping: Topping;
    onSaveCategories: (item: Topping) => void;
  }

const ToppingItemForm = (props: PropType) => {
    const { id, topping, onSaveCategories } = props;

    const [itemState, setItemState] = useState({
        id: topping.id,
        name: topping.name,
        description: topping.description,
        price: topping.price,
        amount: topping.amount
      });
    
      const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // onSaveItem(itemState);
      }
    
      const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemState(prev => {
          const newState = {
            ...prev,
            // typeof(newState.amount) -> string
            amount: Number(e.target.value),
          };
          onSaveCategories(newState);
          return newState
        })
      }

    return (
        <form className={classes.form} onSubmit={submitHandler} key={id} >
        <Input 
            onChange={onChangeHandler}
            label="수량" 
            input={{
                id: id,
                type: 'number',
                min: '1',
                max: '10',
                step: '1',
                value: itemState.amount,
            }} 
        />
        <button type="submit">+ 담기</button>
        </form>
    )
}

export default ToppingItemForm;