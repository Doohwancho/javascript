import classes from './CartItem.module.css';

type PropType = {
    id: string;
    name: string;
    amount: number;
    price: string;
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
  };
  

const CartItem = ({ id, name, amount, price, onAdd, onRemove}: PropType) => {
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}원</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={() => onAdd(id)}>+</button>
        <button onClick={() => onRemove(id)}>-</button>
      </div>
    </li>
  );
};

export default CartItem;