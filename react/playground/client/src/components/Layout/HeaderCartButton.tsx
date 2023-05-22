import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

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
  

interface HeaderCartButtonProps {
    onClick: ShowCartHandler;
    cartItems: CartItems;
}

const HeaderCartButton = ( { onClick, cartItems }: HeaderCartButtonProps ) => {
  const numberOfCartItems = cartItems.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

// const numberOfCartItems = 3;

  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>장바구니</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;