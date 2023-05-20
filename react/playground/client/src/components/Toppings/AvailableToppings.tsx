import React from 'react';
import Card from "../ui/Card";
import ToppingItem from "./ToppingItem/ToppingItem";
import classes from './AvailableToppings.module.css';


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
    backendData: BackendData;
    selectedCategory: string;
    onSaveCategories: (itemState: Topping) => void;
    // onSaveItem: (topping: Topping) => void;
  };

function AvailableToppings(props: PropType) {
    const {backendData, selectedCategory} = props;

    const filteredCategory = backendData.filter(category => {
        return category.id === selectedCategory
    });

    const toppingsList = filteredCategory[0].DUMMY_TOPPINGS.map(topping => 
        <React.Fragment key={topping.id}>
          <ToppingItem
            id={topping.id}       
            name={topping.name}
            description={topping.description}
            price={topping.price}
            amount={topping.amount}
            // onSaveItem={props.onSaveItem}
            topping={topping}
            backendData={backendData}
            onSaveCategories={props.onSaveCategories}
          />
        </React.Fragment>
      )

    return (
        <>
            <section className = {classes.toppings}>
                {toppingsList}
            </section>
        </>
    )
}

export default AvailableToppings;