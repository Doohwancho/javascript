import { useState } from 'react';

import ToppingSummary from "../components/Toppings/ToppingSummary";
import AvailableToppings from "../components/Toppings/AvailableToppings";
import Header from "../components/Layout/Header";


import classes from "./Toppings.module.css";


function Toppings() {
    const [cartItems, setCartItems] = useState([]);
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
      }
    
      const hideCartHandler = () => {
        setCartIsShown(false);
      }

    return (
        <div className={classes.toppings}>
            <Header showCartHandler={showCartHandler} cartItems={cartItems} />
            <ToppingSummary />
            <AvailableToppings />
        </div>
    )
}

export default Toppings;