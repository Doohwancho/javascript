import React from "react";
import ToppingItemForm from "./ToppingItemForm";
import classes from "./ToppingItem.module.css";


const ToppingItem: React.FC = (props) => {
    // const { price, key, name, description, id, amount, topping, backendData } = props;
    // const commaSeparatedPrice = price.toLocaleString(3);

    return (
        <>
            <div>
                <h3>무화가</h3>
                <div>1000원</div>
            </div>

            {/* <li className={classes.topping} key={key}>
                <div className={classes.namePriceDescription}>
                    <h3 className={classes.name}>{name}</h3>
                    <div className={classes.price}>{`${commaSeparatedPrice}원`}</div>
                    <div className={classes.description}>{description}</div>
                </div> */}
            <ToppingItemForm />
            {/* </li> */}
        </>
    )
}

export default ToppingItem;