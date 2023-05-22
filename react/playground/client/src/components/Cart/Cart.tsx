import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';

type Topping = {
    id: string;
    name: string;
    description: string;
    price: number;
    amount: number;
};

type PropType = {
    cartItems: Topping[];
    totalPrice: number;
    hideCartHandler: () => void;
    onRemove: (id: string) => void;
    onAdd: (id: string) => void;
};

const Cart = ({ cartItems, totalPrice, hideCartHandler, onRemove, onAdd }: PropType) => {
  const cartItem = (
    <ul className={classes['cart-items']}>
      {cartItems.map((item: Topping) => 
        <CartItem 
          key={item.id} //TODO - key is handled internally by React to decide which components to update
          id={item.id}
          name={item.name} 
          amount={item.amount} 
          price={item.price.toLocaleString(3)} 
          onAdd={onAdd}
          onRemove={onRemove}
        />
      )}
    </ul>
    );
    
  const commaSeparatedTotalPrice = totalPrice.toLocaleString(3);

  return (
    <Modal hideCartHandler={hideCartHandler}>
        <div>
            {cartItem}
        </div>
        <div className={classes.total}>
            <span>총액</span>
            <span>{commaSeparatedTotalPrice}원</span>
        </div>
        <div className={classes.actions}>
            <button 
            className={classes['button--alt']} 
            onClick={hideCartHandler}
            >
            닫기
            </button>
            <button className={classes.button}>주문</button>
        </div>
    </Modal>
  );
};

export default Cart;