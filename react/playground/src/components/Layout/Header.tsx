import HeaderCartButton from './HeaderCartButton';

import classes from './Header.module.css';


interface ShowCartHandler {
    (): void;  
}

interface CartItem {
    // Add properties based on your actual cart item structure
    id: number;
    name: string;
    amount: number;
    quantity: number;
    // ...other properties...
}
  
type CartItems = CartItem[];
  

interface HeaderProps {
    showCartHandler: ShowCartHandler;
    cartItems: CartItems;
}

const Header = ({ showCartHandler, cartItems }: HeaderProps) => {
    return (
        <>
        <header className={classes.header} >
          <h1>GreekZik</h1>
          <HeaderCartButton onClick={showCartHandler} cartItems={cartItems} />
        </header>
      </>
    )
}

export default Header;