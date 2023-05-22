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

  const selectHandler = (id: string) => { //TODO - Q. onSelect()도 한번 감쌌는데, selectHandler()로 한번 더 감쌓네? 그냥 쌩 setSelectedCategory() 안넘기고 한번 래핑해서 넘기는건, 보안 때문?
    //A. In React, wrapping the useState setter function (e.g., setSelectedCategory) multiple times is not related to security. It is a common pattern used to pass additional arguments or modify the value before updating the state.
    //Using wrapper functions like selectHandler can improve code readability, reusability, and maintainability by separating concerns and providing a clear interface for interacting with the state. However, it's not strictly necessary, and whether to use this pattern depends on the specific requirements and complexity of your application.
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