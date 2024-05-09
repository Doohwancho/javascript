import React, { useState } from "react";

import Input from "../../UI/Input";

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
    onSaveItem: (topping: Topping) => void;
  }

const ToppingItemForm = (props: PropType) => {
    const { id, topping, onSaveCategories, onSaveItem } = props;

    const [itemState, setItemState] = useState<Topping>({
        id: topping.id,
        name: topping.name,
        description: topping.description,
        price: topping.price,
        amount: topping.amount
      });
    
      const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSaveItem(itemState);
      }
    
      const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        /** case1) */

        // setItemState(prev => {
        //   const newState = {
        //     ...prev,
        //     // typeof(newState.amount) -> string
        //     amount: Number(e.target.value),
        //   };
        //   onSaveCategories(newState); //TODO - ANTI-PATTERN: ToppingItemForm의 state를 바꾸는 함수 안에 Topping의 상태를 바꾸는 함수는 넣으면, rendering 2번 일어난다. 
        //   return newState
        // })

        /** case2)  */
        const newState = {
          ...itemState,
          // typeof(newState.amount) -> string
          amount: Number(e.target.value),
        };
        
        onSaveCategories(newState);
        setItemState(newState);
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