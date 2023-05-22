import React from "react";
import ToppingItemForm from "./ToppingItemForm";
import classes from "./ToppingItem.module.css";


type Topping = {
    id: string;
    name: string;
    description: string;
    price: number;
    amount: number;
  };
  
type Category = {
    id: string;
    name: string;
    DUMMY_TOPPINGS: Topping[];
};

type BackendData = Category[];

type PropType = {
    id: string;
    name: string;
    description: string;
    price: number;
    amount: number;
    topping: Topping;
    backendData: BackendData;
    onSaveCategories: (itemState: Topping) => void;
    onSaveItem: (topping: Topping) => void;
}

const ToppingItem = (props: PropType) => {
    const { id, name, description, price, amount, topping, backendData, onSaveCategories} = props;
    const commaSeparatedPrice = price.toLocaleString(3);

    return (
        <li className={classes.topping} key={id}>
        <div className={classes.namePriceDescription}>
          <h3 className={classes.name}>{name}</h3>
          <div className={classes.price}>{`${commaSeparatedPrice}원`}</div>
          <div className={classes.description}>{description}</div>
        </div>
        <ToppingItemForm
          id={id}  
          topping={topping}
          onSaveCategories={props.onSaveCategories}
          onSaveItem={props.onSaveItem} 
        />
      </li>
    );
}

export default ToppingItem;