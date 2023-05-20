import classes from './ToppingsCategory.module.css';

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

type PropType = {
    backendData: BackendData;
    onSelect: (id: string) => void;
  };

const ToppingsCategory = ({onSelect, backendData}: PropType) => {

  const selectHandler = (id: string) => {
    onSelect(id);
  }

  return (
    <>
        {backendData.map(category => 
        <li
            key={category.id}
            onClick={() => selectHandler(category.id)}
            className={classes.category}
        >
            {category.name}
        </li>
        )}
    </>
  );
};

export default ToppingsCategory;