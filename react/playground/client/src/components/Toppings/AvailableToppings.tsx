import React from 'react';
import Card from "../UI/Card";
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
    onSaveItem: (topping: Topping) => void;
  };

function AvailableToppings(props: PropType) { //TODO - 이 컴포넌트의 목적은, category 선택된 것에 종속되는 topping list를 만드는 것 
    const {backendData, selectedCategory} = props;

    const filteredCategory = backendData.filter((category: Category) => {
        return category.id === selectedCategory
    });

    const toppingsList = filteredCategory[0].DUMMY_TOPPINGS.map((topping: Topping) => 
        <React.Fragment key={topping.id}>
          <ToppingItem
            id={topping.id}       
            name={topping.name}
            description={topping.description}
            price={topping.price}
            amount={topping.amount}
            onSaveItem={props.onSaveItem}
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