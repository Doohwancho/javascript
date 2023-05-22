import { useState, useEffect } from 'react';

import Header from "../components/Layout/Header";
import Cart from '../components/Cart/Cart';
import ToppingSummary from "../components/Toppings/ToppingSummary";
import ToppingsCategory from '../components/Toppings/ToppingsCategory';
import AvailableToppings from "../components/Toppings/AvailableToppings";
import Card from '../components/UI/Card';

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
  /*********************************** */
  /** 원래는 App/Main에 위치했어야 하는 코드  
   * 
  */

  const [backendData, setBackendData] = useState<BackendData>([]); //TODO - 원래 backend에서 값 져와서 페이지/컴포넌트마다 뿌리는건 main/app에서 하는게 좋다.
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState('ca1');

  const [cartItems, setCartItems] = useState<Topping[]>([]);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch('http://localhost:23400/api').then(
      response => {
        return response.json()
      }
    ).then( 
      data => {
      setIsLoading(false); //TODO - 서순이 api에서 받아온 데이터가 랜더링 된 이후에 로딩 창을 없앤다. 
      return setBackendData(data);
    })
  }, [])  

  const showCartHandler = () => {
      setCartIsShown(true);
    }
  
    const hideCartHandler = () => {
      setCartIsShown(false);
    }

  
  const onSelect = (id: string) => { 
    setSelectedCategory(id);
  }

/*************************************
 * for AvailableToppings & category 
 */

  //장바구니에서 3개 담기 하면, backendData에서 해당 아이템 3개 뺴는 듯.
  //근데 이 값은 클라이언트에서 처리하기 보다는 서버에서 받아서 처리하는게 좋을 듯(react-query, swr)
  //일단 연습용이니까 이렇게 구현해놓는다. 
  const onSaveCategories = (itemState: Topping) => { //TODO - Q. 이 함수는 ToppingItemForm에서 쓰이는데, props로 AvailableToppings.tsx, ToppingItem.tsx 한테 건내줘야 함. -> 걍 쓰이는 곳에서 정의하고 쓰면 되지, 왜 root component에서 정의해야 하나?
    //A. "lifting state up" pattern in react 
    //backendData가 root레벨에서 관리되고, onSaveCategories()는 데이터 상태관리하는 함수라 여기서 정의하고, 필요한 컴포넌트에 전달해서 쓰게한다.
    //만약 onSaveCategories()를 ToppingItemForm에서 정의하고 싶게 했다면, backendData를 내려줘야 하는데, 데이터 무더기를 내려주는 것 보다, 함수내려주는게 편하잖니.
    //state 관련 함수들은 최상위 컴포넌트에서 관리하면서 props로 내려가며 쓰고, 해당 지엽적인 함수들만 개별 컴포넌트에서 선언하고 쓰는구만 
   
   //TODO - Q. 그럼 만약 state management library 쓰면, 데이터를 어느 컴포넌트에서도 접근할 수 있으니까, 이런 state management function들도 각자의 component로 뺄 수 있는건가?
   //A. 맞음. 그래서 해당 컴포넌트에서 쓰이는 함수를 찾으러 다른 컴포넌트 안둘러봐야 해서 좋은 듯?  
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

  /*************************************
   * for ToppingItem and header's cart number & cart
   */

  //담기 클릭 -> 장바구니에 아이템 올리기 + 총 가격 변경
  const onSaveItem = (selectedItemData: Topping) => {
    const newItemData: Topping[] = [...cartItems, selectedItemData];

    const mergedItemData: Topping[] = newItemData.reduce((acc: Topping[], cur: Topping) => {
      const foundIndex: number = acc.findIndex((item: Topping) => item.id === cur.id);
      if (foundIndex !== -1) {
        const found = acc[foundIndex];
        const updatedFound: Topping = { ...found, amount: found.amount + Number(cur.amount)};
        acc[foundIndex] = updatedFound;
      } else {
        acc.push({...cur});
      }
      return acc;
    }, [] as Topping[]);

    setCartItems(mergedItemData);

    const newTotalPrice = newItemData.reduce((total, item) => total + item.amount * item.price, 0);
    setTotalPrice(prevTotalPrice => prevTotalPrice + newTotalPrice);
  };



  /*********************
   * for Cart
   */

  // reducer => added
  const onAdd = (id:string) => {
    const updatedArr = cartItems.map((cur) => {
      if (cur.id === id) {
        cur.amount++;
      }
      return cur;
    });

    const newTotalPrice = updatedArr.reduce((acc, cur) => acc + (cur.amount * cur.price), 0);

    setTotalPrice(newTotalPrice)
    setCartItems(updatedArr);
  }

  // reducer => removed
  const onRemove = (id:string) => {
    const updatedArr = cartItems.map((cur) => {
      if (cur.amount > 0 && cur.id === id) {
        cur.amount--;
      }
      return cur;
    });

    const newTotalPrice = updatedArr.reduce((acc, cur) => {
      return acc + (cur.amount * cur.price);
    }, 0);
    
    setTotalPrice(newTotalPrice)

    const removedArr = updatedArr.filter((cur) => { 
      return cur.amount > 0
    })

    setCartItems(removedArr);
  }


  if(isLoading){
    return <div>Loading...</div>
  } else {
    return (
      <> 
        {/* div for cart modal  */}
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div> 

        {cartIsShown && 
          <Cart hideCartHandler={hideCartHandler} 
            onAdd={onAdd}
            onRemove={onRemove}
            cartItems={cartItems} 
            totalPrice={totalPrice} 
        />}

        <Header showCartHandler={showCartHandler} cartItems={cartItems} />

        <main>
          <div className={classes.toppings}>
              
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
                    backendData={backendData}
                    onSaveCategories={onSaveCategories}
                    onSaveItem={onSaveItem}
                  />
                </div>
              </Card>
          </div>
        </main>
      </>
    )
  }
}

export default Toppings;