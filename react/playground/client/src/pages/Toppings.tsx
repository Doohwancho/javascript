import { useState, useEffect } from 'react';

import Header from "../components/Layout/Header";
import ToppingSummary from "../components/Toppings/ToppingSummary";
import ToppingsCategory from '../components/Toppings/ToppingsCategory';
import AvailableToppings from "../components/Toppings/AvailableToppings";
import Card from '../components/ui/Card';

import classes from "./Toppings.module.css";

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

function Toppings() {
  /** 원래는 App/Main에 위치했어야 하는 코드  */
  const [backendData, setBackendData] = useState<BackendData>([]); //TODO - 원래 backend에서 값 져와서 페이지/컴포넌트마다 뿌리는건 main/app에서 하는게 좋다.
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ca1');
  const [cartItems, setCartItems] = useState([]);
  const [cartIsShown, setCartIsShown] = useState(false);

  useEffect(() => {
    fetch('http://localhost:23400/api').then(
      response => {
        return response.json()
      }
    ).then( 
      data => {
      setIsLoading(false);
      return setBackendData(data);
    })
  }, [])  

  const showCartHandler = () => {
      setCartIsShown(true);
    }
  
    const hideCartHandler = () => {
      setCartIsShown(false);
    }

  
  /** Toppings같은 페이지/컴포넌트에 위치하는 코드 */
  const onSelect = (id: string) => {
    setSelectedCategory(id);
  }

  const onSaveCategories = (itemState: Topping) => {
    const newData = backendData.map(category => {
      const newToppings = category.DUMMY_TOPPINGS.map(topping => {
        if (topping.id === itemState.id) {
          return {...topping, amount: itemState.amount};
        }
        return topping;
      });
      return {...category, DUMMY_TOPPINGS: newToppings}
    }
    )
    setBackendData(newData)
  }  


  if(isLoading){
    return <div>Loading...</div>
  } else {
    return (
        <div className={classes.toppings}>
            <Header showCartHandler={showCartHandler} cartItems={cartItems} />
            
            <ToppingSummary />

            <Card>
              <div className={classes.container}>
                <div className={classes.ulContainer}>
                  <ul className={classes.liContainer}>
                    <ToppingsCategory
                      backendData={backendData}
                      onSelect={onSelect}
                    />
                  </ul>
                </div>
                <AvailableToppings
                  selectedCategory={selectedCategory} 
                  onSaveCategories={onSaveCategories}
                  backendData={backendData}
                  // onSaveItem={onSaveItem}
                />
              </div>
            </Card>
        </div>
    )
  }
}

export default Toppings;