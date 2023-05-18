import React from "react";
import ToppingItemForm from "./ToppingItemForm";


const ToppingItem: React.FC = () => {
    return (
        <>
            <div>
                <h3>무화가</h3>
                <div>1000원</div>
            </div>
            <ToppingItemForm />
        </>
    )
}

export default ToppingItem;