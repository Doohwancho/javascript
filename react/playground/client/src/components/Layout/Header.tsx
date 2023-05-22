import HeaderCartButton from './HeaderCartButton';

import classes from './Header.module.css';


interface ShowCartHandler {
    (): void;  
}
type Topping = {
    id: string;
    name: string;
    description: string;
    price: number;
    amount: number;
  };
  
type CartItems = Topping[];
  

interface PropType {
    showCartHandler: ShowCartHandler;
    cartItems: CartItems;
}

const Header = ({ showCartHandler, cartItems }: PropType) => {
    return (
        <>
        <header className={classes.header} >
          <h1>Cart-Header</h1>
          <HeaderCartButton onClick={showCartHandler} cartItems={cartItems} />
        </header>
      </>
    )
}

export default Header;